'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Instructions from '../components/Instructions';
import RosaryPrayers from '../components/RosaryPrayers';
import Mysteries from '../components/Mysteries';
import Footer from '../components/Footer';
import Timer from '../components/Timer';

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    } else {
      setThemeBasedOnTime();
    }
  }, []);

  const setThemeBasedOnTime = () => {
    const currentHour = new Date().getHours(); 
    const newTheme = (currentHour >= 20 || currentHour < 6) ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleToggleSection = (section: string) => {
    setVisibleSection(prevSection => (prevSection === section ? null : section));
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <main>
        <Timer /> 
        <Instructions isVisible={visibleSection === 'instructions'} onToggle={() => handleToggleSection('instructions')} />
        <RosaryPrayers isVisible={visibleSection === 'rosaryPrayers'} onToggle={() => handleToggleSection('rosaryPrayers')} />
        <Mysteries isVisible={visibleSection === 'mysteries'} onToggle={() => handleToggleSection('mysteries')} />
      </main>
      <Footer />
    </div>
  );
}