
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setTheme("light")}
        className={`${
          theme === "light" 
            ? "bg-amber-100 text-amber-900" 
            : "text-muted-foreground"
        } rounded-full`}
        aria-label="Toggle light mode"
      >
        <Sun className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setTheme("dark")}
        className={`${
          theme === "dark" 
            ? "bg-indigo-900 text-indigo-100" 
            : "text-muted-foreground"
        } rounded-full`}
        aria-label="Toggle dark mode"
      >
        <Moon className="h-5 w-5" />
      </Button>
    </div>
  );
}
