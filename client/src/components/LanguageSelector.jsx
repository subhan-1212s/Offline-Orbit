import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { lang, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="flex items-center gap-1.5 bg-[#F3F1EC] p-1 rounded-xl border border-[#E5E2DA]">
      <Globe className="w-3.5 h-3.5 text-[#5A606C] ml-1.5" />
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-xs font-bold text-[#1E2229] pr-1 py-0.5 focus:outline-none cursor-pointer"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </div>
  );
};
