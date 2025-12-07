'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import IslamicPattern from './IslamicPattern';
import SkySunset from './SkySunset';
import { countryOptions, type CountryOption } from '../data/countries';
import type { PersonalQuestion } from '../data/personalQuestions';

type CuriousStep = 'question' | 'result';
type CuriousChoice = 'yes' | 'no';

interface CuriousQuestion {
  id: string;
  prompt: string;
  correctAnswer: CuriousChoice;
  explanation: string;
  image?: string;
}

const curiousQuestions: CuriousQuestion[] = [
  {
    id: 'five-second-rule',
    prompt: 'Does the 5-second rule keep dropped food safe?',
    correctAnswer: 'no',
    explanation: 'Germs don’t care about a stopwatch. If the floor is dirty they hop on instantly, even if you scoop the snack up fast.',
    image: '/quiz/food.png',
  },
  {
    id: 'banana-tree',
    prompt: 'Do bananas grow on trees?',
    correctAnswer: 'no',
    explanation: 'Bananas grow on massive herbs that just look like trees. They’re more like giant grass than actual wood.',
    image: '/quiz/banana.png',
  },
  {
    id: 'lose-heat',
    prompt: 'Do adults lose most of their body heat through their head?',
    correctAnswer: 'no',
    explanation: 'That only applies to babies or if every other body part is bundled up. Heat escapes from whatever skin you expose.',
    image: '/quiz/heat.png',
  },
  {
    id: 'five-senses',
    prompt: 'Do humans have more than five senses?',
    correctAnswer: 'yes',
    explanation: 'Beyond the classic five we have balance, movement, hunger, thirst, temperature, pain and more—closer to twenty senses in total.',
    image: '/quiz/brain.png',
  },
  {
    id: 'goldfish-memory',
    prompt: 'Can goldfish remember for more than 3 seconds?',
    correctAnswer: 'yes',
    explanation: 'They can remember tricks and mazes for months. They’re not geniuses, but they’re far from totally forgetful.',
    image: '/quiz/fish.png',
  },
  {
    id: 'shaving-thickens-hair',
    prompt: 'Does shaving make hair grow back thicker?',
    correctAnswer: 'no',
    explanation: 'Shaving cuts hair blunt so it feels stubbier, but it doesn’t change the root. The new growth is the same as before.',
    image: '/quiz/shaving.png',
  },
  {
    id: 'caffeine-dehydrates',
    prompt: 'Can you drink coffee without dehydrating yourself?',
    correctAnswer: 'yes',
    explanation: 'Coffee has a mild diuretic effect, but the water in the cup more than replaces what you lose—net hydration stays positive.',
    image: '/quiz/caffeine.png',
  },
  {
    id: 'scientific-proof',
    prompt: 'Science can not prove things once and for all?',
    correctAnswer: 'yes',
    explanation: 'Science updates when better evidence shows up. Proof is for math—science deals in strongest explanations, not forever answers.',
    image: '/quiz/brain.png',
  },
  {
    id: 'left-right-brain',
    prompt: 'Are people “left-brained” or “right-brained”?',
    correctAnswer: 'no',
    explanation: 'Both hemispheres team up for logic and creativity. You don’t unlock art mode or spreadsheet mode on just one side.',
    image: '/quiz/brain.png',
  },
  {
    id: 'ten-percent-brain',
    prompt: 'Do humans use more than 10% of their brain?',
    correctAnswer: 'yes',
    explanation: 'Every region handles something important. During different tasks some areas idle, but across a day you use the whole network.',
    image: '/quiz/brain.png',
  },
  {
    id: 'jihad',
    prompt: 'Does “jihad” literally mean “holy war”?',
    correctAnswer: 'no',
    explanation: 'It translates to “struggle” or “striving.” People twisted it into “holy war,” but that’s not the original meaning.',
    image: '/quiz/islam.png',
  },
  {
    id: 'sushi-raw-fish',
    prompt: 'Does sushi literally refer to sour rice?',
    correctAnswer: 'yes',
    explanation: 'Sushi means vinegared rice. It can be topped with veggies, egg, or fish. “Sashimi” is the word that just means raw slices.',
    image: '/quiz/sushi.png',
  },
  {
    id: 'jesus-december-25',
    prompt: 'Was Jesus definitely born on December 25th?',
    correctAnswer: 'no',
    explanation: 'The date was chosen centuries later, probably to line up with winter festivals. The actual birthday is unknown.',
    image: '/quiz/jesus.png',
  },
  {
    id: 'refreezing-meat',
    prompt: 'Is it safe to refreeze raw meat that thawed in the fridge?',
    correctAnswer: 'yes',
    explanation: 'If it thawed slowly in the fridge, the bacteria never exploded. You can refreeze it—quality might dip, but safety is fine.',
    image: '/quiz/meat.png',
  },
  {
    id: 'msg-headaches',
    prompt: 'Does MSG automatically give you headaches?',
    correctAnswer: 'no',
    explanation: 'Most people feel nothing. A few migraine-prone folks are sensitive, but MSG itself isn’t the universal villain.',
    image: '/quiz/msg.png',
  },
  {
    id: 'eight-glasses',
    prompt: 'Do you need exactly eight glasses of water a day?',
    correctAnswer: 'no',
    explanation: 'Your fluid needs come from water, juice, coffee, foods, everything. Drink when you’re thirsty and you’re good.',
    image: '/quiz/water.png',
  },
];

const COUNTRY_STORAGE_KEY = 'curious-country';
const QUESTION_STORAGE_KEY = 'curious-question-index';
const SCORE_STORAGE_KEY = 'curious-score';
const SESSION_STORAGE_KEY = 'curious-session-id';

const scoreTiers = [
  {
    label: 'Myth Buster',
    description: 'You crush myths for breakfast.',
    min: 80,
  },
  {
    label: 'Curious Skeptic',
    description: 'You’re circling the truth—keep digging.',
    min: 51,
  },
  {
    label: 'Conspiracy Theorist',
    description: 'Time to fact-check your feed.',
    min: 0,
  },
];

const toolboxCategories = {
  productivity: [
    {
      name: 'uBlock Origin Lite',
      type: 'Content shield',
      description: 'Keeps trackers and loud ads away without heavy CPU usage—perfect for deep work sessions.',
      url: 'https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh',
    },
    {
      name: 'Undistracted',
      type: 'Focus filter',
      description: 'Hides feeds and notifications on social sites so I only check messages with intent.',
      url: 'https://chromewebstore.google.com/detail/undistracted-hide-faceboo/pjjgklgkfeoeiebjogplpnibpfnffkng',
    },
    {
      name: 'Channel Blocker',
      type: 'YouTube filter',
      description: 'Mutes entire YouTube channels or search phrases so my recommendations stay intentional.',
      url: 'https://chromewebstore.google.com/detail/channel-blocker/nfkmalbckemmklibjddenhnofgnfcdfp',
    },
    {
      name: 'Text Blaze',
      type: 'Text automation',
      description: 'Chrome-native text snippets and AI-powered workflows—fast replies without sounding robotic.',
      url: 'https://blaze.today/',
    },
  ],
  inspiration: [
    {
      name: 'Safina Society',
      type: 'YouTube',
      description: 'Talks that uplift and enrich Muslim life with practical fiqh and spirituality.',
      url: 'https://www.youtube.com/@SafinaSociety',
    },
    {
      name: 'Yasir Qadhi',
      type: 'YouTube',
      description: 'Dr. Yasir Qadhi’s official channel—lectures, Tafsir series, and timely reflections.',
      url: 'https://www.youtube.com/@YasirQadhi',
    },
    {
      name: 'The Thinking Muslim',
      type: 'Podcast',
      description: 'Interviews with Muslim thinkers exploring global issues through an Islamic lens.',
      url: 'https://www.youtube.com/@TheThinkingMuslim',
    },
    {
      name: 'Yaqeen Institute',
      type: 'YouTube',
      description: 'Islam that inspires faith, grounds it with intellect, and creates a world of doers who are tranquil, confident, and purpose-driven.',
      url: 'https://www.youtube.com/@yaqeeninstituteofficial/',
    },
  ],
      creativity: [
      {
        name: 'ChatGPT',
        type: 'AI co-pilot',
        description: 'Ideation, outlining, and creative drafts with GPT-4o—my second brain for content.',
        url: 'https://chatgpt.com/',
      },
      {
        name: 'Claude',
        type: 'AI writing',
        description: 'Anthropic’s Claude for long-form reasoning and safer ideation sessions.',
        url: 'https://claude.ai/',
      },
      {
        name: 'Supabase',
        type: 'Backend',
        description: 'Postgres + auth + storage in one place for rapid prototyping.',
        url: 'https://supabase.com/',
      },
      {
        name: 'VS Code',
        type: 'Editor',
        description: 'Custom themed editor with Copilot, GitLens, and the typing feel I love.',
        url: 'https://code.visualstudio.com/',
      },
    ],} as const;

const PERSONAL_QUESTION_INDEX_KEY = 'personal-question-index';
const normalizePersonalQuestionIndex = (value: number, count: number) =>
  count > 0 ? value % count : 0;
const getNextPersonalQuestionIndex = (value: number, count: number) =>
  normalizePersonalQuestionIndex(value + 1, count);
const QUESTION_PROFILE_NAME_KEY = 'question-modal-name';
const QUESTION_PROFILE_COUNTRY_CODE_KEY = 'question-modal-country-code';
const PERSONAL_QUESTIONS_ENDPOINT = '/api/personal-questions';

const removeDiacritics = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const normalizeForMatching = (value: string) => removeDiacritics(value).toLowerCase();
const COUNTRY_NAME_ALIASES: Record<string, string> = {
  turkey: 'Türkiye',
  turkiye: 'Türkiye',
  türkiye: 'Türkiye',
};

type QuestionProfile = {
  name: string;
  country: CountryOption;
};

type QuestionResponder = {
  id: string;
  user_name: string | null;
  country_code: string | null;
  answer_text: string;
  created_at: string;
};

type ResponseEntry = {
  id: string;
  name: string;
  country?: string;
  paragraphs: string[];
  createdAt?: string;
};

export type HeroHandle = {
  openCurious: () => void;
  openToolbox: () => void;
  openQuestion: () => void;
};

const Hero = forwardRef<HeroHandle>(function Hero(_, ref) {
  const [personalQuestions, setPersonalQuestions] = useState<PersonalQuestion[]>([]);
  const [personalQuestionIndex, setPersonalQuestionIndex] = useState(0);
  const [questionProfile, setQuestionProfile] = useState<QuestionProfile | null>(null);
  const questionCount = personalQuestions.length;
  const normalizedPersonalQuestionIndex = normalizePersonalQuestionIndex(personalQuestionIndex, questionCount);
  const activeQuestion =
    personalQuestions.length > 0 ? personalQuestions[normalizedPersonalQuestionIndex] : null;

  const [isHoveringName, setIsHoveringName] = useState(false);
  const [isHoveringQuote, setIsHoveringQuote] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const [showThoughts, setShowThoughts] = useState(false);
  const [isCuriousOpen, setIsCuriousOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [questionCountry, setQuestionCountry] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [isQuestionFocused, setIsQuestionFocused] = useState(false);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const [selectedQuestionCountry, setSelectedQuestionCountry] = useState<CountryOption | null>(null);
  const [curiousStep, setCuriousStep] = useState<CuriousStep>('question');
  const [answerChoice, setAnswerChoice] = useState<CuriousChoice | null>(null);
  const [curiousAnswer, setCuriousAnswer] = useState('');
  const [isCuriousAnswerFocused, setIsCuriousAnswerFocused] = useState(false);
  const [userCountry, setUserCountry] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [storedCountry, setStoredCountry] = useState<CountryOption | null>(null);
  const [questionResponses, setQuestionResponses] = useState<QuestionResponder[]>([]);
  const [isLoadingQuestionResponses, setIsLoadingQuestionResponses] = useState(false);
  const [hasAnsweredDefaultQuestion, setHasAnsweredDefaultQuestion] = useState<boolean | null>(null);
  const [stats, setStats] = useState({ answered: 0, correct: 0 });
  const [showSummary, setShowSummary] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const [isQuestionAnimating, setIsQuestionAnimating] = useState(false);
  const [toolboxTab, setToolboxTab] = useState<'productivity' | 'inspiration' | 'creativity'>('productivity');
  const totalQuestions = curiousQuestions.length;
  const currentQuestion = curiousQuestions[questionIndex];
  const responseList = useMemo<ResponseEntry[]>(() => {
    const entries: ResponseEntry[] = [];
    const questionText = activeQuestion?.question?.trim();

    const sanitizeParagraphs = (paragraphs: string[]) => {
      const trimmed = paragraphs
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (questionText && trimmed.length > 1 && trimmed[0] === questionText) {
        return trimmed.slice(1);
      }

      return trimmed;
    };

    if (activeQuestion) {
      entries.push({
        id: `serdar-${activeQuestion.id}`,
        name: 'Serdar Salim',
        country: 'Türkiye',
        paragraphs: sanitizeParagraphs(activeQuestion.answer),
      });
    }

    questionResponses.forEach((response) => {
      const paragraphs = sanitizeParagraphs(
        response.answer_text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0),
      );
      entries.push({
        id: response.id,
        name: response.user_name?.trim() || 'Anonymous',
        country: response.country_code?.toUpperCase() ?? undefined,
        paragraphs: paragraphs.length > 0 ? paragraphs : [response.answer_text.trim()],
        createdAt: response.created_at,
      });
    });

    return entries;
  }, [activeQuestion, questionResponses]);
  const isCheckingPreviousAnswer = Boolean(activeQuestion?.is_default && hasAnsweredDefaultQuestion === null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let ignore = false;

    const loadQuestions = async () => {
      try {
        const response = await fetch(PERSONAL_QUESTIONS_ENDPOINT);
        if (!response.ok) {
          throw new Error('Unable to fetch personal questions.');
        }
        const data = await response.json();
        if (ignore) return;
        const fetched = Array.isArray(data?.questions) ? data.questions : [];
        setPersonalQuestions(fetched);
        setPersonalQuestionIndex((prev) => normalizePersonalQuestionIndex(prev, fetched.length));
      } catch (error) {
        console.error(error);
        if (ignore) return;
        setPersonalQuestions([]);
        setPersonalQuestionIndex(0);
      }
    };

    const handleUpdate = () => {
      loadQuestions();
    };

    loadQuestions();
    window.addEventListener('personalQuestionsUpdated', handleUpdate);
    return () => {
      ignore = true;
      window.removeEventListener('personalQuestionsUpdated', handleUpdate);
    };
  }, []);

  const resetCuriousFlow = (options?: { preserveCountry?: boolean }) => {
    setCuriousStep('question');
    if (!options?.preserveCountry) {
      setAnswerChoice(null);
      setUserCountry('');
      setStoredCountry(null);
      setCountryInput('');
    } else {
      setAnswerChoice(null);
      if (storedCountry) {
        setCountryInput(storedCountry.name);
      }
    }
    setCuriousAnswer('');
    setIsCuriousAnswerFocused(false);
    setSubmissionError(null);
    setIsSubmittingResponse(false);
    setSubmissionMessage(null);
  };

  const closeCuriousModal = () => {
    setIsCuriousOpen(false);
    resetCuriousFlow({ preserveCountry: true });
  };

  const goToNextQuestion = () => {
    setQuestionIndex((prev) => {
      const next = (prev + 1) % totalQuestions;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(QUESTION_STORAGE_KEY, String(next));
      }
      return next;
    });
    resetCuriousFlow({ preserveCountry: true });
    setAnswerChoice(null);
    setShowSummary(false);
  };

  const resetQuiz = () => {
    resetCuriousFlow({ preserveCountry: true });
    setStats({ answered: 0, correct: 0 });
    setQuestionIndex(0);
    setAnswerChoice(null);
    setShowSummary(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(QUESTION_STORAGE_KEY, '0');
      window.localStorage.removeItem(SCORE_STORAGE_KEY);
      const newSessionId =
        typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      window.localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
      setSessionId(newSessionId);
    }
  };

  const handleCuriousClick = () => {
    resetCuriousFlow({ preserveCountry: true });
    setAnswerChoice(null);
    setShowSummary(false);
    setIsCuriousOpen(true);
  };

  const openToolbox = () => {
    setShowShareMenu(false);
    setToolboxTab('productivity');
    setIsToolboxOpen(true);
  };

  const closeToolbox = () => {
    setIsToolboxOpen(false);
  };

  const handleAskMore = () => {
    goToNextQuestion();
  };

  const handleRestartQuiz = () => {
    resetQuiz();
  };

  const shareResult = async () => {
    if (typeof window === 'undefined') return;
    const url = 'https://serdarsalim.com/common-misconceptions';
    const score = scorePercentage !== null ? `${scorePercentage}%` : null;
    const title = 'Common Misconceptions Quiz';
    const text = score ? `I scored ${score} on Serdar’s Common Misconceptions quiz.` : 'Explore the Common Misconceptions quiz by Serdar.';

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // ignore share cancellation
      }
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const shareTo = (platform: 'twitter' | 'linkedin' | 'copy') => {
    if (typeof window === 'undefined') return;
    const url = 'https://serdarsalim.com/common-misconceptions';
    const score = scorePercentage !== null ? `${scorePercentage}%` : null;
    const text = score ? `I scored ${score} on Serdar’s Common Misconceptions quiz.` : 'Explore the Common Misconceptions quiz by Serdar.';

    if (platform === 'copy') {
      navigator.clipboard?.writeText(url);
      setShowShareMenu(false);
      return;
    }

    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
    }
    setShowShareMenu(false);
  };

  const handleSkipQuestion = () => {
    goToNextQuestion();
  };

  const handleAnswerSelection = (choice: CuriousChoice) => {
    setAnswerChoice(choice);
    const isCorrect = choice === currentQuestion.correctAnswer;
    const isFinalQuestion = questionIndex === totalQuestions - 1;

    // Update stats
    updateStats(isCorrect);

    if (isCorrect && !isFinalQuestion) {
      // Correct answer on non-final question - go to next question immediately
      goToNextQuestion();
    } else {
      // Wrong answer OR final question - show result/explanation
      setCuriousStep('result');
      if (isFinalQuestion) {
        // Show summary automatically on final question
        setShowSummary(true);
      }
    }
  };

  const getNormalizedCountry = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return undefined;
    const normalizedInput = normalizeForMatching(trimmed);
    const aliasTarget = COUNTRY_NAME_ALIASES[normalizedInput];
    const targetName = aliasTarget ?? trimmed;
    const targetNormalized = normalizeForMatching(targetName);
    return countryOptions.find((country) => normalizeForMatching(country.name) === targetNormalized);
  };

  const trimmedCountryInput = countryInput.trim();
  const normalizedCountryInput = normalizeForMatching(trimmedCountryInput);
  const suggestedCountry =
    trimmedCountryInput.length > 0
      ? countryOptions.find((country) =>
          normalizeForMatching(country.name).startsWith(normalizedCountryInput)
        )
      : undefined;
  const resolvedCountryOption = getNormalizedCountry(countryInput) ?? suggestedCountry;
  const displaySuggestion = resolvedCountryOption?.name ?? '';
  const isCountryRecognized = Boolean(resolvedCountryOption);
  const canSubmitResponse = Boolean(isCountryRecognized && answerChoice && sessionId && !isSubmittingResponse);

  // Country suggestion for Question modal
  const trimmedQuestionCountryInput = questionCountry.trim();
  const normalizedQuestionCountryInput = normalizeForMatching(trimmedQuestionCountryInput);
  const suggestedQuestionCountry =
    trimmedQuestionCountryInput.length > 0
      ? countryOptions.find((country) =>
          normalizeForMatching(country.name).startsWith(normalizedQuestionCountryInput)
        )
      : undefined;
  const resolvedQuestionCountryOption = getNormalizedCountry(questionCountry) ?? suggestedQuestionCountry;
  const displayQuestionSuggestion = resolvedQuestionCountryOption?.name ?? '';
  // Only recognize country when full name matches (case-insensitive)
  const isQuestionCountryRecognized = Boolean(resolvedQuestionCountryOption);
  const canSubmitQuestion = Boolean(
    questionAnswer.trim() &&
      !isSubmittingResponse &&
      (questionProfile?.country || selectedQuestionCountry)
  );

  const checkIfAnswered = useCallback(
    async (questionId: string, endpoint: 'curious-response' | 'question-response') => {
      if (!sessionId) return false;
      try {
        const response = await fetch(`/api/${endpoint}?sessionId=${sessionId}&questionId=${questionId}`);
        if (response.ok) {
          const data = await response.json();
          return data.hasAnswered;
        }
      } catch (error) {
        console.error('Failed to check if answered', error);
      }
      return false;
    },
    [sessionId]
  );

  const persistPersonalQuestionIndex = (value: number) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PERSONAL_QUESTION_INDEX_KEY, String(value));
  };

  const persistQuestionProfile = (profile: QuestionProfile) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(QUESTION_PROFILE_NAME_KEY, profile.name);
    window.localStorage.setItem(QUESTION_PROFILE_COUNTRY_CODE_KEY, profile.country.code);
    setQuestionProfile(profile);
  };

  const submitAnswer = async (countryOption: CountryOption, chosen?: CuriousChoice) => {
    const choiceToUse = chosen ?? answerChoice;
    if (!choiceToUse || !sessionId || isSubmittingResponse) return;
    const isAnswerCorrectNow = choiceToUse === currentQuestion.correctAnswer;

    // Check if already answered
    const hasAnswered = await checkIfAnswered(currentQuestion.id, 'curious-response');
    if (hasAnswered) {
      setSubmissionError('You have already answered this question.');
      setCuriousStep('result');
      return;
    }

    setIsSubmittingResponse(true);
    setSubmissionError(null);
    setSubmissionMessage(null);

    let message: string | null = null;
    let didRecord = false;

    try {
      const response = await fetch('/api/curious-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          countryCode: countryOption.code,
          choice: choiceToUse,
          questionId: currentQuestion.id,
          answerText: curiousAnswer.trim() || null,
        }),
      });

      if (response.ok) {
        message = 'Thanks for sharing.';
        didRecord = true;
      } else if (response.status === 409) {
        message = null;
      } else {
        const data = await response.json().catch(() => null);
        setSubmissionError(data?.message ?? 'Unable to save your response right now. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to submit curious response', error);
      setSubmissionError('Unable to save your response right now. Please try again later.');
    } finally {
      setIsSubmittingResponse(false);
    }

    setSubmissionMessage(message);
    rememberCountry(countryOption);
    if (didRecord) {
      updateStats(isAnswerCorrectNow);
      if (typeof window !== 'undefined') {
        const nextIndex = (questionIndex + 1) % totalQuestions;
        window.localStorage.setItem(QUESTION_STORAGE_KEY, String(nextIndex));
      }
    }
    setCuriousStep('result');
  };

  const rememberCountry = (countryOption: CountryOption) => {
    setStoredCountry(countryOption);
    setUserCountry(countryOption.name);
    setCountryInput(countryOption.name);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify({ code: countryOption.code }));
    }
  };

  const updateStats = (didGetCorrect: boolean) => {
    setStats((prev) => {
      const updated = {
        answered: prev.answered + 1,
        correct: prev.correct + (didGetCorrect ? 1 : 0),
      };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleCountrySelection = (countryOption: CountryOption) => {
    setCountryInput(countryOption.name);
    submitAnswer(countryOption);
  };

  const isAnswerCorrect = answerChoice ? answerChoice === currentQuestion.correctAnswer : null;
  const answerDetails =
    isAnswerCorrect === null
      ? null
      : {
          label: isAnswerCorrect ? 'Correct Answer' : 'Wrong Answer',
          badgeClass: isAnswerCorrect
            ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-300/40'
            : 'bg-rose-500/15 text-rose-200 border border-rose-300/40',
          text: currentQuestion.explanation,
        };
  const isOnFinalQuestion = questionIndex === totalQuestions - 1;
  const quizComplete = isOnFinalQuestion && curiousStep === 'result';
  const scorePercentage = quizComplete ? Math.round((stats.correct / totalQuestions) * 100) : null;
  const tier =
    scorePercentage !== null
      ? scoreTiers.find((candidate) => scorePercentage >= candidate.min) ?? scoreTiers[scoreTiers.length - 1]
      : null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let storedSession = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (!storedSession) {
      storedSession = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      window.localStorage.setItem(SESSION_STORAGE_KEY, storedSession);
    }

    setSessionId(storedSession);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedQuestionName = window.localStorage.getItem(QUESTION_PROFILE_NAME_KEY);
    const storedQuestionCountryCode = window.localStorage.getItem(QUESTION_PROFILE_COUNTRY_CODE_KEY);
    if (storedQuestionName && storedQuestionCountryCode) {
      const match = countryOptions.find((country) => country.code === storedQuestionCountryCode);
      if (match) {
        setQuestionProfile({ name: storedQuestionName, country: match });
      }
    }

    const storedIndex = window.localStorage.getItem(QUESTION_STORAGE_KEY);
    if (storedIndex) {
      const parsed = Number(storedIndex);
      if (!Number.isNaN(parsed)) {
        setQuestionIndex(parsed % totalQuestions);
      }
    }

    const stored = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { code: string };
      const match = countryOptions.find((country) => country.code === parsed.code);
      if (match) {
        rememberCountry(match);
      }
    } catch {
      window.localStorage.removeItem(COUNTRY_STORAGE_KEY);
    }

    const storedScore = window.localStorage.getItem(SCORE_STORAGE_KEY);
    if (storedScore) {
      try {
        const parsedScore = JSON.parse(storedScore) as { answered: number; correct: number };
        if (
          typeof parsedScore.answered === 'number' &&
          typeof parsedScore.correct === 'number' &&
          parsedScore.answered >= 0 &&
          parsedScore.correct >= 0
        ) {
          setStats(parsedScore);
        }
      } catch {
        window.localStorage.removeItem(SCORE_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || questionCount === 0) return;

    const defaultIndex = personalQuestions.findIndex((question) => question.is_default);
    if (defaultIndex >= 0) {
      const normalizedDefault = normalizePersonalQuestionIndex(defaultIndex, questionCount);
      setPersonalQuestionIndex(normalizedDefault);
      persistPersonalQuestionIndex(normalizedDefault);
      return;
    }

    const storedPersonalIndex = window.localStorage.getItem(PERSONAL_QUESTION_INDEX_KEY);
    if (!storedPersonalIndex) return;
    const parsedPersonalIndex = Number(storedPersonalIndex);
    if (!Number.isNaN(parsedPersonalIndex)) {
      setPersonalQuestionIndex(normalizePersonalQuestionIndex(parsedPersonalIndex, questionCount));
    }
  }, [questionCount, personalQuestions]);
  useEffect(() => {
    if (!sessionId || !personalQuestions.length) {
      setHasAnsweredDefaultQuestion(null);
      return;
    }

    const defaultQuestion = personalQuestions.find((question) => question.is_default) ?? personalQuestions[0];
    if (!defaultQuestion) {
      setHasAnsweredDefaultQuestion(false);
      return;
    }

    let ignore = false;

    const checkDefaultAnswered = async () => {
      const answered = await checkIfAnswered(String(defaultQuestion.id), 'question-response');
      if (ignore) return;
      setHasAnsweredDefaultQuestion(answered);
    };

    checkDefaultAnswered();
    return () => {
      ignore = true;
    };
  }, [checkIfAnswered, personalQuestions, sessionId]);
  const loadQuestionResponses = useCallback(
    async (questionId?: number) => {
      if (!questionId) {
        setQuestionResponses([]);
        setIsLoadingQuestionResponses(false);
        return;
      }

      setIsLoadingQuestionResponses(true);
      try {
        const response = await fetch(`/api/question-responses?questionId=${questionId}`);
        if (!response.ok) {
          throw new Error('Unable to load responses.');
        }
        const data = await response.json();
        if (questionId === activeQuestion?.id) {
          setQuestionResponses(Array.isArray(data?.responses) ? data.responses : []);
        }
      } catch (error) {
        console.error('Failed to load question responses', error);
        if (questionId === activeQuestion?.id) {
          setQuestionResponses([]);
        }
      } finally {
        if (questionId === activeQuestion?.id) {
          setIsLoadingQuestionResponses(false);
        }
      }
    },
    [activeQuestion?.id]
  );

  useEffect(() => {
    void loadQuestionResponses(activeQuestion?.id ?? undefined);
  }, [activeQuestion?.id, loadQuestionResponses]);

  useEffect(() => {
    if (!activeQuestion?.is_default) return;
    if (hasAnsweredDefaultQuestion === true) {
      setIsQuestionSubmitted(true);
    } else if (hasAnsweredDefaultQuestion === false) {
      setIsQuestionSubmitted(false);
    }
  }, [activeQuestion?.is_default, hasAnsweredDefaultQuestion]);

  useEffect(() => {
    if (storedCountry) return;
    let ignore = false;

    const fetchGeoCountry = async () => {
      try {
        const response = await fetch('/api/geo');
        if (!response.ok) return;
        const data = await response.json();
        if (ignore || !data?.country) return;
        const match = countryOptions.find((country) => country.code === data.country.code);
        if (match) {
          rememberCountry(match);
        }
      } catch {
        // ignore geo failures
      }
    };

    fetchGeoCountry();

    return () => {
      ignore = true;
    };
  }, [storedCountry]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = isCuriousOpen || isToolboxOpen || isQuestionOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isCuriousOpen, isToolboxOpen, isQuestionOpen]);

  useEffect(() => {
    if (!questionProfile) return;
    setQuestionName(questionProfile.name);
    setQuestionCountry(questionProfile.country.name);
    setSelectedQuestionCountry(questionProfile.country);
  }, [questionProfile]);

  const selectQuestionCountry = (countryOption: CountryOption, autoSubmit = false) => {
    setQuestionCountry(countryOption.name);
    setSelectedQuestionCountry(countryOption);
    if (questionProfile) {
      setQuestionProfile(null);
    }
    if (autoSubmit) {
      handleQuestionSubmit(countryOption);
    }
  };

  const handleQuestionCountrySelection = (countryOption: CountryOption) => {
    selectQuestionCountry(countryOption, true);
  };

  const handleQuestionSubmit = async (countryOption?: CountryOption) => {
    if (!questionAnswer.trim()) return;

    const currentQuestionId = activeQuestion?.id;

    let selectedCountry = countryOption ?? questionProfile?.country ?? selectedQuestionCountry;
    if (!selectedCountry) {
      const countryMatch = countryOptions.find(
        (c) => c.name.toLowerCase() === questionCountry.trim().toLowerCase()
      );
      if (!countryMatch) {
        setSubmissionError('Please select a valid country.');
        return;
      }
      selectedCountry = countryMatch;
    }

    const rawUserName = questionName.trim() || questionProfile?.name;
    const resolvedUserName = rawUserName ? rawUserName : null;

    let currentSessionId = sessionId;
    if (!activeQuestion) {
      setSubmissionError('No question available. Please try again later.');
      return;
    }
    if (!currentSessionId) {
      currentSessionId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      setSessionId(currentSessionId);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(SESSION_STORAGE_KEY, currentSessionId);
      }
    }

    const hasAnswered = await checkIfAnswered(String(activeQuestion.id), 'question-response');
    if (hasAnswered) {
      setSubmissionError('You have already answered this question.');
      setIsQuestionSubmitted(true);
      return;
    }

    setIsSubmittingResponse(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/question-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: currentSessionId,
          countryCode: selectedCountry.code,
          questionId: String(activeQuestion.id),
          answerText: questionAnswer.trim(),
          userName: resolvedUserName,
        }),
      });

      if (response.ok) {
        setIsQuestionSubmitted(true);
        if (!questionProfile && resolvedUserName) {
          persistQuestionProfile({ name: resolvedUserName, country: selectedCountry });
        }
        if (currentQuestionId) {
          await loadQuestionResponses(currentQuestionId);
        }
      } else if (response.status === 409) {
        setSubmissionError('You have already answered this question.');
        setIsQuestionSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        setSubmissionError(data?.message ?? 'Unable to save your response. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit question response', error);
      setSubmissionError('Unable to save your response. Please try again.');
    } finally {
      setIsSubmittingResponse(false);
    }
  };

  const resetQuestionModal = () => {
    setQuestionAnswer('');
    setQuestionCountry('');
    setSelectedQuestionCountry(null);
    setQuestionName('');
    setIsQuestionFocused(false);
    setIsQuestionSubmitted(false);
    setSubmissionError(null);
  };

  const closeQuestionModal = () => {
    if (isQuestionAnimating) return;
    setIsQuestionAnimating(true);
    setIsQuestionOpen(false);

    // Wait for animation to complete, then clean up
    setTimeout(() => {
      resetQuestionModal();
      setIsQuestionAnimating(false);
    }, 500);
  };

  const openQuestionModal = async () => {
    if (isQuestionAnimating) return;
    setIsQuestionAnimating(true);
    if (!activeQuestion) {
      setSubmissionError('No questions available right now. Please add one from the admin.');
      setIsQuestionOpen(false);
      setTimeout(() => {
        setIsQuestionAnimating(false);
      }, 0);
      return;
    }
    setIsQuestionOpen(true);

    const defaultIndex = personalQuestions.findIndex((question) => question.is_default);
    const normalizedDefault =
      defaultIndex >= 0
        ? normalizePersonalQuestionIndex(defaultIndex, questionCount)
        : normalizePersonalQuestionIndex(personalQuestionIndex, questionCount);

    setPersonalQuestionIndex(normalizedDefault);
    persistPersonalQuestionIndex(normalizedDefault);
    setIsQuestionSubmitted(hasAnsweredDefaultQuestion === true);

    // Allow animation to complete
    setTimeout(() => {
      setIsQuestionAnimating(false);
    }, 500);
  };

  useImperativeHandle(ref, () => ({
    openCurious: () => {
      setShowShareMenu(false);
      handleCuriousClick();
    },
    openToolbox: () => {
      openToolbox();
    },
    openQuestion: () => {
      void openQuestionModal();
    },
  }));

  return (
    <>
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SkySunset />

      {/* Subtle space video anchored at bottom with fade upward */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 overflow-hidden" style={{ zIndex: 1 }}>
        <video
          className="w-full h-full object-cover pointer-events-none opacity-70"
          src="/universe.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)',
          }}
        />
      </div>

      {/* Content - wrapped for animation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex items-center min-h-screen py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end md:items-end w-full md:-ml-12 mx-auto">
          {/* Left side - Photo */}
          <div
            className="flex relative animate-fade-in-up justify-center self-start -mt-40 md:-mt-96 transition-transform duration-500 ease-in-out"
            style={{
              transform: isQuestionOpen ? 'translateX(-200%)' : 'translateX(0)',
            }}
          >
            <div className="relative">
              <img
                src="/profile.png"
                alt="Serdar Salim"
                className="w-full max-w-xs md:max-w-lg object-contain drop-shadow-2xl relative"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  filter: 'brightness(1)',
                  mixBlendMode: 'normal',
                }}
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div
            className="animate-fade-in-up animation-delay-200 md:-mt-32 transition-transform duration-500 ease-in-out"
            style={{
              transform: isQuestionOpen ? 'translateX(200%)' : 'translateX(0)',
            }}
          >
            <div className="w-full max-w-xl text-left mx-auto md:mx-0 space-y-6">
              <div className="space-y-2">
                <h1
                  id="hero-title"
                  className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight select-none cursor-pointer transition-all duration-300"
                  style={{
                    color: '#ffffff',
                    textShadow: '-3px 3px 0 #a855f7, -5px 5px 0 #7e22ce'
                  }}
                  onClick={() => setIsHoveringName(!isHoveringName)}
                >
                  {isHoveringName ? 'Salim Serdar' : 'Serdar Salim'}
                </h1>
                {/* Location - casual handwriting style */}
                <p
                  className="mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-2xl text-white font-light cursor-pointer select-none transition-all duration-300"
                  style={{ fontFamily: 'var(--font-caveat)', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                  onClick={() => setShowOrigin(!showOrigin)}
                >
                  {showOrigin ? 'From Türkiye 🇹🇷' : 'Based in Malaysia 🇲🇾'}
                </p>
              </div>

              {/* Subtitle */}
              <div className="text-sm sm:text-base md:text-lg text-white leading-relaxed space-y-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                <p
                  className="text-white font-semibold cursor-pointer select-none transition-all duration-300"
                  style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                  onClick={() => setShowThoughts(!showThoughts)}
                >
                  {showThoughts ? 'Shares his thoughts on tech, Islam, and life' : 'Builds web apps for everyday problems'}
                </p>
                <div
                  className="relative cursor-pointer select-none"
                  onClick={() => setIsHoveringQuote(!isHoveringQuote)}
                >
                  {/* English - always rendered to maintain layout space */}
                  <p
                    className={`text-white font-semibold transition-opacity duration-300 ${isHoveringQuote ? 'opacity-100' : 'opacity-0'}`}
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                  >
                    Be in this world as if you are a<br />
                    stranger or a wayfarer
                  </p>
                  {/* Arabic - absolute positioned overlay */}
                  <p
                    className={`text-white absolute inset-0 font-semibold transition-opacity duration-300 ${isHoveringQuote ? 'opacity-0' : 'opacity-100'}`}
                    style={{ fontFamily: 'var(--font-reem-kufi)', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                  >
                    كن في الدنيا كأنك غريب أو عابر سبيل
                  </p>
                </div>
              </div>

              {/* Subtle CTA that matches the design */}
              <div className="pt-3 md:pt-6 flex gap-2 flex-wrap items-center">
                <a
                  href="#about"
                  className="group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white font-light bg-black/40 backdrop-blur-md border border-white/25 shadow-lg hover:bg-black/50 transition-all duration-300 overflow-hidden"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-200/0 via-white/20 to-purple-200/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                  <span className="relative text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2 uppercase tracking-wide whitespace-nowrap">
                    <span>About me</span>
                    <svg className="hidden sm:block w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                    </svg>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => void openQuestionModal()}
                  disabled={isQuestionAnimating}
                  className="group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-white font-light bg-black/40 backdrop-blur-md border border-white/25 shadow-lg hover:bg-black/50 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-200/0 via-white/15 to-purple-200/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                  <span className="relative text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2 uppercase tracking-wide whitespace-nowrap">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-6 6m6-6l6 6" />
                    </svg>
                    <span>Curious?</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCuriousOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" onClick={() => setShowShareMenu(false)}>
          <div className="absolute inset-0 bg-[#0d031a]/90 backdrop-blur-md" onClick={closeCuriousModal} />
          <div className="relative z-10 w-full max-w-xl rounded-[30px] border border-white/25 bg-white/15 backdrop-blur-2xl text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)] p-6 md:p-8 flex flex-col h-[600px] md:h-[620px]">
            <div className="flex items-start justify-between gap-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); setShowShareMenu((prev) => !prev); }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 border border-white/30 hover:bg-white/30 transition"
                  aria-label="Share curious quiz"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 6l-4-4m0 0L8 6m4-4v18" />
                  </svg>
                </button>
                {showShareMenu && (
                  <div className="absolute left-0 top-12 bg-white/20 border border-white/30 rounded-2xl backdrop-blur px-3 py-2 space-y-2 text-xs" onClick={(event) => event.stopPropagation()}>
                    <button onClick={() => shareTo('twitter')} className="block text-left w-full hover:text-white">Twitter</button>
                    <button onClick={() => shareTo('linkedin')} className="block text-left w-full hover:text-white">LinkedIn</button>
                    <button onClick={() => shareTo('copy')} className="block text-left w-full hover:text-white">Copy link</button>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={closeCuriousModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/40 hover:bg-white/30 transition"
                aria-label="Close curious modal"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-6">
              {curiousStep === 'question' && (
                <div className="space-y-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex justify-center">
                      <img src={currentQuestion.image ?? '/quiz/depression.png'} alt="Curious illustration" className="w-36 md:w-48 drop-shadow-2xl" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      Question {questionIndex + 1} / {totalQuestions}
                    </p>
                  </div>
                  <p className="pb-4 text-lg md:text-xl font-semibold leading-relaxed">{currentQuestion.prompt}</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => handleAnswerSelection('yes')}
                      className="min-w-[88px] px-3 py-2.5 rounded-2xl bg-white/20 border border-white/40 hover:bg-white/30 transition font-semibold uppercase tracking-wide"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswerSelection('no')}
                      className="min-w-[88px] px-3 py-2.5 rounded-2xl bg-white/20 border border-white/40 hover:bg-white/30 transition font-semibold uppercase tracking-wide"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={handleSkipQuestion}
                      className="min-w-[88px] px-3 py-2.5 rounded-2xl border border-white/40 text-white/80 hover:bg-white/10 transition font-semibold uppercase tracking-wide"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              )}


              {curiousStep === 'result' && (
                <div className="flex flex-col flex-1 justify-center space-y-4">
                  {quizComplete && showSummary && scorePercentage !== null && tier ? (
                    <div className="space-y-4 text-center">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">You finished all {totalQuestions} myths</p>
                      <p className="text-4xl font-bold text-white">{scorePercentage}%</p>
                      <p className="text-sm uppercase tracking-[0.3em] text-white/80">{tier.label}</p>
                      <p className="text-xs text-white/70">{tier.description} ({stats.correct}/{stats.answered} correct)</p>
                    </div>
                  ) : (
                    answerDetails && (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <img
                            src={currentQuestion.image ?? '/quiz/depression.png'}
                            alt="Curious result"
                            className="w-32 md:w-40 drop-shadow-2xl"
                          />
                        </div>
                        <div className="flex justify-center">
                          <span className={`px-4 py-1 rounded-full text-xs uppercase tracking-[0.25em] ${answerDetails.badgeClass}`}>
                            {answerDetails.label}
                          </span>
                        </div>
                        <p className="text-sm md:text-base leading-relaxed text-white/90 text-center">
                          {answerDetails.text}
                        </p>
                      </div>
                    )
                  )}

                  {submissionMessage && (
                    <p className="text-xs text-white/75 text-center">
                      {submissionMessage}
                    </p>
                  )}
                  {submissionError && (
                    <p className="text-xs text-red-200 text-center">
                      {submissionError}
                    </p>
                  )}
                </div>
              )}
            </div>
            {curiousStep === 'result' && (
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3 justify-center">
                {quizComplete ? (
                  showSummary ? (
                    <>
                      <button
                        type="button"
                        onClick={closeCuriousModal}
                        className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white/15 border border-white/40 font-semibold uppercase tracking-wide hover:bg-white/25 transition"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={shareResult}
                        className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white/15 border border-white/40 font-semibold uppercase tracking-wide hover:bg-white/25 transition"
                      >
                        Share
                      </button>
                      <button
                        type="button"
                        onClick={handleRestartQuiz}
                        className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide"
                      >
                        Restart
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowSummary(true)}
                      className="w-full max-w-[200px] mx-auto px-6 py-2.5 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide"
                    >
                      Score
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={handleAskMore}
                    className="w-full max-w-[200px] mx-auto px-6 py-2.5 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isToolboxOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center px-4 py-12">
          <div className="absolute inset-0 bg-[#04000b]/85 backdrop-blur-sm" onClick={closeToolbox} />
          <div className="toolbox-modal relative z-10 mt-12 w-full max-w-[880px] rounded-4xl border border-white/20 bg-white/10 backdrop-blur-2xl text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="text-sm uppercase tracking-wider text-white/70">Things worth sharing</p>
              </div>
              <button
                type="button"
                onClick={closeToolbox}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 border border-white/25 hover:bg-white/25 transition"
                aria-label="Close toolbox"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
                {[
                  { id: 'inspiration' as const, label: 'Inspire' },
                  { id: 'creativity' as const, label: 'Create' },
                  { id: 'productivity' as const, label: 'Focus' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-[0.3em] transition ${
                      toolboxTab === tab.id ? 'bg-white text-[#4c2372]' : 'text-white/70'
                    }`}
                    onClick={() => setToolboxTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              {toolboxCategories[toolboxTab].map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/20 bg-white/5 p-4 flex flex-col gap-2 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{tool.name}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{tool.type}</p>
                    </div>
                    <span className="text-[11px] font-medium text-white/70 group-hover:text-white transition-colors">
                      Visit →
                    </span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">{tool.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Question Modal - Slide-in Panel */}
      {(isQuestionOpen || isQuestionAnimating) && (
        <div className="fixed inset-0 z-40 md:px-4 md:pt-20 md:pb-8 flex items-center justify-center">
          <div
            className="relative overflow-hidden w-full h-full md:h-[85vh] md:max-w-2xl md:max-h-[800px] md:rounded-[30px] md:border border-white/25 bg-black/70 backdrop-blur-2xl text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)] pt-20 px-4 pb-4 md:p-8 flex flex-col transition-all duration-500 ease-in-out"
            style={{
              transform: isQuestionOpen ? 'translateY(0)' : 'translateY(100%)',
              opacity: isQuestionOpen ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/15 via-transparent to-transparent opacity-60"
              aria-hidden="true"
            />
            <div className="relative mb-6">
              <button
                type="button"
                onClick={closeQuestionModal}
                className="absolute right-0 top-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/40 hover:bg-white/30 transition shrink-0"
                aria-label="Close question modal"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-lg md:text-xl font-semibold text-white text-center pt-12">
                {activeQuestion?.question ?? 'No question available yet'}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto question-modal-scroll pr-2">
              {isCheckingPreviousAnswer ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="text-sm text-white/60">Checking your previous answer…</p>
                </div>
              ) : !isQuestionSubmitted ? (
                <div className="space-y-4">
                  <p className="text-sm md:text-base font-semibold text-white/70 text-center tracking-widest">
                    Share yours. See mine.
                  </p>
                  <textarea
                    placeholder="Type your answer..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/25 border border-white/50 text-base text-white placeholder-white/60 focus:outline-none focus:border-white/70 focus:border-2 resize-none"
                    rows={4}
                    value={questionAnswer}
                    onChange={(e) => setQuestionAnswer(e.target.value)}
                    onFocus={() => setIsQuestionFocused(true)}
                  />

                  {isQuestionFocused && (
                    <div className="space-y-3 animate-fade-in-up">
                      <div className="flex gap-3 justify-center">
                        <div className="relative w-full max-w-[200px]">
                          <input
                            type="text"
                            placeholder="Your name..."
                            className="relative z-10 w-full px-4 py-2.5 rounded-2xl bg-white/15 border border-white/50 text-base text-white text-center placeholder-white/60 focus:outline-none focus:border-white/70 focus:border-2"
                            value={questionName}
                            onChange={(e) => {
                              setQuestionName(e.target.value);
                              if (questionProfile) {
                                setQuestionProfile(null);
                              }
                            }}
                          />
                        </div>
                        <div className="relative w-full max-w-[240px]">
                          <input
                            type="text"
                            placeholder="Your country..."
                            className="relative z-10 w-full px-4 py-2.5 rounded-2xl bg-white/15 border border-white/50 text-base text-white text-center placeholder-white/60 focus:outline-none focus:border-white/70 focus:border-2"
                            value={questionCountry}
                            onChange={(e) => {
                              setQuestionCountry(e.target.value);
                              if (questionProfile) {
                                setQuestionProfile(null);
                              }
                              setSelectedQuestionCountry(null);
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === 'Enter' &&
                                isQuestionCountryRecognized &&
                                resolvedQuestionCountryOption
                              ) {
                                event.preventDefault();
                                handleQuestionCountrySelection(resolvedQuestionCountryOption);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-center min-h-[32px]">
                        {!selectedQuestionCountry && resolvedQuestionCountryOption && normalizeForMatching(questionCountry.trim()) !== normalizeForMatching(resolvedQuestionCountryOption.name) ? (
                          <button
                            type="button"
                            onClick={() => selectQuestionCountry(resolvedQuestionCountryOption)}
                            className="rounded-full px-4 py-1.5 border border-white/30 bg-white/10 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
                          >
                            Select {resolvedQuestionCountryOption.name}
                          </button>
                        ) : null}
                      </div>
                      {questionProfile && (
                        <p className="text-xs text-white/70 text-center">
                          Responses will be logged as {questionProfile.name} from {questionProfile.country.name}.
                        </p>
                      )}
                      <p className="text-xs text-white/60 text-center">
                        By submitting, you agree your answer may be shared publicly
                      </p>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleQuestionSubmit(questionProfile ? undefined : resolvedQuestionCountryOption)}
                          disabled={!canSubmitQuestion}
                          className="px-8 py-2.5 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition"
                        >
                          {isSubmittingResponse ? 'Saving...' : 'Submit'}
                        </button>
                      </div>
                      {submissionError && (
                        <p className="text-xs text-red-200 text-center">
                          {submissionError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
        <div className="space-y-6 pb-16">
          <div className="grid gap-4">
            {responseList.map((entry) => (
              <article
                key={entry.id}
                className="rounded-3xl border border-white/15 bg-transparent px-4 py-3 shadow-[0_15px_45px_rgba(0,0,0,0.15)] space-y-3"
              >
                <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
                  <span className={`font-semibold ${entry.id.startsWith('serdar-') ? 'text-amber-100' : 'text-white/70'}`}>
                    {entry.name}
                    {entry.country ? ` • ${entry.country}` : ''}
                  </span>
                  {entry.createdAt && (
                    <span className="text-white/40">
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {entry.paragraphs.map((paragraph, index) => (
                    <p
                      key={`${entry.id}-${index}`}
                      className="text-base leading-relaxed text-white/95 whitespace-pre-wrap"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {isLoadingQuestionResponses && responseList.length <= 1 && (
            <p className="text-sm text-white/70">Loading other responses…</p>
          )}
        </div>
      )}
            </div>
          </div>
        </div>
      )}

      {/* Subtle Islamic pattern - fades upward */}
      <IslamicPattern position="bottom" variant={1} />
    </section>
    <style jsx>{`
      :global(.toolbox-modal) {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
      }
      :global(.toolbox-modal::-webkit-scrollbar) {
        width: 6px;
      }
      :global(.toolbox-modal::-webkit-scrollbar-track) {
        background: transparent;
      }
      :global(.toolbox-modal::-webkit-scrollbar-thumb) {
        background: rgba(255, 255, 255, 0.35);
        border-radius: 999px;
      }
      :global(.question-modal-scroll) {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
      }
      :global(.question-modal-scroll::-webkit-scrollbar) {
        width: 8px;
      }
      :global(.question-modal-scroll::-webkit-scrollbar-track) {
        background: transparent;
        margin-right: 4px;
      }
      :global(.question-modal-scroll::-webkit-scrollbar-thumb) {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 999px;
        border-right: 4px solid transparent;
        background-clip: padding-box;
      }
      @media (prefers-reduced-motion: reduce) {
        * {
          transition-duration: 0.01ms !important;
          animation-duration: 0.01ms !important;
        }
      }
    `}</style>
    </>
  );
});

export default Hero;
