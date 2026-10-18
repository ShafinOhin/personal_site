import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { PROFILE_META, RESEARCH_PROJECTS } from '../../data/portfolioData';
import { ResearchProject } from '../../types/portfolio';
import styles from './CommandPalette.module.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  onSelectProject: (project: ResearchProject) => void;
}

interface CommandOption {
  id: string;
  title: string;
  category: string;
  execute: () => void;
}

/**
 * Keyboard-accessible Command Palette (⌘K / Ctrl+K) for quick section jumps,
 * opening research abstracts, toggling themes, or copying email.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands: CommandOption[] = [
    {
      id: 'nav-research',
      title: 'Go to Research',
      category: 'Section',
      execute: () => {
        window.location.hash = '#research';
        onClose();
      },
    },
    {
      id: 'nav-trajectory',
      title: 'Go to Experience',
      category: 'Section',
      execute: () => {
        window.location.hash = '#trajectory';
        onClose();
      },
    },
    {
      id: 'nav-algorithms',
      title: 'Go to Competitive Programming',
      category: 'Section',
      execute: () => {
        window.location.hash = '#algorithms';
        onClose();
      },
    },
    {
      id: 'nav-credentials',
      title: 'Go to Education & Toolkit',
      category: 'Section',
      execute: () => {
        window.location.hash = '#credentials';
        onClose();
      },
    },
    {
      id: 'action-theme',
      title: 'Switch Theme (Light / Dark)',
      category: 'Appearance',
      execute: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'action-email',
      title: `Copy Email (${PROFILE_META.email})`,
      category: 'Contact',
      execute: () => {
        navigator.clipboard?.writeText(PROFILE_META.email);
        onClose();
      },
    },
    ...RESEARCH_PROJECTS.map((project) => ({
      id: `proj-${project.id}`,
      title: project.title,
      category: 'Research',
      execute: () => {
        onClose();
        onSelectProject(project);
      },
    })),
    {
      id: 'ext-github',
      title: 'GitHub (@ShafinOhin)',
      category: 'Profile',
      execute: () => {
        window.open(PROFILE_META.socials.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'ext-cf',
      title: 'Codeforces (shafin_ohin)',
      category: 'Profile',
      execute: () => {
        window.open(PROFILE_META.socials.codeforces, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className={styles.paletteBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchBar}>
          <Search size={15} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to section, paper, or action..."
            className={styles.searchInput}
          />
          <button type="button" onClick={onClose} className={styles.escHint}>
            ESC
          </button>
        </div>

        <div className={styles.actionList}>
          {filtered.map((cmd) => (
            <button
              key={cmd.id}
              type="button"
              onClick={cmd.execute}
              className={styles.actionItem}
            >
              <span className={styles.actionTitle}>{cmd.title}</span>
              <span className={styles.actionGroup}>{cmd.category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
