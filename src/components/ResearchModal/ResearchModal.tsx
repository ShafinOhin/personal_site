import React, { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { ResearchProject } from '../../types/portfolio';
import styles from './ResearchModal.module.css';

interface ResearchModalProps {
  project: ResearchProject | null;
  onClose: () => void;
}

/**
 * Accessible research monograph modal presenting the full paper abstract,
 * step-by-step methodology, benchmark metrics, and archival document links.
 */
export const ResearchModal: React.FC<ResearchModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-modal-title"
    >
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topRow}>
          <div>
            <span className={styles.indexCode}>{project.indexCode}</span>
            <h3 id="research-modal-title" className={styles.title}>
              {project.title}
            </h3>
            <p className={styles.venue}>
              {project.venueOrCourse} · {project.year}
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close specification sheet"
          >
            <X size={16} />
          </button>
        </div>

        <div>
          <h4 className={styles.blockHeading}>Abstract</h4>
          <p className={styles.abstractParagraph}>{project.abstractText}</p>
        </div>

        <div>
          <h4 className={styles.blockHeading}>Architectural &amp; Experimental Methodology</h4>
          <ul className={styles.stepList}>
            {project.methodologySteps.map((step, idx) => (
              <li key={idx} className={styles.stepItem}>
                <span className={styles.stepNum}>0{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={styles.blockHeading}>Empirical Telemetry</h4>
          <div className={styles.metricsGrid}>
            {project.keyMetrics.map((m) => (
              <div key={m.label} className={styles.metricItem}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
                {m.detail && <p className={styles.metricDetail}>{m.detail}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.linksCluster}>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={styles.linkBtn}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
