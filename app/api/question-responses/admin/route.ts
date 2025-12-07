import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabaseAdmin';

const ADMIN_RESPONSE_SELECT_WITH_HIDDEN = 'id, user_name, country_code, answer_text, created_at, is_hidden';
const ADMIN_RESPONSE_SELECT_WITHOUT_HIDDEN = 'id, user_name, country_code, answer_text, created_at';

let hasHiddenColumn = true;
const isMissingHiddenColumnError = (error: any) =>
  Boolean(
    error?.code === '42703' &&
      typeof error?.message === 'string' &&
      error.message.toLowerCase().includes('is_hidden')
  );

const ensureHiddenColumnExists = async () => {
  const { data, error } = await supabaseAdmin
    .from('information_schema.columns')
    .select('column_name')
    .eq('table_schema', 'public')
    .eq('table_name', 'question_responses')
    .eq('column_name', 'is_hidden')
    .limit(1);

  if (error) {
    console.error('Failed to check column metadata:', error);
    return false;
  }

  return Array.isArray(data) && data.length > 0;
};

const selectAdminResponses = async (questionId: string) => {
  const runQuery = async (fields: string) =>
    supabaseAdmin
      .from('question_responses')
      .select(fields)
      .eq('question_id', questionId)
      .order('created_at', { ascending: false });

  if (hasHiddenColumn) {
    const { data, error } = await runQuery(ADMIN_RESPONSE_SELECT_WITH_HIDDEN);
    if (error && isMissingHiddenColumnError(error)) {
      hasHiddenColumn = false;
      const fallback = await runQuery(ADMIN_RESPONSE_SELECT_WITHOUT_HIDDEN);
      return fallback;
    }
    return { data, error };
  }

  const hasColumn = await ensureHiddenColumnExists();
  if (hasColumn) {
    hasHiddenColumn = true;
    return selectAdminResponses(questionId);
  }

  return runQuery(ADMIN_RESPONSE_SELECT_WITHOUT_HIDDEN);
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json({ message: 'Missing questionId' }, { status: 400 });
    }

    const { data, error } = await selectAdminResponses(questionId);

    if (error) {
      console.error('Failed to fetch admin question responses:', error);
      return NextResponse.json({ responses: [] }, { status: 500 });
    }

    return NextResponse.json({ responses: data ?? [] });
  } catch (error) {
    console.error('Unexpected error fetching admin question responses', error);
    return NextResponse.json({ responses: [] }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, is_hidden } = await request.json();
    if (!id || typeof is_hidden !== 'boolean') {
      return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('question_responses')
      .update({ is_hidden })
      .eq('id', id);

    if (error) {
      console.error('Failed to update question response visibility:', error);
      return NextResponse.json({ message: 'Unable to update response.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error updating question response visibility', error);
    return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('question_responses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Failed to delete question response:', error);
      return NextResponse.json({ message: 'Unable to delete response.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error deleting question response', error);
    return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 });
  }
}
