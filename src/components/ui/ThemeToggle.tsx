import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-9 px-0">
      
      {theme === 'dark' ?
      <Sun className="h-5 w-5 text-amber-400 transition-all" /> :

      <Moon className="h-5 w-5 text-slate-700 transition-all" />
      }
    </Button>);

}