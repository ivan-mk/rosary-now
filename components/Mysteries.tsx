import { useState, useEffect, useRef } from 'react'
import { loadRosaryData } from '../utils/loadRosaryData'
import { getCurrentMystery } from '../utils/mysteryUtils'
import { useLanguage } from '../context/LanguageContext';

interface Mystery {
  title: string;
  details: string[];
}

interface Mysteries {
  joyful: Mystery[];
  sorrowful: Mystery[];
  glorious: Mystery[];
  luminous: Mystery[];
}

export default function Mysteries({ isVisible, onToggle }: { isVisible: boolean, onToggle: () => void }) {
  const { language } = useLanguage();
  const { mysteries } = loadRosaryData(language);
  const [selectedMystery, setSelectedMystery] = useState<keyof Mysteries>(() => {
    const currentMysteryObj = getCurrentMystery();
    const currentMysteryString = currentMysteryObj[language];
    const mysteryType = currentMysteryString.split(' - ')[1].toLowerCase().split(' ')[0] as keyof Mysteries;
    return mysteryType;
  });
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [isVisible])

  const handleMysteryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMystery(event.target.value as keyof Mysteries)
  }

  return (
    <section id="mysteries" ref={sectionRef} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
        {language === 'es' ? 'Misterios' : language === 'fr' ? 'Mystères' : 'Mysteries'}
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
          <label htmlFor="mystery-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'es' ? 'Seleccionar Misterio:' : language === 'fr' ? 'Sélectionner un Mystère:' : 'Select Mystery:'}
          </label>
          <div className="relative">
            <select
              id="mystery-select"
              value={selectedMystery}
              onChange={handleMysteryChange}
              className="block appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            >
              <option value="joyful">{language === 'es' ? 'Misterios Gozosos' : language === 'fr' ? 'Mystères Joyeux' : 'Joyful Mysteries'}</option>
              <option value="sorrowful">{language === 'es' ? 'Misterios Dolorosos' : language === 'fr' ? 'Mystères Douloureux' : 'Sorrowful Mysteries'}</option>
              <option value="glorious">{language === 'es' ? 'Misterios Gloriosos' : language === 'fr' ? 'Mystères Glorieux' : 'Glorious Mysteries'}</option>
              <option value="luminous">{language === 'es' ? 'Misterios Luminosos' : language === 'fr' ? 'Mystères Lumineux' : 'Luminous Mysteries'}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <ol className="list-decimal list-inside space-y-4">
            {mysteries[selectedMystery].map((mystery, index) => (
              <li key={index} className="mb-2">
                <h3 className="text-base md:text-lg font-semibold inline-block">{mystery.title}</h3>
                <ul className="list-disc list-inside ml-4 mt-1">
                  {mystery.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm md:text-base">
                        {detail}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}