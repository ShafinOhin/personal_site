import React from 'react';
import { EDUCATION_ITEMS, SKILL_DOMAINS } from '../../data/portfolioData';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './CredentialsMatrix.module.css';

/**
 * University education followed by three plain skill columns.
 */
export const CredentialsMatrix: React.FC = () => (
  <section id="credentials" className={styles.section}>
    <SectionHeader index="04" label="Education & skills" title="Education & toolkit" />

    <div className={styles.educationList}>
      {EDUCATION_ITEMS.map((edu) => (
        <article key={edu.id} className={styles.eduEntry}>
          <p className={styles.eduPeriod}>{edu.period}</p>
          <div>
            <h3 className={styles.degreeTitle}>{edu.degree}</h3>
            <p className={styles.institution}>
              {edu.institution} · CGPA {edu.cgpa}
              {edu.distinction && <span className={styles.distinction}> · {edu.distinction}</span>}
            </p>
            {edu.details.map((detail) => (
              <p key={detail} className={styles.eduDetail}>
                {detail}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>

    <div className={styles.skillsGrid}>
      {SKILL_DOMAINS.map((domain) => (
        <div key={domain.id} className={styles.skillColumn}>
          <h3 className={styles.skillTitle}>{domain.title}</h3>
          <ul className={styles.skillList}>
            {domain.items.map((skill) => (
              <li key={skill} className={styles.skillItem}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
