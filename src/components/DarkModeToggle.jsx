import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Debugging initial state
    console.log('Checking initial dark mode state...');
    const saved = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(`LocalStorage: ${saved}, System: ${systemDark}`);
    return saved ? saved === 'true' : systemDark;
  });

  useEffect(() => {
    console.log(`Setting dark mode to: ${darkMode}`);
    const html = document.documentElement;
    
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      console.log('Added dark class to HTML element');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      console.log('Removed dark class from HTML element');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => {
        console.log('Toggling dark mode');
        setDarkMode(!darkMode);
      }}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 z-50"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}