import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json({ message: 'Missing questionId' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('question_responses')
      .select('id, user_name, country_code, answer_text, created_at')
      .eq('question_id', questionId)
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Failed to fetch question responses:', error);
      return NextResponse.json({ responses: [] }, { status: 500 });
    }

    return NextResponse.json({ responses: data ?? [] });
  } catch (error) {
    console.error('Unexpected error fetching question responses', error);
    return NextResponse.json({ responses: [] }, { status: 500 });
  }
}
