
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterCheckboxProps {
  option: {
    value: string;
    label: string;
  };
  isActive: boolean;
  onToggle: () => void;
}

const FilterCheckbox = ({ option, isActive, onToggle }: FilterCheckboxProps) => {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start px-2 py-1.5 h-auto text-sm ${
        isActive 
          ? 'font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950' 
          : 'font-normal text-gray-600 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center">
        <div className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
          isActive 
            ? 'border-teal-500 bg-teal-500 text-white' 
            : 'border-gray-300 dark:border-gray-600'
        } mr-2`}>
          {isActive && <Check className="h-3 w-3" />}
        </div>
        {option.label}
      </div>
    </Button>
  );
};

export default FilterCheckbox;
