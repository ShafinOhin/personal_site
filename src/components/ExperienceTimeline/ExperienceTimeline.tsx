import React from 'react';
import { EXPERIENCE_ITEMS } from '../../data/portfolioData';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './ExperienceTimeline.module.css';

/**
 * Single chronological timeline of industry and academic roles.
 * Period on the left, role details on the right — no cards, no badges.
 */
export const ExperienceTimeline: React.FC = () => (
  <section id="trajectory" className={styles.section}>
    <SectionHeader
      index="02"
      label="Experience"
      title="Work & teaching"
      description="Production engineering at TigerIT, alongside teaching and olympiad work at BRAC University and BdMO."
    />

    <ol className={styles.timeline}>
      {EXPERIENCE_ITEMS.map((item) => (
        <li key={item.id} className={styles.entry}>
          <p className={styles.period}>{item.period}</p>

          <div className={styles.details}>
            <h3 className={styles.role}>{item.role}</h3>
            <p className={styles.organization}>
              {item.organization}
              <span className={styles.department}> · {item.departmentOrLocation}</span>
            </p>

            <ul className={styles.highlights}>
              {item.highlights.map((highlight) => (
                <li key={highlight} className={styles.highlight}>
                  {highlight}
                </li>
              ))}
            </ul>

            <p className={styles.techLine}>{item.technologies.join(' · ')}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);
