import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';

export async function GET() {
  try {
    // Get total modal opens
    const { count: totalOpens, error: totalError } = await supabaseAdmin
      .from('modal_opens')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Failed to fetch total opens:', totalError);
      return NextResponse.json({ message: 'Failed to fetch stats' }, { status: 500 });
    }

    // Get opens by country
    const { data: countryData, error: countryError } = await supabaseAdmin
      .from('modal_opens')
      .select('country_code')
      .not('country_code', 'is', null);

    if (countryError) {
      console.error('Failed to fetch country stats:', countryError);
      return NextResponse.json({ message: 'Failed to fetch stats' }, { status: 500 });
    }

    // Count by country
    const countryStats = countryData.reduce((acc: Record<string, number>, row) => {
      const code = row.country_code || 'unknown';
      acc[code] = (acc[code] || 0) + 1;
      return acc;
    }, {});

    // Sort by count descending
    const topCountries = Object.entries(countryStats)
      .map(([code, count]) => ({ country_code: code, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get total unique sessions
    const { data: sessionData, error: sessionError } = await supabaseAdmin
      .from('modal_opens')
      .select('session_id');

    if (sessionError) {
      console.error('Failed to fetch session stats:', sessionError);
    }

    const uniqueSessions = sessionData ? new Set(sessionData.map(row => row.session_id)).size : 0;

    // Get total responses submitted
    const { count: totalResponses, error: responseError } = await supabaseAdmin
      .from('question_responses')
      .select('*', { count: 'exact', head: true });

    if (responseError) {
      console.error('Failed to fetch response count:', responseError);
    }

    return NextResponse.json({
      totalOpens: totalOpens || 0,
      uniqueSessions,
      totalResponses: totalResponses || 0,
      conversionRate: totalOpens && totalResponses ? ((totalResponses / totalOpens) * 100).toFixed(1) : '0',
      topCountries,
    });
  } catch (error) {
    console.error('Unexpected error fetching modal stats', error);
    return NextResponse.json({ message: 'Failed to fetch stats' }, { status: 500 });
  }
}
