import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const questionId = searchParams.get('questionId');

    if (!sessionId || !questionId) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    const headers = request.headers;
    const forwardedFor = headers.get('x-forwarded-for') ?? '';
    const ipAddress = forwardedFor.split(',')[0]?.trim() || 'unknown';

    // Check if user has already answered this question (by sessionId OR ipAddress)
    const { data, error } = await supabaseAdmin
      .from('question_responses')
      .select('id')
      .eq('question_id', questionId)
      .or(`session_id.eq.${sessionId},ip_address.eq.${ipAddress}`)
      .limit(1);

    if (error) {
      console.error('Failed to check for duplicate:', error);
      return NextResponse.json({ hasAnswered: false }, { status: 200 });
    }

    return NextResponse.json({ hasAnswered: data && data.length > 0 });
  } catch (error) {
    console.error('Unexpected error checking duplicate', error);
    return NextResponse.json({ hasAnswered: false }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const { sessionId, countryCode, questionId, answerText } = await request.json();

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ message: 'Missing sessionId' }, { status: 400 });
    }

    if (!countryCode || typeof countryCode !== 'string') {
      return NextResponse.json({ message: 'Missing countryCode' }, { status: 400 });
    }

    if (!questionId || typeof questionId !== 'string') {
      return NextResponse.json({ message: 'Missing questionId' }, { status: 400 });
    }

    if (!answerText || typeof answerText !== 'string') {
      return NextResponse.json({ message: 'Missing answerText' }, { status: 400 });
    }

    const headers = request.headers;
    const forwardedFor = headers.get('x-forwarded-for') ?? '';
    const ipAddress = forwardedFor.split(',')[0]?.trim() || 'unknown';
    const userAgent = headers.get('user-agent') ?? 'unknown';

    const { error } = await supabaseAdmin.from('question_responses').insert({
      session_id: sessionId,
      country_code: countryCode,
      question_id: questionId,
      answer_text: answerText,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Response already recorded' }, { status: 409 });
      }

      console.error('Failed to store question response:', error);
      return NextResponse.json({ message: 'Failed to save response' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error saving question response', error);
    return NextResponse.json({ message: 'Invalid request payload' }, { status: 400 });
  }
}
