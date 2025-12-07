import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';
import type { PersonalQuestion } from '@/app/data/personalQuestions';

type PersonalQuestionPayload = {
  id?: number;
  question: string;
  answer: string[];
  admin_email?: string;
  is_default?: boolean;
};

type NormalizedPersonalQuestion = {
  id?: number;
  question: string;
  answers: string[];
  admin_email: string;
  is_default?: boolean;
};

const PERSONAL_QUESTION_SELECT_WITH_DEFAULT = 'id, question, answers, admin_email, is_default';
const PERSONAL_QUESTION_SELECT_WITHOUT_DEFAULT = 'id, question, answers, admin_email';

let hasIsDefaultColumn = true;

const isMissingDefaultColumnError = (error: any) =>
  Boolean(
    error?.code === '42703' &&
      typeof error?.message === 'string' &&
      error.message.toLowerCase().includes('is_default')
  );

const selectFields = () =>
  hasIsDefaultColumn ? PERSONAL_QUESTION_SELECT_WITH_DEFAULT : PERSONAL_QUESTION_SELECT_WITHOUT_DEFAULT;

const normalizePayload = (input: PersonalQuestionPayload, includeDefault: boolean): NormalizedPersonalQuestion => {
  const payload: NormalizedPersonalQuestion = {
    question: input.question.trim(),
    answers: Array.isArray(input.answer) ? input.answer.map((answer) => answer?.trim() ?? '') : [],
    admin_email: input.admin_email?.trim() || 'slmxyz@gmail.com',
  };

  if (typeof input.id === 'number') {
    payload.id = input.id;
  }

  if (includeDefault) {
    payload.is_default = Boolean(input.is_default);
  }

  return payload;
};

const formatRow = (row: NormalizedPersonalQuestion): PersonalQuestion => ({
  id: row.id ?? 0,
  question: row.question,
  answer: row.answers ?? [],
  is_default: Boolean(row.is_default),
});

const selectPersonalQuestions = async () => {
  let query = supabaseAdmin.from('personal_questions').select(selectFields());
  if (hasIsDefaultColumn) {
    query = query.order('is_default', { ascending: false });
  }
  const { data, error } = await query.order('id', { ascending: true });

  if (error && hasIsDefaultColumn && isMissingDefaultColumnError(error)) {
    hasIsDefaultColumn = false;
    return selectPersonalQuestions();
  }

  return { data, error };
};

const persistPersonalQuestions = async (payload: NormalizedPersonalQuestion[]) => {
  const updates = payload.filter((question) => typeof question.id === 'number');
  const inserts = payload.filter((question) => typeof question.id !== 'number');

  if (updates.length > 0) {
    const { error } = await supabaseAdmin
      .from('personal_questions')
      .upsert(updates, { onConflict: 'id', ignoreDuplicates: false });
    if (error) {
      throw error;
    }
  }

  if (inserts.length > 0) {
    const { error } = await supabaseAdmin.from('personal_questions').insert(inserts);
    if (error) {
      throw error;
    }
  }
};

export async function GET() {
  try {
    const { data, error } = await selectPersonalQuestions();

    if (error) {
      console.error('Failed to fetch personal questions:', error);
      return NextResponse.json({ message: 'Unable to load questions.' }, { status: 500 });
    }

    const questions = (data as NormalizedPersonalQuestion[] | null ?? []).map(formatRow);
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

    let sanitized = questions.map((question: PersonalQuestionPayload) => normalizePayload(question, hasIsDefaultColumn));

    const applyDefaultStrategy = (items: NormalizedPersonalQuestion[]) => {
      const defaultIndex = items.findIndex((question) => question.is_default);
      if (defaultIndex >= 0) {
        items.forEach((question, index) => {
          question.is_default = index === defaultIndex;
        });
      } else {
        items.forEach((question) => {
          question.is_default = false;
        });
      }
    };

    if (hasIsDefaultColumn) {
      applyDefaultStrategy(sanitized);
    }

    const persistWithFallback = async () => {
      try {
        await persistPersonalQuestions(sanitized);
      } catch (error) {
        if (hasIsDefaultColumn && isMissingDefaultColumnError(error)) {
          hasIsDefaultColumn = false;
          sanitized = questions.map((question: PersonalQuestionPayload) => normalizePayload(question, false));
          await persistPersonalQuestions(sanitized);
          return;
        }
        throw error;
      }
    };

    try {
      await persistWithFallback();
    } catch (error) {
      console.error('Failed to save personal questions:', error);
      return NextResponse.json({ message: 'Unable to save questions.' }, { status: 500 });
    }

    const { data, error } = await selectPersonalQuestions();

    if (error) {
      console.error('Failed to fetch personal questions after saving:', error);
      return NextResponse.json({ message: 'Unable to save questions.' }, { status: 500 });
    }

    return NextResponse.json({ questions: ((data as NormalizedPersonalQuestion[] | null) ?? []).map(formatRow) });
  } catch (error) {
    console.error('Unexpected error saving personal questions:', error);
    return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 });
  }
}
