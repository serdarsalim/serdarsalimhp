'use client';

import { useEffect, useState } from 'react';
import IslamicPattern from './IslamicPattern';
import { countryOptions } from '../data/countries';

type CuriousStep = 'question' | 'location' | 'result';

export default function Hero() {
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [isHoveringQuote, setIsHoveringQuote] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const [isCuriousOpen, setIsCuriousOpen] = useState(false);
  const [curiousStep, setCuriousStep] = useState<CuriousStep>('question');
  const [answerChoice, setAnswerChoice] = useState<'yes' | 'no' | null>(null);
  const [userCountry, setUserCountry] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [hasSubmittedResponse, setHasSubmittedResponse] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  const resetCuriousFlow = () => {
    setCuriousStep('question');
    setAnswerChoice(null);
    setUserCountry('');
    setCountryInput('');
    setSubmissionError(null);
    setHasSubmittedResponse(false);
    setIsSubmittingResponse(false);
    setSubmissionMessage(null);
  };

  const closeCuriousModal = () => {
    setIsCuriousOpen(false);
    resetCuriousFlow();
  };

  const handleCuriousClick = () => {
    resetCuriousFlow();
    setIsCuriousOpen(true);
  };

  const handleAnswerSelection = (choice: 'yes' | 'no') => {
    setAnswerChoice(choice);
    setCuriousStep('location');
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
  const displaySuggestion =
    suggestedCountry && suggestedCountry.name.toLowerCase() !== trimmedCountryInput.toLowerCase() ? suggestedCountry.name : '';
  const resolvedCountryOption = getNormalizedCountry(countryInput) ?? suggestedCountry;
  const isCountryRecognized = Boolean(resolvedCountryOption);
  const canSubmitResponse = Boolean(isCountryRecognized && answerChoice && sessionId && !isSubmittingResponse);

  const handleCountrySubmit = async () => {
    if (!resolvedCountryOption || !answerChoice || !sessionId || isSubmittingResponse) return;

    setIsSubmittingResponse(true);
    setSubmissionError(null);
    setSubmissionMessage(null);

    let didSave = false;
    let message: string | null = null;

    try {
      const response = await fetch('/api/curious-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          countryCode: resolvedCountryOption.code,
          choice: answerChoice,
        }),
      });

      if (response.ok) {
        didSave = true;
        message = 'Thanks for sharing.';
      } else if (response.status === 409) {
        didSave = true;
        message = 'Looks like you already answered earlier from this device.';
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
    setHasSubmittedResponse(didSave);
    setUserCountry(resolvedCountryOption.name);
    setCuriousStep('result');
  };

  const answerText =
    answerChoice === 'yes'
      ? "It's a common myth that depression is purely the result of a chemical imbalance. Brain chemistry plays a role, but current research shows depression is multifaceted—shaped by biology, psychology, environment, trauma, and lifestyle. Effective care usually blends medical, therapeutic, spiritual, and social support."
      : 'Right instinct—science has moved beyond the old “chemical imbalance” slogan. Depression reflects a complex interaction of biology, lived experiences, stressors, and even community support. Holistic treatment plans that mix therapy, healthy routines, faith, and medical care when needed tend to help most.';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storageKey = 'curious-session-id';
    let storedSession = window.localStorage.getItem(storageKey);

    if (!storedSession) {
      storedSession = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      window.localStorage.setItem(storageKey, storedSession);
    }

    setSessionId(storedSession);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              <div className="pt-6 flex gap-2 w-full flex-nowrap">
                <a
                  href="#about"
                  className="group relative inline-flex flex-1 min-w-0 justify-center items-center gap-2 px-2.5 py-2 rounded-lg text-white font-light bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300 overflow-hidden"
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
                <a
                  href="#projects"
                  className="group relative inline-flex flex-1 min-w-0 justify-center items-center gap-2 px-2.5 py-2 rounded-lg text-white font-light bg-white/5 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/15 transition-all duration-300 overflow-hidden"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-200/0 via-white/15 to-purple-200/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                  <span className="relative text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2 uppercase tracking-wide whitespace-nowrap">
                    <span>Apps</span>
                    <svg className="hidden sm:block w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                    </svg>
                  </span>
                </a>
                <button
                  type="button"
                  className="group relative inline-flex flex-1 min-w-0 justify-center items-center gap-2 px-2.5 py-2 rounded-lg text-white font-light bg-white/5 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/15 transition-all duration-300 overflow-hidden"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                  onClick={handleCuriousClick}
                >
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-200/10 via-white/20 to-purple-200/10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                  <span className="relative text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2 uppercase tracking-wide whitespace-nowrap">
                    <span>Curious?</span>
                    <svg className="hidden sm:block w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-6 6m6-6l6 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCuriousOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCuriousModal} />
          <div className="relative z-10 w-full max-w-xl rounded-[30px] border border-white/25 bg-white/15 backdrop-blur-2xl text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)] p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Curious?</p>
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

            {curiousStep === 'question' && (
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <img src="/quiz/depression.png" alt="Depression illustration" className="w-36 md:w-48 drop-shadow-2xl" />
                </div>
                <p className="pb-4 text-lg md:text-xl font-semibold leading-relaxed">Is depression caused by a chemical imbalance?</p>
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
                        if (event.key === 'Enter' && canSubmitResponse) {
                          event.preventDefault();
                          handleCountrySubmit();
                        }
                      }}
                    />
                  </div>
                  {displaySuggestion && (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-2xl border border-white/40 text-white text-sm bg-white/10 hover:bg-white/20 transition"
                      onClick={() => setCountryInput(displaySuggestion)}
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
                  onClick={handleCountrySubmit}
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
              <div className="space-y-4">
                <p className="text-sm md:text-base leading-relaxed text-white/90">{answerText}</p>
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
                <div className="flex flex-wrap gap-3 pt-4 justify-center">
                  <button
                    type="button"
                    onClick={closeCuriousModal}
                    className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white/15 border border-white/40 font-semibold uppercase tracking-wide hover:bg-white/25 transition"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleCuriousClick}
                    className="flex-1 min-w-[120px] max-w-[150px] px-3.5 py-2 rounded-2xl bg-white text-[#4c2372] font-semibold uppercase tracking-wide"
                  >
                    Ask again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtle Islamic pattern - fades upward */}
      <IslamicPattern position="bottom" variant={1} />
    </section>
  );
}
