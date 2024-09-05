'use client';

import { useState, useEffect } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md px-2 py-1 text-sm border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-150 ease-in-out"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
};

export default LanguageSelector;