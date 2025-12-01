'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import IslamicPattern from './IslamicPattern';
import SwimFish from './SwimFish';
import { countryOptions, type CountryOption } from '../data/countries';

type CuriousStep = 'question' | 'location' | 'result';
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

export type HeroHandle = {
  openCurious: () => void;
};

const Hero = forwardRef<HeroHandle>(function Hero(_, ref) {
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [isHoveringQuote, setIsHoveringQuote] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const [isCuriousOpen, setIsCuriousOpen] = useState(false);
  const [curiousStep, setCuriousStep] = useState<CuriousStep>('question');
  const [answerChoice, setAnswerChoice] = useState<CuriousChoice | null>(null);
  const [userCountry, setUserCountry] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [storedCountry, setStoredCountry] = useState<CountryOption | null>(null);
  const [stats, setStats] = useState({ answered: 0, correct: 0 });
  const [showSummary, setShowSummary] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const fishEyeRef = useRef<HTMLDivElement | null>(null);
  const [fishEyeOffset, setFishEyeOffset] = useState({ x: 0, y: 0 });
  const totalQuestions = curiousQuestions.length;
  const currentQuestion = curiousQuestions[questionIndex];

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
    if (storedCountry) {
      submitAnswer(storedCountry, choice);
    } else {
      setCuriousStep('location');
    }
  };

  const getNormalizedCountry = (input: string) => {
    const normalized = input.trim().toLowerCase();
    if (!normalized) return undefined;
    return countryOptions.find((country) => country.name.toLowerCase() === normalized);
  };

  const trimmedCountryInput = countryInput.trim();
  const suggestedCountry =
    trimmedCountryInput.length > 0
      ? countryOptions.find((country) => country.name.toLowerCase().startsWith(trimmedCountryInput.toLowerCase()))
      : undefined;
  const resolvedCountryOption = getNormalizedCountry(countryInput) ?? suggestedCountry;
  const displaySuggestion = resolvedCountryOption?.name ?? '';
  const isCountryRecognized = Boolean(resolvedCountryOption);
  const canSubmitResponse = Boolean(isCountryRecognized && answerChoice && sessionId && !isSubmittingResponse);

  const submitAnswer = async (countryOption: CountryOption, chosen?: CuriousChoice) => {
    const choiceToUse = chosen ?? answerChoice;
    if (!choiceToUse || !sessionId || isSubmittingResponse) return;
    const isAnswerCorrectNow = choiceToUse === currentQuestion.correctAnswer;

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
    if (typeof window === 'undefined') return;
    const heroEl = heroSectionRef.current;
    if (!heroEl) return;

    const handlePointerMove = (event: PointerEvent) => {
      const fishRect = fishEyeRef.current?.getBoundingClientRect();
      if (!fishRect) return;

      const centerX = fishRect.left + fishRect.width / 2;
      const centerY = fishRect.top + fishRect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const maxX = Math.max(fishRect.width, 60);
      const maxY = Math.max(fishRect.height, 40);

      setFishEyeOffset({
        x: Math.max(-1, Math.min(1, dx / maxX)),
        y: Math.max(-1, Math.min(1, dy / maxY)),
      });
    };

    const resetEye = () => setFishEyeOffset({ x: 0, y: 0 });

    heroEl.addEventListener('pointermove', handlePointerMove);
    heroEl.addEventListener('pointerleave', resetEye);

    return () => {
      heroEl.removeEventListener('pointermove', handlePointerMove);
      heroEl.removeEventListener('pointerleave', resetEye);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    openCurious: () => {
      setShowShareMenu(false);
      handleCuriousClick();
    },
  }));

  return (
    <>
      <section ref={heroSectionRef} id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle space video anchored at bottom with fade upward */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
        <video
          className="w-full h-full object-cover pointer-events-none"
          src="/universe.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to top, black 30%, black 30%, transparent 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 30%, black 30%, transparent 70%, transparent 100%)',
          }}
        />
      </div>

      {/* Light sky gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-[#cc5f5f]/95 via-[#b83b7b]/90 to-[#4c2372]/85" />
      <div className="absolute inset-0 bg-black/10" aria-hidden="true" />

      {/* Subtle layered atmosphere with clouds effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-linear-to-b from-sky-200 to-transparent opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-indigo-500/60 to-transparent opacity-60" />
      </div>

      {/* Floating fish accent */}
      <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none">
        <button
          type="button"
          className="curious-fish-orbit"
          aria-label="Open Curious quiz"
          onClick={handleCuriousClick}
          style={{ pointerEvents: 'auto' }}
        >
          <span className="curious-fish-bob">
            <span className="curious-fish-body" ref={fishEyeRef}>
              <SwimFish className="w-20 md:w-28 h-auto opacity-90" eyeOffset={fishEyeOffset} />
            </span>
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex items-center min-h-screen py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end md:items-end w-full md:-ml-12 mx-auto">
          {/* Left side - Photo */}
          <div className="flex relative animate-fade-in-up justify-center self-start -mt-40 md:-mt-96">
            <div className="relative">
              <img
                src="/profile.png"
                alt="Serdar Salim"
                className="w-full max-w-xs md:max-w-lg object-contain drop-shadow-2xl relative"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  filter: 'none',
                  mixBlendMode: 'normal',
                }}
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div className="animate-fade-in-up animation-delay-200 md:-mt-32">
            <div className="w-full max-w-xl text-left mx-auto md:mx-0 space-y-6">
              <div className="space-y-2">
                <h1
                  id="hero-title"
                  className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white select-none cursor-pointer transition-all duration-300"
                  onClick={() => setIsHoveringName(!isHoveringName)}
                >
                  {isHoveringName ? 'Salim Serdar' : 'Serdar Salim'}
                </h1>
                {/* Location - casual handwriting style */}
                <p
                  className="mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-2xl text-white/80 font-light cursor-pointer select-none transition-all duration-300"
                  style={{ fontFamily: 'var(--font-caveat)' }}
                  onClick={() => setShowOrigin(!showOrigin)}
                >
                  {showOrigin ? 'From Türkiye 🇹🇷' : 'Based in Malaysia 🇲🇾'}
                </p>
              </div>

              {/* Subtitle */}
              <div className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed space-y-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                <p className="text-white font-semibold">
                  Builds web apps that make life easier
                </p>
                <p className="text-white font-semibold">
                  Creates content for personal growth
                </p>
                <div
                  className="relative cursor-pointer select-none"
                  onClick={() => setIsHoveringQuote(!isHoveringQuote)}
                >
                  {/* English - always rendered to maintain layout space */}
                  <p
                    className={`font-semibold transition-opacity duration-300 ${isHoveringQuote ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Be in this world as if you are a<br />
                    stranger or a wayfarer
                  </p>
                  {/* Arabic - absolute positioned overlay */}
                  <p
                    className={`absolute inset-0 font-semibold transition-opacity duration-300 ${isHoveringQuote ? 'opacity-0' : 'opacity-100'}`}
                    style={{ fontFamily: 'var(--font-reem-kufi)' }}
                  >
                    كن في الدنيا كأنك غريب أو عابر سبيل
                  </p>
                </div>
              </div>

              {/* Subtle CTA that matches the design */}
              <div className="pt-3 md:pt-6 flex gap-2 w-full">
                <a
                  href="#about"
                  className="group relative inline-flex justify-center items-center gap-1.5 px-3 py-2 rounded-lg text-white font-light bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300 overflow-hidden"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-200/0 via-white/20 to-purple-200/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                  <span className="relative text-sm sm:text-base md:text-lg font-semibold flex items-center gap-1.5 uppercase tracking-wide whitespace-nowrap">
                    <span>About me</span>
                    <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                    </svg>
                  </span>
                </a>
                <a
                  href="#projects"
                  className="group relative inline-flex justify-center items-center gap-1.5 px-3 py-2 rounded-lg text-white font-light bg-white/5 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/15 transition-all duration-300 overflow-hidden"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-200/0 via-white/15 to-purple-200/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                  <span className="relative text-sm sm:text-base md:text-lg font-semibold flex items-center gap-1.5 uppercase tracking-wide whitespace-nowrap">
                    <span>Apps</span>
                    <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                    </svg>
                  </span>
                </a>
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

              {curiousStep === 'location' && (
                <div className="space-y-4 text-center">
                  <div className="flex justify-center">
                    <img src="/quiz/globus2.jpg" alt="Globe illustration" className="w-40 md:w-56 rounded-full border border-white/30 shadow-lg" />
                  </div>
                  <p className="text-base md:text-lg font-semibold">Where are you joining from?</p>
                  <div className="space-y-3 flex flex-col items-center min-h-[120px]">
                    <div className="relative w-full max-w-[260px]">
                      <input
                        type="text"
                        placeholder="Start typing your country..."
                        className="relative z-10 w-full px-4 py-2.5 rounded-2xl bg-white/15 border border-white/50 text-base text-white text-center placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/70"
                        value={countryInput}
                        onChange={(event) => setCountryInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' && canSubmitResponse && resolvedCountryOption) {
                            event.preventDefault();
                            submitAnswer(resolvedCountryOption);
                          }
                        }}
                      />
                    </div>
                    {displaySuggestion && (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-2xl border border-white/40 text-white text-sm bg-white/10 hover:bg-white/20 transition"
                        onClick={() => resolvedCountryOption && handleCountrySelection(resolvedCountryOption)}
                      >
                        {displaySuggestion}
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-white/70 max-w-sm mx-auto text-center leading-relaxed">
                    By clicking “See the answer” you consent to us storing this response with your session ID, country, and answer for anonymous stats. We don&apos;t collect account info or anything personally identifying.
                  </p>
                  <button
                    type="button"
                    onClick={() => resolvedCountryOption && submitAnswer(resolvedCountryOption)}
                    disabled={!canSubmitResponse}
                    className="mx-auto inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingResponse ? 'Saving...' : 'See the answer'}
                  </button>
                  {submissionError && (
                    <p className="text-xs text-red-200 text-center">
                      {submissionError}
                    </p>
                  )}
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
                <button
                  type="button"
                  onClick={closeCuriousModal}
                  className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white/15 border border-white/40 font-semibold uppercase tracking-wide hover:bg-white/25 transition"
                >
                  Close
                </button>
                {quizComplete ? (
                  showSummary ? (
                    <>
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
                      className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide"
                    >
                      Score
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={handleAskMore}
                    className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide"
                  >
                    Ask more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtle Islamic pattern - fades upward */}
      <IslamicPattern position="bottom" variant={1} />
    </section>
    <style jsx>{`
      :global(.curious-fish-orbit) {
        position: absolute;
        animation: curiousFishRoam 26s ease-in-out infinite;
        touch-action: manipulation;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        line-height: 0;
      }

      :global(.curious-fish-bob) {
        animation: curiousFishFloat 11s ease-in-out infinite;
        display: inline-block;
        position: relative;
      }

      :global(.curious-fish-body) {
        transform-origin: center;
        animation: curiousFishTilt 9s ease-in-out infinite;
        filter: drop-shadow(0 32px 42px rgba(15, 23, 42, 0.4));
        display: inline-block;
        pointer-events: auto;
      }

      :global(.curious-fish-body svg) {
        display: block;
        pointer-events: auto;
      }

      @keyframes curiousFishRoam {
        0% {
          transform: translate3d(75vw, 15vh, 0) translate(-50%, -50%) rotate(-15deg) scale(0.85);
        }
        20% {
          transform: translate3d(58vw, 35vh, 0) translate(-50%, -50%) rotate(-25deg) scale(0.95);
        }
        40% {
          transform: translate3d(25vw, 42vh, 0) translate(-50%, -50%) rotate(5deg) scale(1.05);
        }
        60% {
          transform: translate3d(38vw, 78vh, 0) translate(-50%, -50%) rotate(20deg) scale(0.92);
        }
        80% {
          transform: translate3d(80vw, 62vh, 0) translate(-50%, -50%) rotate(-5deg) scale(1.08);
        }
        100% {
          transform: translate3d(75vw, 15vh, 0) translate(-50%, -50%) rotate(-15deg) scale(0.85);
        }
      }

      @keyframes curiousFishFloat {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
        100% {
          transform: translateY(0);
        }
      }

      @keyframes curiousFishTilt {
        0% {
          transform: rotate(-6deg);
        }
        50% {
          transform: rotate(4deg);
        }
        100% {
          transform: rotate(-6deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :global(.curious-fish-orbit) {
          animation: none;
          transform: translate3d(65vw, 35vh, 0) scale(0.95);
        }
        :global(.curious-fish-bob) {
          animation: none;
          transform: translate(-50%, -50%);
        }
        :global(.curious-fish-body) {
          animation: none;
        }
      }
    `}</style>
    </>
  );
});

export default Hero;
