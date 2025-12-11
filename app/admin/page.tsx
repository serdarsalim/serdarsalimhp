'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { EditablePersonalQuestion } from '../data/personalQuestions';

const ADMIN_AUTH_ENDPOINT = '/api/admin/auth';
const QUESTIONS_ENDPOINT = '/api/personal-questions';
const RESPONSES_ENDPOINT = '/api/question-responses/admin';
const MODAL_STATS_ENDPOINT = '/api/admin/modal-stats';

type AdminQuestionResponse = {
  id: string;
  user_name: string | null;
  country_code: string | null;
  answer_text: string;
  created_at: string;
  is_hidden: boolean;
};

type ModalStats = {
  totalOpens: number;
  uniqueSessions: number;
  totalResponses: number;
  conversionRate: string;
  topCountries: Array<{ country_code: string; count: number }>;
};

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [questions, setQuestions] = useState<EditablePersonalQuestion[]>([]);
  const [savedQuestions, setSavedQuestions] = useState<EditablePersonalQuestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [responses, setResponses] = useState<AdminQuestionResponse[]>([]);
  const [isLoadingResponses, setIsLoadingResponses] = useState(false);
  const [isManagingResponse, setIsManagingResponse] = useState(false);
  const [modalStats, setModalStats] = useState<ModalStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const notifyQuestionsUpdated = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event('personalQuestionsUpdated'));
  };

  const fetchModalStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch(MODAL_STATS_ENDPOINT);
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setModalStats(data);
    } catch (error) {
      console.error('Failed to load modal stats', error);
      setModalStats(null);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchResponsesForQuestion = async (questionId?: number | null) => {
    if (!questionId) {
      setResponses([]);
      return;
    }

    setIsLoadingResponses(true);
    try {
      const response = await fetch(`${RESPONSES_ENDPOINT}?questionId=${questionId}`);
      if (!response.ok) {
        throw new Error('Unable to load responses.');
      }
      const data = await response.json();
      setResponses(Array.isArray(data?.responses) ? data.responses : []);
    } catch (error) {
      console.error('Failed to load responses', error);
      setResponses([]);
    } finally {
      setIsLoadingResponses(false);
    }
  };

  const toggleResponseVisibility = async (responseId: string, hide: boolean) => {
    if (isManagingResponse) return;
    setIsManagingResponse(true);
    setStatusMessage('');

    try {
      const response = await fetch(RESPONSES_ENDPOINT, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: responseId, is_hidden: hide }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setStatusMessage(data?.message ?? 'Unable to update response.');
        return;
      }

      setStatusMessage(hide ? 'Response hidden.' : 'Response visible.');
      await fetchResponsesForQuestion(activeQuestion?.id);
    } catch (error) {
      console.error('Failed to update response', error);
      setStatusMessage('Unable to update response.');
    } finally {
      setIsManagingResponse(false);
    }
  };

  const deleteResponse = async (responseId: string) => {
    if (isManagingResponse) return;
    setIsManagingResponse(true);
    setStatusMessage('');

    try {
      const response = await fetch(RESPONSES_ENDPOINT, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: responseId }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setStatusMessage(data?.message ?? 'Unable to delete response.');
        return;
      }

      setStatusMessage('Response deleted.');
      await fetchResponsesForQuestion(activeQuestion?.id);
    } catch (error) {
      console.error('Failed to delete response', error);
      setStatusMessage('Unable to delete response.');
    } finally {
      setIsManagingResponse(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoadingQuestions(true);
      try {
        const response = await fetch(QUESTIONS_ENDPOINT);
        if (!response.ok) {
          throw new Error('Unable to load questions.');
        }
        const data = await response.json();
        if (isMounted) {
          const fetched = data.questions ?? [];
          setQuestions(fetched);
          setSavedQuestions(fetched);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setQuestions([]);
          setSavedQuestions([]);
          setStatusMessage('Unable to load questions.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingQuestions(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeQuestion = useMemo(
    () => questions[activeIndex] ?? questions[0] ?? null,
    [activeIndex, questions]
  );
  const hasUnsavedChanges = useMemo(() => {
    if (questions.length !== savedQuestions.length) {
      return true;
    }
    return questions.some((question, index) => {
      const saved = savedQuestions[index];
      if (!saved) return true;
      if (saved.question !== question.question) return true;
      if ((saved.is_default ?? false) !== (question.is_default ?? false)) return true;
      if (saved.answer.length !== question.answer.length) return true;
      for (let i = 0; i < question.answer.length; i += 1) {
        if ((saved.answer[i] ?? '') !== question.answer[i]) {
          return true;
        }
      }
      return false;
    });
  }, [questions, savedQuestions]);
  const hasAnswerContent = activeQuestion?.answer.some((line) => line.trim().length > 0) ?? false;
  const canSaveQuestion =
    Boolean(activeQuestion) &&
    hasUnsavedChanges &&
    activeQuestion.question.trim().length > 0 &&
    hasAnswerContent;

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsAuthenticating(true);
    setStatusMessage('');

    try {
      const response = await fetch(ADMIN_AUTH_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setStatusMessage(data?.message ?? 'Invalid password.');
        return;
      }

      setIsAuthorized(true);
      setPasswordInput('');
      window.localStorage?.setItem('admin-authenticated', '1');
    } catch (error) {
      console.error('Admin login failed', error);
      setStatusMessage('Unable to authenticate right now.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSave = async (payloadQuestions?: EditablePersonalQuestion[]) => {
    const payload = payloadQuestions ?? questions;
    if (!payload.length) return;
    setIsSaving(true);
    setStatusMessage('');

    try {
      const response = await fetch(QUESTIONS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions: payload }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setStatusMessage(data?.message ?? 'Unable to save.');
        return;
      }

      const data = await response.json();
      const merged = data.questions ?? payload;
      setQuestions(merged);
      setSavedQuestions(merged);
      notifyQuestionsUpdated();
      setStatusMessage('Changes saved.');
    } catch (error) {
      console.error('Failed to save questions', error);
      setStatusMessage('Unable to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => {
      const updated = [...prev, { question: '', answer: [''] }];
      setActiveIndex(updated.length - 1);
      return updated;
    });
    setStatusMessage('New question added. Fill in the prompt and answers, then save.');
  };

  const setActiveQuestionDefault = (value: boolean) => {
    setQuestions((prev) =>
      prev.map((question, index) => ({
        ...question,
        is_default: value ? index === activeIndex : index === activeIndex ? false : question.is_default ?? false,
      }))
    );
  };

  const handleCancelEdit = () => {
    setQuestions(savedQuestions);
    setActiveIndex((prev) => Math.min(prev, Math.max(savedQuestions.length - 1, 0)));
    setStatusMessage('Changes discarded.');
  };

  const updateQuestion = (field: 'question', value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[activeIndex] = {
        ...updated[activeIndex],
        [field]: value,
      };
      return updated;
    });
  };

  const updateAnswer = (answerIndex: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const answers = [...(updated[activeIndex]?.answer ?? [])];
      answers[answerIndex] = value;
      updated[activeIndex] = {
        ...updated[activeIndex],
        answer: answers,
      };
      return updated;
    });
  };

  const addAnswerBlock = () => {
    setQuestions((prev) => {
      const updated = [...prev];
      const answers = [...(updated[activeIndex]?.answer ?? [])];
      answers.push('');
      updated[activeIndex] = {
        ...updated[activeIndex],
        answer: answers,
      };
      return updated;
    });
  };

  const removeAnswerBlock = (index: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const answers = [...(updated[activeIndex]?.answer ?? [])];
      answers.splice(index, 1);
      updated[activeIndex] = {
        ...updated[activeIndex],
        answer: answers,
      };
      return updated;
    });
  };

  useEffect(() => {
    if (questions.length === 0) {
      setActiveIndex(0);
      return;
    }
    if (activeIndex >= questions.length) {
      setActiveIndex(questions.length - 1);
    }
  }, [questions, activeIndex]);

  useEffect(() => {
    void fetchResponsesForQuestion(activeQuestion?.id ?? null);
  }, [activeQuestion?.id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedState = window.localStorage.getItem('admin-authenticated');
    if (storedState === '1') {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      void fetchModalStats();
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto w-full max-w-md space-y-6 rounded-3xl border border-white/20 bg-black/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
          <h1 className="text-2xl font-semibold">Admin Portal</h1>
          <p className="text-sm text-white/70">
            Enter the admin password to unlock Serdar&apos;s answers.
          </p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              className="w-full rounded-2xl border border-white/30 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-white focus:outline-none"
              placeholder="Password"
            />
            {statusMessage && <p className="text-xs text-rose-300">{statusMessage}</p>}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full rounded-2xl bg-white text-[#4c2372] px-4 py-3 font-semibold uppercase tracking-wider transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAuthenticating ? 'Checking…' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoadingQuestions) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p>Loading questions…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl space-y-8 px-3 sm:px-4 md:px-4 lg:px-5">
        <header className="space-y-1">
          <p className="text-xs uppercase tracking-[0.5em] text-white/70">Admin</p>
          <h1 className="text-3xl font-bold">Personal Questions Manager</h1>
        </header>

        {/* Modal Open Analytics Section */}
        <section className="space-y-4 rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Modal Analytics</h2>
            <button
              type="button"
              onClick={() => fetchModalStats()}
              disabled={isLoadingStats}
              className="text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoadingStats ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {isLoadingStats && !modalStats ? (
            <p className="text-sm text-white/60">Loading analytics…</p>
          ) : modalStats ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Total Opens</p>
                  <p className="text-3xl font-bold">{modalStats.totalOpens.toLocaleString()}</p>
                </div>
                <div className="space-y-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Unique Sessions</p>
                  <p className="text-3xl font-bold">{modalStats.uniqueSessions.toLocaleString()}</p>
                </div>
                <div className="space-y-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Responses</p>
                  <p className="text-3xl font-bold">{modalStats.totalResponses.toLocaleString()}</p>
                </div>
                <div className="space-y-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Conversion</p>
                  <p className="text-3xl font-bold">{modalStats.conversionRate}%</p>
                </div>
              </div>

              {modalStats.topCountries.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Top Countries</p>
                  <div className="space-y-2">
                    {modalStats.topCountries.map((country, index) => (
                      <div
                        key={country.country_code}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-white/40">#{index + 1}</span>
                          <span className="text-sm font-semibold uppercase">{country.country_code}</span>
                        </div>
                        <span className="text-sm font-bold">{country.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-white/60">Failed to load analytics.</p>
          )}
        </section>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="rounded-full border border-amber-300/70 bg-amber-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-200 transition hover:border-amber-200"
          >
            Add question
          </button>
          {statusMessage && <p className="text-xs text-white/70">{statusMessage}</p>}
        </div>
        <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
          <aside className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Questions</p>
            <div className="space-y-2">
              {questions.length === 0 && (
                <p className="text-xs text-white/60">No questions yet—add one below.</p>
              )}
              {questions.map((question, index) => (
                <button
                  key={question.id ?? index}
                  type="button"
                  className={`w-full rounded-2xl border px-3 py-2 text-left text-sm transition ${
                    index === activeIndex
                      ? 'border-white/80 bg-white/10 font-semibold'
                      : 'border-white/10 text-white/70 hover:border-white/50'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="block truncate">{question.question}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Question {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </aside>
          <section className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Editing question</p>
                <h2 className="text-xl font-semibold">
                  {activeQuestion?.question ?? 'Create a question below'}
                </h2>
              </div>
              {activeQuestion ? (
                <>
                  <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                    Prompt
                    <input
                      type="text"
                      value={activeQuestion.question}
                      onChange={(event) => updateQuestion('question', event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/25 bg-white/5 px-3 py-2 text-sm text-white shadow-inner"
                    />
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Serdar&apos;s answer blocks</p>
                      <button
                        type="button"
                        onClick={addAnswerBlock}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      >
                        Add block
                      </button>
                    </div>
                    <div className="space-y-3">
                      {activeQuestion.answer.map((line, index) => (
                        <div key={`${activeQuestion.id ?? activeIndex}-${index}`} className="space-y-1">
                          <textarea
                            value={line}
                            onChange={(event) => updateAnswer(index, event.target.value)}
                            className="w-full rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-sm leading-relaxed text-white placeholder:text-white/30"
                            rows={3}
                          />
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
                            <span>Block {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeAnswerBlock(index)}
                              className="text-rose-300 underline underline-offset-2 transition hover:text-rose-100"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center gap-3 border-t border-white/10 pt-4">
                    {activeQuestion && (
                      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                        <input
                          type="checkbox"
                          checked={Boolean(activeQuestion.is_default)}
                          onChange={(event) => setActiveQuestionDefault(event.target.checked)}
                          className="h-4 w-4 rounded-sm border border-white/30 bg-black/20 text-amber-300 focus:ring-0"
                        />
                        <span>Default</span>
                      </label>
                    )}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={!hasUnsavedChanges}
                        className="rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSave()}
                        disabled={!canSaveQuestion || isSaving}
                        className="rounded-2xl border border-white/50 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4c2372] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? 'Saving…' : 'Save question'}
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Responses</p>
                      <button
                        type="button"
                        onClick={() => fetchResponsesForQuestion(activeQuestion?.id ?? null)}
                        className="text-[10px] uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
                      >
                        Refresh
                      </button>
                    </div>
                    {isLoadingResponses ? (
                      <p className="text-sm text-white/60">Loading responses…</p>
                    ) : responses.length === 0 ? (
                      <p className="text-sm text-white/60">No responses yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {responses.map((response) => (
                          <article
                            key={response.id}
                            className={`space-y-3 rounded-2xl border p-4 ${
                              response.is_hidden
                                ? 'border-rose-400/40 bg-rose-900/30 shadow-[0_1px_20px_rgba(255,255,255,0.03)]'
                                : 'border-white/10 bg-white/5'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white/80">
                                  {response.user_name?.trim() || 'Anonymous'}
                                </span>
                                {response.country_code && (
                                  <span className="text-white/50">• {response.country_code.toUpperCase()}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {response.is_hidden && (
                                  <span className="rounded-full border border-amber-200/40 bg-amber-200/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.4em] text-amber-200">
                                    Hidden
                                  </span>
                                )}
                                <span className="text-white/40">
                                  {new Date(response.created_at).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                              {response.answer_text}
                            </p>
                            <div className="flex flex-wrap gap-2 items-center">
                              <button
                                type="button"
                                onClick={() => toggleResponseVisibility(response.id, !response.is_hidden)}
                                disabled={isManagingResponse}
                                className="relative flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-pressed={!response.is_hidden}
                              >
                                <span className="inline-flex h-4 w-10 items-center rounded-full bg-white/10 p-0.5 transition">
                                  <span
                                    className={`inline-block h-3 w-3 rounded-full transition ${
                                      response.is_hidden ? 'translate-x-0 bg-white/70' : 'translate-x-4 bg-emerald-400'
                                    }`}
                                  />
                                </span>
                                <span>{response.is_hidden ? 'Hidden' : 'Visible'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteResponse(response.id)}
                                disabled={isManagingResponse}
                                className="rounded-full border border-rose-400/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-rose-200 transition hover:border-rose-300 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-white/70">Add a question and answers, then save.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
