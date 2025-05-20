
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-1">
      <Toggle 
        pressed={theme === "light"} 
        onPressedChange={() => setTheme("light")}
        aria-label="Toggle light mode"
        size="sm"
      >
        <Sun className="h-4 w-4" />
      </Toggle>
      
      <Toggle 
        pressed={theme === "dark"} 
        onPressedChange={() => setTheme("dark")}
        aria-label="Toggle dark mode"
        size="sm"
      >
        <Moon className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
