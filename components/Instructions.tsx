import { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { loadRosaryData } from '../utils/loadRosaryData';

export default function Instructions({ isVisible, onToggle }: { isVisible: boolean, onToggle: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const { instructions } = loadRosaryData(language);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isVisible]);

  return (
    <section id="instructions" ref={sectionRef} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
        {instructions.title}
        <button 
          onClick={onToggle}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {isVisible ? instructions.hide : instructions.show}
        </button>
      </h2>
      <div className={`content ${isVisible ? 'visible' : ''}`}>
        <h3 className="text-xl font-semibold mb-2">{instructions.howToPrayTitle}</h3>
        <ol className="list-decimal list-inside mb-4 space-y-1">
          {instructions.howToPraySteps.map((step, index) => (
            <li key={index} className="text-base md:text-lg">{step}</li>
          ))}
        </ol>
        <h3 className="text-xl font-semibold mb-2">{instructions.mysteriesTitle}</h3>
        <ul className="list-disc list-inside space-y-1">
          {instructions.mysteries.map((mystery, index) => (
            <li key={index}>{mystery}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}