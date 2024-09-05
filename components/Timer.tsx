import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLanguage } from '../context/LanguageContext';

export default function Timer() {
  const { language } = useLanguage();
  const [timer, setTimer] = useState<number | null>(null);
  const [isTiming, setIsTiming] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  useEffect(() => {
    if (isMounted) {
      const savedTimer = Cookies.get('rosaryTimer');
      const savedIsTiming = Cookies.get('rosaryIsTiming');
      const savedStartTime = Cookies.get('rosaryStartTime');

      setTimer(savedTimer ? parseInt(savedTimer, 10) : 0);
      setIsTiming(savedIsTiming === 'true');
      setStartTime(savedStartTime ? parseInt(savedStartTime, 10) : null);
    }
  }, [isMounted]);

  const startTimer = () => {
    const now = Date.now();
    setStartTime(now - (timer ?? 0) * 1000);
    setIsTiming(true);
    Cookies.set('rosaryIsTiming', 'true', { expires: 1 });
    Cookies.set('rosaryStartTime', (now - (timer ?? 0) * 1000).toString(), { expires: 1 });
  };

  const stopTimer = () => {
    setIsTiming(false);
    Cookies.set('rosaryIsTiming', 'false', { expires: 1 });
  };

  const resetTimer = () => {
    setIsTiming(false);
    setTimer(0);
    setStartTime(null);
    Cookies.remove('rosaryTimer');
    Cookies.remove('rosaryIsTiming');
    Cookies.remove('rosaryStartTime');
  };

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

  return (
    <section id="timer" className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 p-2 rounded ${
        timer === 0 
          ? '' 
          : isTiming 
            ? 'bg-green-200 dark:bg-green-700' 
            : 'bg-red-200 dark:bg-red-700'
      }`}>
        {translations[language].rosaryPrayerTimer}: {formatTime(timer ?? 0)}
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        <button onClick={startTimer} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded transition duration-300">{translations[language].startPrayer}</button>
        <button onClick={stopTimer} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded transition duration-300">{translations[language].stopPrayer}</button>
        <button onClick={resetTimer} className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded transition duration-300">{translations[language].resetTimer}</button>
      </div>
    </section>
  );
}
