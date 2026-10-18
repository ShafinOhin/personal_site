import React, { useEffect, useState } from 'react';
import { AlgoPlayground } from './components/AlgoPlayground/AlgoPlayground';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { CredentialsMatrix } from './components/CredentialsMatrix/CredentialsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline/ExperienceTimeline';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { Navbar } from './components/Navbar/Navbar';
import { ResearchModal } from './components/ResearchModal/ResearchModal';
import { ResearchSection } from './components/ResearchSection/ResearchSection';
import { ResearchProject } from './types/portfolio';
import { logEvent } from './utils/logger';

// New key so previously auto-saved dark preferences don't override the light default
const THEME_STORAGE_KEY = 'ohin_theme_choice';

/**
 * Root application component orchestrating theme state, the research
 * specification modal, and global ⌘K / Ctrl+K keyboard shortcuts.
 */
export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // Storage unavailable — fall back to the default light theme
    }
    return 'light';
  });

  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);

  // Synchronize theme attribute with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Register global keyboard shortcut (⌘K / Ctrl+K) for Command Palette
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Persist only explicit choices, so the light default applies to first-time visitors
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      logEvent('warn', 'Could not persist theme preference', {
        component: 'App',
        action: 'persist_theme',
      });
    }
  };

  return (
    <div>
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
      />

      <main>
        <Hero />
        <ResearchSection onSelectProject={(project) => setSelectedProject(project)} />
        <ExperienceTimeline />
        <AlgoPlayground />
        <CredentialsMatrix />
      </main>

      <Footer />

      <ResearchModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onToggleTheme={handleToggleTheme}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    </div>
  );
};

export default App;
