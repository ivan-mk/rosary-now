'use client';
import { useState, useEffect } from 'react'
import { getCurrentMystery } from '../utils/mysteryUtils'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const [theme, setTheme] = useState('dark')
  const [currentMystery, setCurrentMystery] = useState(getCurrentMystery())
  const { language } = useLanguage()

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme) {
      setTheme(currentTheme)
      document.documentElement.classList.toggle('dark', currentTheme === 'dark')
    } else {
      setThemeBasedOnTime()
    }

    // Update mystery every minute
    const intervalId = setInterval(() => {
      setCurrentMystery(getCurrentMystery())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const setThemeBasedOnTime = () => {
    const currentHour = new Date().getHours()
    const newTheme = (currentHour >= 6 && currentHour < 20) ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4">
      <div className="header-left mb-2 sm:mb-0"></div>
      <div className="header-center text-center mb-2 sm:mb-0">
        <h1 className="text-2xl sm:text-4xl"><span className="cross">&#10013;</span> Rosary Now</h1>
        <div id="current-mystery-display" className="text-sm sm:text-base">{currentMystery[language]}</div>
      </div>
      <div className="header-right flex items-center">
        <LanguageSelector />
        <div className="theme-switch-wrapper ml-4">
          <button
            onClick={toggleTheme}
            className={`theme-switch flex items-center justify-center w-12 h-6 sm:w-16 sm:h-8 rounded-full transition-colors duration-200 focus:outline-none ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full transform duration-200 flex items-center justify-center ${
                theme === 'dark'
                  ? 'translate-x-3 sm:translate-x-4 bg-indigo-500'
                  : '-translate-x-3 sm:-translate-x-4 bg-yellow-500'
              }`}
            >
              {theme === 'dark' ? (
                <FaMoon className="text-white text-xs sm:text-sm" />
              ) : (
                <FaSun className="text-white text-xs sm:text-sm" />
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}