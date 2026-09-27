import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    brandName: 'Offline Orbit',
    tagline: 'Personalized & Low-Bandwidth Learning',
    continueLearning: 'Continue Learning',
    whyThis: 'Why this recommendation?',
    diagnosticQuiz: 'Diagnostic Quiz',
    downloadPacks: 'Downloaded Packs',
    offlineStatus: 'Offline Status',
    savedOnDevice: 'Saved on this device',
    waitingToSync: 'Waiting to sync',
    synced: 'Synced',
    syncNow: 'Sync Now',
    explainAnotherWay: 'Explain Another Way',
    simpler: 'Simpler Explanation',
    stepByStep: 'Step-by-Step',
    workedExample: 'Worked Example',
    realWorld: 'Real-World Application',
    teacherDashboard: 'Teacher Dashboard',
    classPulse: 'Class Pulse & Mastery',
    conceptGaps: 'Concept Gaps Needing Review',
    aiAssistant: 'AI Teacher Assistant',
    mastered: 'Mastered',
    practising: 'Practising',
    needsReview: 'Needs Review',
    switchRole: 'Switch Role / Account'
  },
  es: {
    brandName: 'Offline Orbit',
    tagline: 'Aprendizaje Personalizado y Sin Conexión',
    continueLearning: 'Continuar Aprendiendo',
    whyThis: '¿Por qué esta recomendación?',
    diagnosticQuiz: 'Prueba Diagnóstica',
    downloadPacks: 'Paquetes Descargados',
    offlineStatus: 'Estado Sin Conexión',
    savedOnDevice: 'Guardado en este dispositivo',
    waitingToSync: 'Esperando sincronizar',
    synced: 'Sincronizado',
    syncNow: 'Sincronizar Ahora',
    explainAnotherWay: 'Explicar de otra forma',
    simpler: 'Explicación más simple',
    stepByStep: 'Paso a paso',
    workedExample: 'Ejemplo resuelto',
    realWorld: 'Aplicación en el mundo real',
    teacherDashboard: 'Panel del Profesor',
    classPulse: 'Pulso de la Clase',
    conceptGaps: 'Conceptos por Reforzar',
    aiAssistant: 'Asistente de IA para Profesores',
    mastered: 'Dominado',
    practising: 'Practicando',
    needsReview: 'Requiere revisión',
    switchRole: 'Cambiar Rol / Cuenta'
  },
  hi: {
    brandName: 'Offline Orbit',
    tagline: 'व्यक्तिगत एवं ऑफ़लाइन शिक्षा मंच',
    continueLearning: 'पढ़ाई जारी रखें',
    whyThis: 'यह पाठ क्यों चुना गया?',
    diagnosticQuiz: 'निदानात्मक परीक्षा (Diagnostic)',
    downloadPacks: 'डाउनलोड किए गए पाठ',
    offlineStatus: 'ऑफ़लाइन स्थिति',
    savedOnDevice: 'इस उपकरण पर सहेजा गया',
    waitingToSync: 'सिंक की प्रतीक्षा में',
    synced: 'सिंक हो गया',
    syncNow: 'अभी सिंक करें',
    explainAnotherWay: 'दूसरी तरह से समझें',
    simpler: 'सरल व्याख्या',
    stepByStep: 'चरण-दर-चरण',
    workedExample: 'हल किया गया उदाहरण',
    realWorld: 'वास्तविक जीवन में उपयोग',
    teacherDashboard: 'शिक्षक डैशबोर्ड',
    classPulse: 'कक्षा प्रगति',
    conceptGaps: 'सुधार योग्य विषय',
    aiAssistant: 'शिक्षक एआई सहायक',
    mastered: 'पूर्ण महारत',
    practising: 'अभ्यास जारी',
    needsReview: 'पुनरावलोकन आवश्यक',
    switchRole: 'रोल / खाता बदलें'
  },
  fr: {
    brandName: 'Offline Orbit',
    tagline: 'Apprentissage Personnalisé & Hors Ligne',
    continueLearning: 'Continuer l\'apprentissage',
    whyThis: 'Pourquoi cette recommandation ?',
    diagnosticQuiz: 'Quiz Diagnostique',
    downloadPacks: 'Packs Téléchargés',
    offlineStatus: 'Statut Hors Ligne',
    savedOnDevice: 'Enregistré sur cet appareil',
    waitingToSync: 'En attente de synchro',
    synced: 'Synchronisé',
    syncNow: 'Synchroniser',
    explainAnotherWay: 'Expliquer autrement',
    simpler: 'Explication simple',
    stepByStep: 'Étape par étape',
    workedExample: 'Exemple résolu',
    realWorld: 'Application réelle',
    teacherDashboard: 'Tableau de Bord Enseignant',
    classPulse: 'Pouls de la Classe',
    conceptGaps: 'Concepts à Réviser',
    aiAssistant: 'Assistant IA Enseignant',
    mastered: 'Maîtrisé',
    practising: 'En cours',
    needsReview: 'À réviser',
    switchRole: 'Changer de rôle'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('orbit_lang') || 'en');

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('orbit_lang', newLang);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
