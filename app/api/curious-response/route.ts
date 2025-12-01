import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const { sessionId, countryCode, choice, questionId } = await request.json();

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ message: 'Missing sessionId' }, { status: 400 });
    }

    if (!countryCode || typeof countryCode !== 'string') {
      return NextResponse.json({ message: 'Missing countryCode' }, { status: 400 });
    }

    if (choice !== 'yes' && choice !== 'no') {
      return NextResponse.json({ message: 'Invalid choice' }, { status: 400 });
    }

    if (!questionId || typeof questionId !== 'string') {
      return NextResponse.json({ message: 'Missing questionId' }, { status: 400 });
    }

    const headers = request.headers;
    const forwardedFor = headers.get('x-forwarded-for') ?? '';
    const ipAddress = forwardedFor.split(',')[0]?.trim() || 'unknown';
    const userAgent = headers.get('user-agent') ?? 'unknown';

    const { error } = await supabaseAdmin.from('curious_responses').insert({
      session_id: sessionId,
      country_code: countryCode,
      choice,
      question_id: questionId,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Response already recorded' }, { status: 409 });
      }

      console.error('Failed to store curious response:', error);
      return NextResponse.json({ message: 'Failed to save response' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error saving curious response', error);
    return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
  }
}
