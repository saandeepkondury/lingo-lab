
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export const useSavedCaseStudies = () => {
  const { user, isLoggedIn } = useAuth();
  const [savedCaseStudies, setSavedCaseStudies] = useState<string[]>([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const saved = localStorage.getItem(`saved_case_studies_${user.id}`);
      if (saved) {
        setSavedCaseStudies(JSON.parse(saved));
      }
    } else {
      setSavedCaseStudies([]);
    }
  }, [isLoggedIn, user]);

  const saveCaseStudy = (caseStudyId: string) => {
    if (!isLoggedIn || !user) return;

    const newSaved = [...savedCaseStudies, caseStudyId];
    setSavedCaseStudies(newSaved);
    localStorage.setItem(`saved_case_studies_${user.id}`, JSON.stringify(newSaved));
  };

  const removeCaseStudy = (caseStudyId: string) => {
    if (!isLoggedIn || !user) return;

    const newSaved = savedCaseStudies.filter(id => id !== caseStudyId);
    setSavedCaseStudies(newSaved);
    localStorage.setItem(`saved_case_studies_${user.id}`, JSON.stringify(newSaved));
  };

  const isSaved = (caseStudyId: string) => {
    return savedCaseStudies.includes(caseStudyId);
  };

  return {
    savedCaseStudies,
    saveCaseStudy,
    removeCaseStudy,
    isSaved
  };
};
