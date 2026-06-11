import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Clair' },
    { value: 'dark' as const, icon: Moon, label: 'Sombre' },
    { value: 'system' as const, icon: Monitor, label: 'Système' },
  ];

  return (
    <div 
      className="inline-flex items-center gap-1 p-1 backdrop-blur-xl border rounded-full shadow-lg"
      style={{
        backgroundColor: effectiveTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: effectiveTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'var(--border)'
      }}
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;

        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="relative px-3 py-2 rounded-full transition-all duration-300 group"
            style={{
              backgroundColor: isActive 
                ? effectiveTheme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'var(--primary-100)'
                : 'transparent',
              color: isActive 
                ? effectiveTheme === 'dark'
                  ? 'var(--primary-300)'
                  : 'var(--primary-600)'
                : effectiveTheme === 'dark'
                  ? 'rgba(255, 255, 255, 0.6)'
                  : 'var(--neutral-500)'
            }}
            aria-label={`Passer au thème ${t.label.toLowerCase()}`}
            title={t.label}
          >
            {isActive && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: effectiveTheme === 'dark' 
                    ? 'rgba(85, 161, 180, 0.2)' 
                    : 'var(--primary-50)',
                  border: `1px solid ${effectiveTheme === 'dark' ? 'rgba(85, 161, 180, 0.3)' : 'var(--primary-200)'}`
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon 
              className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:scale-110" 
              strokeWidth={isActive ? 2.5 : 2}
            />
          </button>
        );
      })}
    </div>
  );
}

export function ThemeToggleCompact() {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <motion.button
      onClick={cycleTheme}
      className="p-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 hover:shadow-lg group"
      style={{
        backgroundColor: effectiveTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: effectiveTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'var(--border)',
        color: effectiveTheme === 'dark' ? 'var(--primary-300)' : 'var(--primary-600)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Changer le thème"
      title={`Thème actuel: ${theme === 'light' ? 'Clair' : theme === 'dark' ? 'Sombre' : 'Système'}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
      </motion.div>
    </motion.button>
  );
}
