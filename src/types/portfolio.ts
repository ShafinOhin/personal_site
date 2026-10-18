/**
 * Core domain types for Shafin Islam Ohin's personal website (ohin.me).
 * Keeps components decoupled from raw data structures (SOLID / Dependency Inversion).
 */

export type PerspectiveLens = 'all' | 'research' | 'systems' | 'algorithms';

export type SchematicKind =
  | 'spoken-qa'
  | 'mri-diffusion'
  | 'gnn-ddi'
  | 'vae-clustering'
  | 'bangla-ner';

export interface MetricItem {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'paper' | 'thesis' | 'github';
}

export interface ResearchProject {
  id: string;
  indexCode: string;
  title: string;
  subtitle: string;
  venueOrCourse: string;
  year: string;
  lens: PerspectiveLens[];
  schematicKind: SchematicKind;
  summary: string;
  abstractText: string;
  methodologySteps: string[];
  keyMetrics: MetricItem[];
  tags: string[];
  links: ProjectLink[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  departmentOrLocation: string;
  period: string;
  track: 'engineering' | 'academic';
  lens: PerspectiveLens[];
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  distinction?: string;
  details: string[];
}

export interface HonorItem {
  id: string;
  year: string;
  title: string;
  context: string;
  category: 'competition' | 'academic';
}

export interface SkillDomain {
  id: string;
  indexCode: string;
  title: string;
  subtitle: string;
  lens: PerspectiveLens;
  items: string[];
  footnote: string;
}
