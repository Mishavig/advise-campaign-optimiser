import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaign, mode = 'full' } = await req.json();
    console.log('Analyzing campaign:', campaign.name, 'Mode:', mode);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build campaign summary for AI
    const campaignSummary = `
Campaign: ${campaign.name}
Status: ${campaign.status}
Budget: Daily ${campaign.daily_budget || 'N/A'}, Lifetime ${campaign.lifetime_budget || 'N/A'}
Total Spent: ${campaign.spent}
Total Impressions: ${campaign.impressions}
Total Clicks: ${campaign.clicks}
Overall CTR: ${campaign.ctr}%
Overall ROAS: ${campaign.roas}x

Ad Groups (${campaign.adSets?.length || 0}):
${campaign.adSets?.map((adSet: any) => `
  - ${adSet.name}: ${adSet.clicks} clicks, ${adSet.impressions} impressions, CTR ${adSet.ctr}%, Spent ${adSet.spent}
`).join('') || 'No ad groups'}

Individual Ads (${campaign.ads?.length || 0}):
${campaign.ads?.map((ad: any) => `
  - ${ad.name}: ${ad.clicks} clicks, ${ad.impressions} impressions, CTR ${ad.ctr}%, Spent ${ad.spend}
`).join('') || 'No ads'}
    `.trim();

    const systemPrompt = mode === 'short' 
      ? 'You are an expert advertising analyst. Provide a brief, actionable analysis focusing on the top 2-3 key insights and recommendations.'
      : 'You are an expert advertising analyst. Provide detailed insights, identify optimization opportunities, and give specific, actionable recommendations to improve campaign performance.';

    const userPrompt = `Analyze this advertising campaign and provide insights:

${campaignSummary}

Provide:
1. Executive Summary (2-3 sentences)
2. Key Performance Insights (what's working, what's not)
3. Top 3-5 Actionable Recommendations
4. Predicted Impact of Recommendations

Format your response as JSON with this structure:
{
  "summary": "brief executive summary",
  "insights": {
    "strengths": ["list of what's working well"],
    "weaknesses": ["list of areas needing improvement"],
    "opportunities": ["list of optimization opportunities"]
  },
  "recommendations": [
    {
      "priority": "high|medium|low",
      "action": "specific action to take",
      "target": "what to target (ad, ad group, budget, etc.)",
      "reason": "why this will help",
      "expected_impact": "predicted result"
    }
  ],
  "predicted_roas_improvement": "estimated percentage improvement"
}`;

    console.log('Calling Lovable AI...');
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI analysis failed');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    console.log('AI response received');

    // Parse the JSON response from AI
    let analysis;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || aiResponse.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
      analysis = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback: return raw response
      analysis = {
        summary: aiResponse,
        insights: { strengths: [], weaknesses: [], opportunities: [] },
        recommendations: [],
        predicted_roas_improvement: 'N/A'
      };
    }

    return new Response(
      JSON.stringify({ success: true, analysis }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-campaign function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze campaign';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
