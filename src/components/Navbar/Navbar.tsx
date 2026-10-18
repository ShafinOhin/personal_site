import React, { useEffect, useState } from 'react';
import { Command, Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS = [
  { href: '#research', label: 'Research' },
  { href: '#trajectory', label: 'Experience' },
  { href: '#algorithms', label: 'Algorithms' },
  { href: '#credentials', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

/** Formats the current Dhaka time as HH:MM (minutes only — a ticking seconds counter is distracting). */
function formatDhakaTime(): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '';
  }
}

/**
 * Quiet sticky header: wordmark, Dhaka local time, section links,
 * command palette trigger, and theme switcher.
 */
export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenCommandPalette,
}) => {
  const [dhakaTime, setDhakaTime] = useState<string>(formatDhakaTime);

  // Refresh every 30s; minute precision is enough
  useEffect(() => {
    const intervalId = window.setInterval(() => setDhakaTime(formatDhakaTime()), 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <a href="#top" className={styles.brandMark} aria-label="ohin.me home">
            ohin<span className={styles.brandDot}>.</span>me
          </a>
          {dhakaTime && (
            <span className={styles.localTime} title="Local time in Dhaka, Bangladesh">
              Dhaka {dhakaTime}
            </span>
          )}
        </div>

        <nav className={styles.navLinks} aria-label="Primary sections">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onOpenCommandPalette}
            aria-label="Open command palette (Ctrl+K)"
            title="Search (Ctrl/⌘ K)"
          >
            <Command size={15} />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
};
