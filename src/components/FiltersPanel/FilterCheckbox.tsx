
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
        isActive ? 'font-medium text-sidebar-primary' : 'font-normal text-sidebar-foreground/80 hover:text-sidebar-foreground'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center">
        <div className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
          isActive 
            ? 'border-sidebar-primary bg-sidebar-primary text-sidebar-primary-foreground' 
            : 'border-sidebar-foreground/60'
        } mr-2`}>
          {isActive && <Check className="h-3 w-3" />}
        </div>
        {option.label}
      </div>
    </Button>
  );
};

export default FilterCheckbox;
