import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { loadRosaryData } from '../utils/loadRosaryData';

export default function RosaryPrayers({ isVisible, onToggle }: { isVisible: boolean, onToggle: () => void }) {
  const { language } = useLanguage();
  const [prayers, setPrayers] = useState(loadRosaryData(language).prayers);
  const [selectedPrayer, setSelectedPrayer] = useState<keyof typeof prayers>('signOfTheCross');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setPrayers(loadRosaryData(language).prayers);
  }, [language]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isVisible]);

  const handlePrayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrayer(event.target.value as keyof typeof prayers);
  };

  return (
    <section id="rosary-prayers" ref={sectionRef} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
        {language === 'es' ? 'Oraciones del Rosario' : language === 'fr' ? 'Prières du Rosaire' : 'Rosary Prayers'}
        <button 
          onClick={onToggle}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {isVisible ? (language === 'es' ? 'Ocultar' : language === 'fr' ? 'Cacher' : 'Hide') : 
                       (language === 'es' ? 'Mostrar' : language === 'fr' ? 'Afficher' : 'Show')}
        </button>
      </h2>
      <div className={`content bg-white dark:bg-gray-700 p-4 rounded-lg ${isVisible ? 'visible' : ''}`}>
        <div className="mb-4">
          <label htmlFor="prayer-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'es' ? 'Seleccionar Oración:' : language === 'fr' ? 'Sélectionner une Prière:' : 'Select Prayer:'}
          </label>
          <div className="relative">
            <select 
              id="prayer-select" 
              value={selectedPrayer} 
              onChange={handlePrayerChange}
              className="block appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            >
              {(Object.keys(prayers) as Array<keyof typeof prayers>).map((key) => (
                <option key={key} value={key}>{prayers[key].title}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{prayers[selectedPrayer].title}</h3>
          <p className="whitespace-pre-line text-base md:text-lg">{prayers[selectedPrayer].text}</p>
        </div>
      </div>
    </section>
  );
}