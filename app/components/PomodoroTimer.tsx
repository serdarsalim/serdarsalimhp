'use client';

import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer() {
  const [sessionLength, setSessionLength] = useState(30 * 60); // in seconds
  const [breakLength, setBreakLength] = useState(5 * 60); // in seconds
  const [remainingTime, setRemainingTime] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countType, setCountType] = useState<'session' | 'break' | undefined>(undefined);
  const [sessionNum, setSessionNum] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sessionMax = 60;
  const sessionMin = 5;
  const breakMax = 10;
  const breakMin = 1;

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startSession = () => {
    setSessionNum(prev => prev + 1);
    setCountType('session');
    setIsRunning(true);
    setIsPaused(false);
    startTimer(remainingTime || sessionLength);
  };

  const startBreak = () => {
    setCountType('break');
    setIsRunning(true);
    setIsPaused(false);
    startTimer(remainingTime || breakLength);
  };

  const startTimer = (timeLeft: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      timeLeft--;
      setRemainingTime(timeLeft);

      if (timeLeft < 1) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        // Auto-switch between session and break
        if (countType === 'session') {
          startBreak();
        } else {
          startSession();
        }
      }
    }, 1000);
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(true);
    if (sessionNum > 0) {
      setSessionNum(prev => prev - 1);
    }
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    setCountType(undefined);
    setRemainingTime(sessionLength);
  };

  const updateSession = (minutes: number) => {
    const clamped = Math.min(Math.max(minutes, sessionMin), sessionMax);
    setSessionLength(clamped * 60);
    setRemainingTime(clamped * 60);
    reset();
  };

  const updateBreak = (minutes: number) => {
    const clamped = Math.min(Math.max(minutes, breakMin), breakMax);
    setBreakLength(clamped * 60);
    reset();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds - mins * 60;
    return {
      minutes: mins.toString(),
      seconds: secs < 10 ? `0${secs}` : secs.toString()
    };
  };

  const time = formatTime(remainingTime);
  const sessionMinutes = sessionLength / 60;
  const breakMinutes = breakLength / 60;

  const getTitle = () => {
    if (isPaused) return 'Paused';
    if (countType === 'session') return `Session ${sessionNum}`;
    if (countType === 'break') return `Break ${sessionNum}`;
    return 'Ready?';
  };

  const controlsClass = isPaused ? 'paused' : isRunning ? 'started' : 'reset';

  return (
    <div className="pomodoro-container w-full max-w-lg mx-auto">
      {/* Timer Display */}
      <div className="clock-container relative mb-8">
        <div
          className="timer-display flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-pink-200/30 to-purple-300/30 rounded-full w-64 h-64 mx-auto backdrop-blur-sm border-4 border-pink-300/40 shadow-2xl"
          onClick={() => {
            if (countType === 'break') {
              startBreak();
            } else {
              startSession();
            }
          }}
        >
          <div className="title text-pink-400 text-2xl mb-2 font-semibold">
            {getTitle()}
          </div>
          <div className="countdown flex text-pink-500 text-5xl font-bold">
            <span className="minutes">{time.minutes}</span>
            <span className="separator">:</span>
            <span className="seconds">{time.seconds}</span>
          </div>
          <div className={`controls mt-4 flex flex-col items-center text-pink-500 font-bold uppercase text-sm ${controlsClass}`}>
            {!isRunning && !isPaused && (
              <button className="start hover:text-pink-600 transition-colors" onClick={startSession}>
                ▶ Start
              </button>
            )}
            {isRunning && (
              <button className="pause hover:text-pink-600 transition-colors" onClick={pause}>
                ⏸ Pause
              </button>
            )}
            {(isPaused || isRunning) && (
              <button
                className={`reset hover:text-pink-600 transition-all mt-2 ${controlsClass === 'reset' ? 'opacity-0' : 'opacity-100'}`}
                onClick={reset}
              >
                ↻ Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="options-container flex justify-center gap-8 text-center mb-6">
        {/* Session Length */}
        <div className="session-control flex flex-col items-center">
          <button
            className="text-pink-400 text-2xl hover:text-pink-500 transition-colors"
            onClick={() => updateSession(sessionMinutes + 1)}
          >
            ▲
          </button>
          <span className="option-title text-pink-400 text-xs font-bold uppercase my-2">
            Session
          </span>
          <input
            type="number"
            value={sessionMinutes}
            onChange={(e) => updateSession(Number(e.target.value))}
            max={sessionMax}
            min={sessionMin}
            className="session-input w-16 text-center bg-gradient-to-b from-pink-200 to-pink-300 border-0 border-b-4 border-pink-500 rounded-lg text-pink-600 font-bold text-2xl px-2 py-1"
          />
          <button
            className="text-pink-500 text-2xl hover:text-pink-600 transition-colors"
            onClick={() => updateSession(sessionMinutes - 1)}
          >
            ▼
          </button>
        </div>

        {/* Break Length */}
        <div className="break-control flex flex-col items-center">
          <button
            className="text-pink-400 text-2xl hover:text-pink-500 transition-colors"
            onClick={() => updateBreak(breakMinutes + 1)}
          >
            ▲
          </button>
          <span className="option-title text-pink-400 text-xs font-bold uppercase my-2">
            Break
          </span>
          <input
            type="number"
            value={breakMinutes}
            onChange={(e) => updateBreak(Number(e.target.value))}
            max={breakMax}
            min={breakMin}
            className="break-input w-16 text-center bg-gradient-to-b from-pink-200 to-pink-300 border-0 border-b-4 border-pink-500 rounded-lg text-pink-600 font-bold text-2xl px-2 py-1"
          />
          <button
            className="text-pink-500 text-2xl hover:text-pink-600 transition-colors"
            onClick={() => updateBreak(breakMinutes - 1)}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
