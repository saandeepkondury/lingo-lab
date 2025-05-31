
import { useSavedCaseStudies as useContext } from '@/context/SavedCaseStudiesContext';

export const useSavedCaseStudies = () => {
  return useContext();
};
