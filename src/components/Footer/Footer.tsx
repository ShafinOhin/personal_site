import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { PROFILE_META } from '../../data/portfolioData';
import { logEvent } from '../../utils/logger';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './Footer.module.css';

const EXTERNAL_PROFILES = [
  { label: 'GitHub', url: PROFILE_META.socials.github },
  { label: 'LinkedIn', url: PROFILE_META.socials.linkedin },
  { label: 'Codeforces', url: PROFILE_META.socials.codeforces },
  { label: 'CodeChef', url: PROFILE_META.socials.codechef },
];

/**
 * Quiet editorial footer with direct email copy, social links, and colophon.
 */
export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_META.email);
      setCopied(true);
      logEvent('info', 'Email copied from footer', {
        component: 'Footer',
        action: 'copy_email',
      });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE_META.email}`;
    }
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.contactBlock}>
        <SectionHeader
          index="05"
          label="Contact"
          title="Get in touch"
          description="Open to conversations around Bangla NLP, applied machine learning research, and software engineering."
        />

        <div className={styles.contactActions}>
          <a href={`mailto:${PROFILE_META.email}`} className={styles.emailLink}>
            {PROFILE_META.email}
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className={styles.copyButton}
            aria-label="Copy email address"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <ul className={styles.socialRow}>
          {EXTERNAL_PROFILES.map((item) => (
            <li key={item.label}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={13} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.colophonRow}>
        <span>© {new Date().getFullYear()} Shafin Islam Ohin</span>
        <span>Dhaka, Bangladesh · ohin.me</span>
      </div>
    </footer>
  );
};
