import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';
import type { PersonalQuestion } from '@/app/data/personalQuestions';

type PersonalQuestionPayload = {
  id?: number;
  question: string;
  answer: string[];
  admin_email?: string;
};

const normalizePayload = (input: PersonalQuestionPayload) => {
  const payload: {
    id?: number;
    question: string;
    answers: string[];
    admin_email: string;
  } = {
    question: input.question.trim(),
    answers: Array.isArray(input.answer) ? input.answer.map((answer) => answer?.trim() ?? '') : [],
    admin_email: input.admin_email?.trim() || 'slmxyz@gmail.com',
  };

  if (typeof input.id === 'number') {
    payload.id = input.id;
  }

  return payload;
};

const formatRow = (row: {
  id: number;
  question: string;
  answers: string[] | null;
  admin_email: string;
}): PersonalQuestion => ({
  id: row.id,
  question: row.question,
  answer: row.answers ?? [],
});

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('personal_questions')
      .select('id, question, answers, admin_email')
      .order('id', { ascending: true });

    if (error) {
      console.error('Failed to fetch personal questions:', error);
      return NextResponse.json({ message: 'Unable to load questions.' }, { status: 500 });
    }

    const questions = (data ?? []).map(formatRow);
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Unexpected error fetching personal questions:', error);
    return NextResponse.json({ message: 'Unable to load questions.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const questions = Array.isArray(payload?.questions) ? payload.questions : null;

    if (!questions) {
      return NextResponse.json({ message: 'Questions array is required.' }, { status: 400 });
    }

    const sanitized = questions.map(normalizePayload);
    const { data, error } = await supabaseAdmin
      .from('personal_questions')
      .upsert(sanitized, { onConflict: 'id', ignoreDuplicates: false })
      .select('id, question, answers, admin_email');

    if (error) {
      console.error('Failed to save personal questions:', error);
      return NextResponse.json({ message: 'Unable to save questions.' }, { status: 500 });
    }

    return NextResponse.json({ questions: (data ?? []).map(formatRow) });
  } catch (error) {
    console.error('Unexpected error saving personal questions:', error);
    return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 });
  }
}
