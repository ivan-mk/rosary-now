import { useState, useEffect, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';
import { useLanguage } from '../context/LanguageContext';

export default function Timer() {
  const { language } = useLanguage();
  const [timer, setTimer] = useState<number | null>(null);
  const [isTiming, setIsTiming] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const cookieUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateCookies = useCallback(() => {
    const cookieData = JSON.stringify({
      timer: timer,
      isTiming: isTiming,
      startTime: startTime,
    });
    Cookies.set('rosaryData', cookieData, { expires: 1 });
  }, [timer, isTiming, startTime]);

  const debouncedUpdateCookies = useCallback(() => {
    if (cookieUpdateTimeoutRef.current) {
      clearTimeout(cookieUpdateTimeoutRef.current);
    }
    cookieUpdateTimeoutRef.current = setTimeout(updateCookies, 1000);
  }, [updateCookies]);

  const loadSavedState = useCallback(() => {
    const savedData = Cookies.get('rosaryData');
    if (savedData) {
      const { timer: savedTimer, isTiming: savedIsTiming, startTime: savedStartTime } = JSON.parse(savedData);
      setTimer(savedTimer ?? 0);
      setIsTiming(savedIsTiming ?? false);
      setStartTime(savedStartTime ?? null);
    } else {
      setTimer(0);
      setIsTiming(false);
      setStartTime(null);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    loadSavedState();
  }, [loadSavedState]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isTiming && startTime) {
      const updateTimer = () => {
        const now = Date.now();
        const newTimer = Math.floor((now - startTime) / 1000);
        setTimer(newTimer);
        Cookies.set('rosaryTimer', newTimer.toString(), { expires: 1 });
      };

      updateTimer(); // Update immediately
      intervalId = setInterval(updateTimer, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTiming, startTime]);

  const startTimer = useCallback(() => {
    const now = Date.now();
    const newStartTime = now - (timer ?? 0) * 1000;
    setStartTime(newStartTime);
    setIsTiming(true);
    setTimer((prevTimer) => prevTimer ?? 0); // Ensure timer is initialized
    debouncedUpdateCookies();
  }, [timer, debouncedUpdateCookies]);

  const stopTimer = useCallback(() => {
    setIsTiming(false);
    Cookies.set('rosaryIsTiming', 'false', { expires: 1 });
  }, []);

  const resetTimer = useCallback(() => {
    setIsTiming(false);
    setTimer(0);
    setStartTime(null);
    ['rosaryTimer', 'rosaryIsTiming', 'rosaryStartTime'].forEach(name => Cookies.remove(name));
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const translations = {
    en: {
      rosaryPrayerTimer: "Rosary Prayer Timer",
      startPrayer: "Start Prayer",
      stopPrayer: "Stop Prayer",
      resetTimer: "Reset Timer"
    },
    es: {
      rosaryPrayerTimer: "Temporizador del Rosario",
      startPrayer: "Iniciar Oración",
      stopPrayer: "Detener Oración",
      resetTimer: "Reiniciar Temporizador"
    },
    fr: {
      rosaryPrayerTimer: "Minuteur du Rosaire",
      startPrayer: "Commencer la Prière",
      stopPrayer: "Arrêter la Prière",
      resetTimer: "Réinitialiser le Minuteur"
    }
  };

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  const { rosaryPrayerTimer, startPrayer, stopPrayer, resetTimer: resetTimerText } = translations[language];

  return (
    <section id="timer" className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 p-2 rounded ${
        timer === 0 
          ? '' 
          : isTiming 
            ? 'bg-green-200 dark:bg-green-700' 
            : 'bg-red-200 dark:bg-red-700'
      }`}>
        {rosaryPrayerTimer}: {formatTime(timer ?? 0)}
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        <TimerButton onClick={startTimer} color="green" text={startPrayer} />
        <TimerButton onClick={stopTimer} color="red" text={stopPrayer} />
        <TimerButton onClick={resetTimer} color="gray" text={resetTimerText} />
      </div>
    </section>
  );
}

interface TimerButtonProps {
  onClick: () => void;
  color: 'green' | 'red' | 'gray';
  text: string;
}

const TimerButton: React.FC<TimerButtonProps> = ({ onClick, color, text }) => (
  <button
    onClick={onClick}
    className={`bg-${color}-500 hover:bg-${color}-400 text-white font-bold py-2 px-4 rounded transition duration-300`}
  >
    {text}
  </button>
);
