import React, { useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { PROFILE_META } from '../../data/portfolioData';
import { logEvent } from '../../utils/logger';
import styles from './Hero.module.css';

const SOCIAL_LINKS = [
  { label: 'GitHub', url: PROFILE_META.socials.github },
  { label: 'LinkedIn', url: PROFILE_META.socials.linkedin },
  { label: 'Codeforces', url: PROFILE_META.socials.codeforces },
  { label: 'CodeChef', url: PROFILE_META.socials.codechef },
];

const KEY_FACTS = [
  { value: '4.00', label: 'M.Sc. CGPA, BRACU' },
  { value: '3.96', label: 'B.Sc. CGPA, Highest Distinction' },
  { value: 'Expert', label: 'Codeforces · max 1609' },
  { value: '1,000+', label: 'Problems solved' },
];

/**
 * Editorial introduction: name, short positioning statement, primary actions,
 * a quiet row of key facts, and the portrait.
 */
export const Hero: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_META.email);
      setCopiedEmail(true);
      logEvent('info', 'Email copied to clipboard', { component: 'Hero', action: 'copy_email' });
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      logEvent('warn', 'Clipboard write failed, opening mailto fallback', {
        component: 'Hero',
        action: 'copy_email_fallback',
      });
      window.location.href = `mailto:${PROFILE_META.email}`;
    }
  };

  return (
    <section id="top" className={styles.heroSection}>
      <div className={styles.heroGrid}>
        <div className={styles.editorialColumn}>
          <p className={styles.kicker}>Software Engineer at TigerIT · Dhaka</p>

          <h1 className={styles.headline}>
            Shafin Islam Ohin
            <span className={styles.headlineSub}>
              builds <em>low-resource language</em> intelligence and secure systems.
            </span>
          </h1>

          <p className={styles.leadParagraph}>
            CS graduate specialising in Bangla NLP and applied machine learning — spoken question
            answering, diffusion models for medical imaging, and graph neural networks. Former
            Adjunct Lecturer at BRAC University, where I'm now pursuing an M.Sc.
          </p>

          <div className={styles.actionRow}>
            <a href="#research" className={styles.primaryCta}>
              <span>View research</span>
              <ArrowRight size={15} />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={styles.secondaryCta}
              aria-label="Copy email address"
            >
              {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedEmail ? 'Copied' : PROFILE_META.email}</span>
            </button>
          </div>

          <ul className={styles.socialList}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.url} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className={styles.portraitFrame}>
          <img
            src={PROFILE_META.portraitUrl}
            alt="Shafin Islam Ohin standing by the sea"
            className={styles.portraitImage}
          />
          <figcaption className={styles.portraitCaption}>Bay of Bengal</figcaption>
        </figure>
      </div>

      <dl className={styles.factsRow} aria-label="Key academic and competitive facts">
        {KEY_FACTS.map((fact) => (
          <div key={fact.label} className={styles.factItem}>
            <dt className={styles.factLabel}>{fact.label}</dt>
            <dd className={styles.factValue}>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
