import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { RESEARCH_PROJECTS } from '../../data/portfolioData';
import { ResearchProject } from '../../types/portfolio';
import { ProjectSchematic } from '../ProjectSchematic/ProjectSchematic';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './ResearchSection.module.css';

interface ResearchSectionProps {
  onSelectProject: (project: ResearchProject) => void;
}

/**
 * Research works as quiet editorial rows. Interactive pipeline schematics are
 * collapsed by default so the page reads cleanly; visitors can expand any one.
 */
export const ResearchSection: React.FC<ResearchSectionProps> = ({ onSelectProject }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSchematic = (projectId: string) => {
    setExpandedId((current) => (current === projectId ? null : projectId));
  };

  return (
    <section id="research" className={styles.section}>
      <SectionHeader
        index="01"
        label="Research"
        title="Selected research"
        description="Thesis and graduate research in Bangla NLP, generative medical imaging, and graph learning."
      />

      <ol className={styles.projectsList}>
        {RESEARCH_PROJECTS.map((project, position) => {
          const isExpanded = expandedId === project.id;

          return (
            <li key={project.id} className={styles.projectRow}>
              <div className={styles.metaCol}>
                <span className={styles.rowNumber}>{String(position + 1).padStart(2, '0')}</span>
                <span className={styles.rowYear}>{project.year}</span>
              </div>

              <div className={styles.contentCol}>
                <p className={styles.venue}>{project.venueOrCourse}</p>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectSummary}>{project.summary}</p>

                <dl className={styles.metricsRow}>
                  {project.keyMetrics.map((metric) => (
                    <div key={metric.label} className={styles.metricItem} title={metric.detail}>
                      <dt className={styles.metricLabel}>{metric.label}</dt>
                      <dd className={styles.metricValue}>{metric.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className={styles.actionsRow}>
                  <button
                    type="button"
                    onClick={() => toggleSchematic(project.id)}
                    className={styles.textButton}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Hide pipeline' : 'Show pipeline'}</span>
                    <ChevronDown
                      size={14}
                      className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className={styles.textButton}
                  >
                    Abstract
                  </button>
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.textLink}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>

                {isExpanded && (
                  <div className={styles.schematicWrapper}>
                    <ProjectSchematic kind={project.schematicKind} />
                  </div>
                )}

                <p className={styles.tagLine}>{project.tags.join(' · ')}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
