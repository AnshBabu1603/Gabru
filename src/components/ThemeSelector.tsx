
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Theme = "teal" | "dark" | "blue" | "green" | "purple";

interface ThemeOption {
  id: Theme;
  name: string;
  bgClass: string;
  gradientClass: string;
}

const themes: ThemeOption[] = [
  { id: "teal", name: "Default", bgClass: "bg-teal-400", gradientClass: "bg-teal-gradient" },
  { id: "dark", name: "Dark", bgClass: "bg-gray-800", gradientClass: "bg-dark-gradient" },
  { id: "blue", name: "Blue", bgClass: "bg-blue-500", gradientClass: "bg-blue-gradient" },
  { id: "green", name: "Green", bgClass: "bg-green-500", gradientClass: "bg-green-gradient" },
  { id: "purple", name: "Purple", bgClass: "bg-purple-500", gradientClass: "bg-purple-gradient" }
];

interface ThemeSelectorProps {
  currentTheme: Theme;
  onChange: (theme: Theme) => void;
}

const ThemeSelector = ({ currentTheme, onChange }: ThemeSelectorProps) => {
  return (
    <section className="py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-6">Customize Theme</h3>
        
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap justify-center gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onChange(theme.id)}
                  className={`theme-button ${theme.bgClass} ${
                    currentTheme === theme.id ? "ring-2 ring-offset-2 ring-teal-500 scale-110" : ""
                  }`}
                  aria-label={`Switch to ${theme.name} theme`}
                  title={theme.name}
                />
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Click on a color to change the application theme
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ThemeSelector;
