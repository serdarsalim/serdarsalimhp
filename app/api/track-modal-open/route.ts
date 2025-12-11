import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const { sessionId, questionId } = await request.json();

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ message: 'Missing sessionId' }, { status: 400 });
    }

    if (!questionId) {
      return NextResponse.json({ message: 'Missing questionId' }, { status: 400 });
    }

    const headers = request.headers;
    const forwardedFor = headers.get('x-forwarded-for') ?? '';
    const ipAddress = forwardedFor.split(',')[0]?.trim() || 'unknown';
    const userAgent = headers.get('user-agent') ?? 'unknown';

    // Get country from IP
    let countryCode = 'unknown';
    try {
      const geoResponse = await fetch(`${request.headers.get('origin') || 'http://localhost:3000'}/api/geo`, {
        headers: { 'x-forwarded-for': forwardedFor },
      });
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        countryCode = geoData?.country?.code || 'unknown';
      }
    } catch {
      // Ignore geo failures
    }

    const { error } = await supabaseAdmin.from('modal_opens').insert({
      session_id: sessionId,
      question_id: questionId,
      country_code: countryCode,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      console.error('Failed to track modal open:', error);
      return NextResponse.json({ message: 'Failed to track event' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error tracking modal open', error);
    return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
  }
}
