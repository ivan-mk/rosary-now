import rosaryData from '../public/rosary-data.json';

type LanguageKey = keyof typeof rosaryData.translations;

export function loadRosaryData(language: LanguageKey) {
  return rosaryData.translations[language];
}
