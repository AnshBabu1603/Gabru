
import { motion } from "framer-motion";
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
        <motion.h3 
          className="text-2xl font-semibold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Customize Theme
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-wrap justify-center gap-4">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => onChange(theme.id)}
                    className={`theme-button ${theme.bgClass} ${
                      currentTheme === theme.id ? "ring-2 ring-offset-2 ring-teal-500 scale-110" : ""
                    }`}
                    aria-label={`Switch to ${theme.name} theme`}
                    title={theme.name}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                ))}
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Click on a color to change the application theme
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ThemeSelector;
