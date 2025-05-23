
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface SavedCaseStudiesContextType {
  savedCaseStudies: string[];
  saveCaseStudy: (caseStudyId: string) => void;
  removeCaseStudy: (caseStudyId: string) => void;
  isSaved: (caseStudyId: string) => boolean;
}

const SavedCaseStudiesContext = createContext<SavedCaseStudiesContextType | undefined>(undefined);

export const SavedCaseStudiesProvider = ({ children }: { children: ReactNode }) => {
  const [savedCaseStudies, setSavedCaseStudies] = useState<string[]>([]);
  const { isLoggedIn } = useAuth();

  // Load saved case studies from localStorage when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      const saved = localStorage.getItem('savedCaseStudies');
      if (saved) {
        setSavedCaseStudies(JSON.parse(saved));
      }
    } else {
      setSavedCaseStudies([]);
    }
  }, [isLoggedIn]);

  const saveCaseStudy = (caseStudyId: string) => {
    if (!isLoggedIn) return;
    
    const newSaved = [...savedCaseStudies, caseStudyId];
    setSavedCaseStudies(newSaved);
    localStorage.setItem('savedCaseStudies', JSON.stringify(newSaved));
  };

  const removeCaseStudy = (caseStudyId: string) => {
    if (!isLoggedIn) return;
    
    const newSaved = savedCaseStudies.filter(id => id !== caseStudyId);
    setSavedCaseStudies(newSaved);
    localStorage.setItem('savedCaseStudies', JSON.stringify(newSaved));
  };

  const isSaved = (caseStudyId: string) => {
    return savedCaseStudies.includes(caseStudyId);
  };

  return (
    <SavedCaseStudiesContext.Provider value={{
      savedCaseStudies,
      saveCaseStudy,
      removeCaseStudy,
      isSaved
    }}>
      {children}
    </SavedCaseStudiesContext.Provider>
  );
};

export const useSavedCaseStudies = () => {
  const context = useContext(SavedCaseStudiesContext);
  if (context === undefined) {
    throw new Error('useSavedCaseStudies must be used within a SavedCaseStudiesProvider');
  }
  return context;
};
