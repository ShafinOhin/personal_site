import React from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

/**
 * Shared, consistent section heading (DRY) used by every page section.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  label,
  title,
  description,
}) => (
  <header className={styles.header}>
    <p className={styles.eyebrow}>
      <span className={styles.index}>{index}</span>
      <span>{label}</span>
    </p>
    <h2 className={styles.title}>{title}</h2>
    {description && <p className={styles.description}>{description}</p>}
  </header>
);
