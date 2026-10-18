import {
  EducationItem,
  ExperienceItem,
  HonorItem,
  ResearchProject,
  SkillDomain,
} from '../types/portfolio';

export const PROFILE_META = {
  fullName: 'Shafin Islam Ohin',
  shortHandle: 'ohin.me',
  roleHeadline: 'Software Engineer · Applied ML & Bangla NLP Researcher',
  currentAffiliation: 'Software Engineer @ TigerIT · M.Sc. in CS (4.00) @ BRACU',
  location: 'Dhaka, Bangladesh',
  coordinates: '23.8103° N, 90.4125° E',
  email: 'shafinohin04@gmail.com',
  portraitUrl: '/assets/ohin-portrait.jpg',
  socials: {
    github: 'https://github.com/ShafinOhin',
    linkedin: 'https://www.linkedin.com/in/ohin',
    codeforces: 'https://codeforces.com/profile/shafin_ohin',
    codechef: 'https://www.codechef.com/users/shafin_ohin',
  },
  competitiveStats: {
    codeforcesRank: 'Expert (Blue)',
    codeforcesHandle: 'shafin_ohin',
    codeforcesMaxRating: 1609,
    codechefStars: '4★',
    problemsSolved: '1,000+',
  },
};

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'spoken-qa-bangla',
    indexCode: '01 // THESIS · NLP & SPEECH',
    title: 'Spoken Question Answering for Bangla Using Large Language Models',
    subtitle: 'Synthesizing Spoken_SQuAD_bn & Benchmarking ASR-to-LLM Error Propagation',
    venueOrCourse: 'Undergraduate Thesis · BRAC University (Advised by Dr. Farig Yousuf Sadeque)',
    year: '2025',
    lens: ['research'],
    schematicKind: 'spoken-qa',
    summary:
      'Constructed the Spoken_SQuAD_bn benchmark and evaluated fine-tuned encoder models (Bangla-BERT, mBERT, RoBERTa) alongside zero/few-shot frontier LLMs (GPT-4o, Llama 3) across text and cascaded ASR speech pipelines.',
    abstractText:
      'This study explores the development and implementation of a spoken question answering system for Bangla across two phases: text-based QA and spoken QA. For the text-based phase, we fine-tuned and evaluated mBERT, Bangla-BERT, and RoBERTa on SQuAD_bn, alongside zero-shot and few-shot evaluations of GPT-4o and Llama 3. Facing the absence of a Bangla spoken QA corpus, we synthesized Spoken_SQuAD_bn using Google Cloud Text-to-Speech and benchmarked cascaded Automatic Speech Recognition (ASR) + LLM pipelines using Audio Overlapping Score (AOS), Exact Match (EM), and F1—quantifying how phonetic ASR error propagation degrades downstream reading comprehension.',
    methodologySteps: [
      'Fine-tuned mBERT, Bangla-BERT, and RoBERTa on SQuAD_bn; benchmarked against GPT-4o and Llama 3 in zero-shot and few-shot regimes.',
      'Synthesized the open-access Spoken_SQuAD_bn audio corpus from translated SQuAD 2.0 passages via neural Text-to-Speech.',
      'Evaluated cascaded ASR → LLM pipelines using Audio Overlapping Score (AOS), Exact Match (EM), and token-level F1.',
      'Conducted granular error taxonomy separating annotation inconsistencies from phonetic ASR transcription drift.',
    ],
    keyMetrics: [
      {
        label: 'Benchmark Created',
        value: 'Spoken_SQuAD_bn',
        detail: 'First synthesized spoken reading comprehension corpus for Bangla',
      },
      {
        label: 'Models Evaluated',
        value: '5 Architectures',
        detail: 'GPT-4o, Llama 3, Bangla-BERT, mBERT, RoBERTa',
      },
      {
        label: 'Evaluation Metrics',
        value: 'AOS · EM · F1',
        detail: 'Temporal Audio Overlapping Score + lexical span accuracy',
      },
    ],
    tags: ['Bangla NLP', 'Spoken QA', 'LLMs', 'ASR Cascade', 'Bangla-BERT', 'GPT-4o'],
    links: [
      {
        label: 'BRACU DSpace Thesis',
        url: 'https://dspace.bracu.ac.bd/items/968cdf8b-3cb1-4d12-9cdd-d4c374459bd3',
        kind: 'thesis',
      },
    ],
  },
  {
    id: 'mri-diffusion-synthesis',
    indexCode: '02 // MEDICAL VISION · DIFFUSION',
    title: 'Semantic-Guided Zero-Shot Synthesis of Rare Neurological MRI Pathologies',
    subtitle: 'Anatomically Conditioned Diffusion with BiomedCLIP Quality Gating',
    venueOrCourse: 'CSE754 · Deep Learning for Computer Vision (Graduate Research)',
    year: '2025',
    lens: ['research'],
    schematicKind: 'mri-diffusion',
    summary:
      'Designed a zero-shot generative pipeline combining Stable Diffusion 2.1, ControlNet Canny structural conditioning, and a BiomedCLIP semantic quality gate to synthesize rare brain MRI pathologies and overcome clinical data scarcity.',
    abstractText:
      'Rare neurological diseases suffer from severe training data scarcity. We propose a semantic-guided zero-shot synthesis pipeline that generates realistic brain MRI scans across five rare neurological conditions. Using Stable Diffusion 2.1 paired with ControlNet for anatomical boundary preservation via Canny edge maps from real scans, and radiology-grade text prompts, candidate generations are filtered through a BiomedCLIP semantic quality gate. Augmenting real training sets with 100 curated synthetic scans per class consistently boosted classification accuracy, F1-score, and AUC-ROC across ResNet-50, GoogLeNet, AlexNet, and EfficientNet-B0 on real held-out test sets.',
    methodologySteps: [
      'Extracted Canny edge structural priors from real clinical brain MRI scans to preserve cortical and ventricular geometry.',
      'Conditioned Stable Diffusion 2.1 + ControlNet on radiological text descriptors for 5 rare neurological conditions.',
      'Enforced automated rejection sampling using BiomedCLIP image-text cosine similarity as a semantic quality gate.',
      'Benchmarked downstream diagnostic classifiers (ResNet-50, EfficientNet-B0, GoogLeNet, AlexNet) on strictly real test sets.',
    ],
    keyMetrics: [
      {
        label: 'Peak Test Accuracy',
        value: '100% (AlexNet)',
        detail: 'Consistent accuracy, F1, and AUC-ROC gains across all 4 CNN backbones',
      },
      {
        label: 'Synthetic Cohort',
        value: '500 Curated MRIs',
        detail: '100 BiomedCLIP-verified scans across 5 rare pathology classes',
      },
      {
        label: 'Conditioning Stack',
        value: 'SD 2.1 + ControlNet',
        detail: 'Structural Canny edge guidance + BiomedCLIP zero-shot gate',
      },
    ],
    tags: [
      'Diffusion Models',
      'ControlNet',
      'BiomedCLIP',
      'Medical Imaging',
      'Zero-Shot Synthesis',
      'PyTorch',
    ],
    links: [
      {
        label: 'Read Paper Report (PDF)',
        url: 'https://drive.google.com/file/d/1B4vQCrM523OvAuORW5B_v2lTmkhgXynR/view?usp=sharing',
        kind: 'paper',
      },
    ],
  },
  {
    id: 'gnn-ddi-ablation',
    indexCode: '03 // BIOINFORMATICS · GRAPH ML',
    title: 'Graph Neural Network-Based Drug-Drug Interaction Prediction & Ablation',
    subtitle: 'Link Prediction on BioSNAP-DDI Across GCN, GCN-Skip, GraphSAGE & GAT',
    venueOrCourse: 'CSE763 · Advanced Bioinformatics (Graduate Research)',
    year: '2025',
    lens: ['research', 'algorithms'],
    schematicKind: 'gnn-ddi',
    summary:
      'Formulated polypharmacy Drug-Drug Interaction (DDI) detection as a graph link-prediction task on BioSNAP-DDI, conducting systematic ablations across GNN message-passing architectures, residual skip connections, layer depth, and embedding dimensionality.',
    abstractText:
      'Predicting adverse drug-drug interactions (DDIs) early is critical for safe polypharmacy treatment planning. We formulated DDI prediction as a link-prediction problem on the BioSNAP-DDI interaction graph and performed a rigorous ablation study across four GNN architectures: GCN, GCN-Skip, GraphSAGE, and GAT. We systematically varied residual skip connections, message-passing depth, and hidden dimensions. GraphSAGE achieved the strongest overall performance with a Test ROC-AUC of 0.9974 and Test Hits@20 of 0.6166, while our ablations demonstrated that skip connections mitigate over-smoothing and improve ranking metrics.',
    methodologySteps: [
      'Constructed the BioSNAP-DDI pharmacological interaction graph for supervised negative-sampled link prediction.',
      'Implemented and compared 4 message-passing backbones: GCN, GCN with Residual Skip Connections, GraphSAGE, and GAT.',
      'Conducted controlled ablations across network depth (2 vs. 3+ layers) and latent hidden dimensions (64, 128, 256).',
      'Evaluated both global classification discrimination (ROC-AUC, PR-AUC) and top-K ranking quality (Hits@20).',
    ],
    keyMetrics: [
      {
        label: 'Best Test ROC-AUC',
        value: '0.9974',
        detail: 'Achieved by inductive neighborhood aggregation via GraphSAGE',
      },
      {
        label: 'Best Test Hits@20',
        value: '0.6166',
        detail: 'Significant top-20 interaction ranking precision on BioSNAP-DDI',
      },
      {
        label: 'Architectures Tested',
        value: '4 GNN Variants',
        detail: 'GraphSAGE, GCN-Skip, GAT, and Vanilla GCN',
      },
    ],
    tags: ['Graph Neural Networks', 'GraphSAGE', 'BioSNAP-DDI', 'Link Prediction', 'PyTorch Geometric'],
    links: [
      {
        label: 'Read Paper Report (PDF)',
        url: 'https://drive.google.com/file/d/1RNn0S8l_hpRjKjvyVg0OxTzikZPBgRYg/view?usp=sharing',
        kind: 'paper',
      },
    ],
  },
  {
    id: 'vae-music-clustering',
    indexCode: '04 // MULTIMODAL ML · GENERATIVE LATENTS',
    title: 'VAE-Based Hybrid-Language Music Clustering (English + Bangla)',
    subtitle: 'Disentangled Acoustic & Lyric Latent Spaces with β-VAE, ConvVAE & CVAE',
    venueOrCourse: 'CSE715 · Neural Networks and Fuzzy Systems (Graduate Research)',
    year: '2025',
    lens: ['research'],
    schematicKind: 'vae-clustering',
    summary:
      'Built an unsupervised multimodal clustering pipeline fusing acoustic spectral features and multilingual lyric embeddings across English (GTZAN) and Bangla tracks using Basic VAE, ConvVAE, β-VAE, and Conditional VAE.',
    abstractText:
      'Music Information Retrieval (MIR) catalogs increasingly span multiple languages, yet low-resource musical traditions like Bangla remain underrepresented. We designed an unsupervised multimodal representation learning pipeline combining audio signal features and semantic lyric embeddings across English (GTZAN) and Bangla music tracks. Experimenting with Basic VAE, Convolutional VAE (ConvVAE), β-VAE, and Conditional VAE (CVAE), we projected high-dimensional multimodal inputs into compact latent spaces and benchmarked K-Means, Agglomerative Clustering, and DBSCAN using Silhouette Score, Adjusted Rand Index (ARI), and Normalized Mutual Information (NMI).',
    methodologySteps: [
      'Extracted spectral acoustic representations alongside multilingual textual lyric embeddings for English + Bangla tracks.',
      'Trained 4 generative autoencoder variants: Basic VAE, ConvVAE, disentangled β-VAE, and Conditional VAE (CVAE).',
      'Clustered learned latent bottlenecks via K-Means, Agglomerative Hierarchical Clustering, and DBSCAN.',
      'Benchmarked against non-generative baselines using Silhouette Score, ARI, and NMI.',
    ],
    keyMetrics: [
      {
        label: 'VAE Architectures',
        value: '4 Latent Models',
        detail: 'Basic VAE, ConvVAE, Disentangled β-VAE, Conditional VAE',
      },
      {
        label: 'Modalities Fused',
        value: 'Audio + Lyrics',
        detail: 'Spectral acoustic signals + semantic lyric embeddings (EN + BN)',
      },
      {
        label: 'Evaluation Suite',
        value: 'Silhouette · ARI · NMI',
        detail: 'Evaluated across K-Means, Agglomerative, and DBSCAN',
      },
    ],
    tags: ['Variational Autoencoders', 'β-VAE', 'Multimodal Learning', 'Unsupervised Clustering', 'PyTorch'],
    links: [
      {
        label: 'Read Paper Report (PDF)',
        url: 'https://drive.google.com/file/d/1Ha-rCJumRSdADPWRnJlMtgjSl3NBlyk4/view?usp=sharing',
        kind: 'paper',
      },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/ShafinOhin/CSE-715-Project',
        kind: 'github',
      },
    ],
  },
  {
    id: 'bangla-ner-semeval',
    indexCode: '05 // SEMEVAL TASK · SEQUENCE LABELING',
    title: 'Fine-Grained Bangla Named-Entity Recognition & ML Vision Benchmarks',
    subtitle: 'Transformer Sequence Tagging for SemEval 2023 Task 2 (MultiCoNER II)',
    venueOrCourse: 'CSE440 (NLP II) & CSE428 (Image Processing) · BRAC University',
    year: '2024',
    lens: ['research', 'systems'],
    schematicKind: 'bangla-ner',
    summary:
      'Developed a Transformer-based sequence labeling architecture for complex Bangla Named-Entity Recognition under SemEval 2023 Task 2, alongside comparative studies of classical ML vs. deep CNNs for multiclass image classification.',
    abstractText:
      'Addressed fine-grained Bangla Named-Entity Recognition (NER) as a subtask of SemEval 2023 Task 2 (MultiCoNER II), where short, uncased, and noisy contexts challenge traditional token classifiers. By fine-tuning pretrained multilingual and Bangla Transformer encoders with subword-aware token alignment, the system resolves ambiguous person, location, creative work, and group entities in Bangla script. Complemented by a comparative vision benchmark (CSE428) evaluating Logistic Regression, Multilayer Perceptrons, and Deep CNNs on multiclass image classification.',
    methodologySteps: [
      'Modeled fine-grained Bangla entity extraction on noisy, short-context sentences from SemEval 2023 Task 2.',
      'Aligned subword WordPiece/SentencePiece tokens with BIO sequence tags across complex Bangla morphology.',
      'Benchmarked discriminative sequence classification and analyzed cross-entity confusion matrices.',
    ],
    keyMetrics: [
      {
        label: 'Shared Task',
        value: 'SemEval 2023 Task 2',
        detail: 'MultiCoNER II Fine-Grained Bangla NER Subtask',
      },
      {
        label: 'Architecture',
        value: 'Transformer NER',
        detail: 'Contextual subword sequence tagging in Bangla script',
      },
      {
        label: 'Vision Benchmark',
        value: 'LogReg · MLP · CNN',
        detail: 'End-to-end multiclass classification comparison (CSE428)',
      },
    ],
    tags: ['SemEval 2023', 'Bangla NER', 'Transformers', 'Sequence Labeling', 'CNN'],
    links: [
      {
        label: 'AlgoVisualizer Repo',
        url: 'https://github.com/ShafinOhin/AlgoVisualizer',
        kind: 'github',
      },
    ],
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'tigerit-swe',
    role: 'Software Engineer',
    organization: 'TigerIT Bangladesh Limited',
    departmentOrLocation: 'Dhaka, Bangladesh',
    period: 'Aug 2025 — Present',
    track: 'engineering',
    lens: ['systems'],
    highlights: [
      'Architecting and developing an End-to-End Encrypted (E2E) messaging Progressive Web Application (PWA) using Angular with strict client-side cryptographic state management.',
      'Engineered fine-grained, tag-based Role-Based Access Control (RBAC) in a distributed Video Intelligence Platform using Go—supporting dynamic permission evaluation across pre-defined and custom enterprise roles.',
    ],
    technologies: ['Go', 'Angular', 'PWA', 'E2E Encryption', 'Tag-Based RBAC', 'PostgreSQL'],
  },
  {
    id: 'bracu-lecturer',
    role: 'Adjunct Lecturer',
    organization: 'BRAC University',
    departmentOrLocation: 'Department of Computer Science & Engineering',
    period: 'Jun 2025 — Sep 2025',
    track: 'academic',
    lens: ['algorithms', 'research'],
    highlights: [
      'Instructed undergraduate laboratory courses for CSE110 (Programming Language I — Java) and CSE422 (Artificial Intelligence).',
      'Designed hands-on lab assessments covering search algorithms, heuristic optimization, machine learning foundations, and object-oriented software design.',
    ],
    technologies: ['Artificial Intelligence (CSE422)', 'Java (CSE110)', 'Curriculum Design', 'Pedagogy'],
  },
  {
    id: 'bracu-tutor',
    role: 'Student Tutor (Undergraduate Teaching Assistant)',
    organization: 'BRAC University',
    departmentOrLocation: 'Department of Computer Science & Engineering',
    period: 'Oct 2023 — Sep 2024',
    track: 'academic',
    lens: ['algorithms'],
    highlights: [
      'Mentored undergraduate cohorts in CSE221 (Algorithms) and CSE230 (Discrete Mathematics) across three consecutive semesters.',
      'Guided students through graph theory, dynamic programming, asymptotic complexity proofs, and combinatorial reasoning.',
    ],
    technologies: ['Algorithms (CSE221)', 'Discrete Mathematics (CSE230)', 'Problem Solving'],
  },
  {
    id: 'bdmo-academic',
    role: 'Academic Team Member (Volunteering)',
    organization: 'Bangladesh Mathematical Olympiad (BdMO)',
    departmentOrLocation: 'National & Regional Olympiads',
    period: 'Oct 2018 — Present',
    track: 'academic',
    lens: ['algorithms'],
    highlights: [
      'Co-organized Regional and National Mathematical Olympiads across Bangladesh for over seven years.',
      'Contributed to problem curation, script evaluation, and mathematical talent mentorship at the national level.',
    ],
    technologies: ['Mathematical Olympiad', 'Combinatorics & Number Theory', 'Academic Curation'],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'msc-bracu',
    degree: 'M.Sc. in Computer Science',
    institution: 'BRAC University, Dhaka',
    period: 'Ongoing',
    cgpa: '4.00 / 4.00',
    distinction: 'Perfect Graduate Standing',
    details: [
      'Graduate research spanning Advanced Bioinformatics (GNNs), Deep Learning for Computer Vision (Diffusion Models), and Neural Networks & Fuzzy Systems (Multimodal VAEs).',
    ],
  },
  {
    id: 'bsc-bracu',
    degree: 'B.Sc. in Computer Science',
    institution: 'BRAC University, Dhaka',
    period: 'Graduated 2025',
    cgpa: '3.96 / 4.00',
    distinction: 'Highest Distinction',
    details: [
      'Graduated with Highest Distinction; named to the Vice Chancellor’s & Dean’s Honor List for all 9 consecutive semesters (Fall 2021 – Summer 2024).',
      'Recipient of the BRAC Scholarship (Fall 2022 – Summer 2024) and Merit Scholarship for Academic Excellence (Summer 2023 – Summer 2024).',
    ],
  },
];

export const HONOR_ITEMS: HonorItem[] = [
  {
    id: 'iupc-champion-2021',
    year: '2021',
    title: 'Champion — BRACU Intra-University Programming Contest',
    context: '1st Place overall in the Fall 2021 competitive programming championship at BRAC University.',
    category: 'competition',
  },
  {
    id: 'iupc-runnerup-2022',
    year: '2022',
    title: '2nd Place — BRACU Intra-University Programming Contest',
    context: 'Runner-up finish in the Fall 2022 university-wide algorithmic programming contest.',
    category: 'competition',
  },
  {
    id: 'cf-expert',
    year: 'Active',
    title: 'Codeforces Expert (Max Rating 1609) & CodeChef 4★',
    context: 'Solved 1,000+ algorithmic problems across online judges (handle: shafin_ohin).',
    category: 'competition',
  },
  {
    id: 'highest-distinction-2025',
    year: '2025',
    title: 'Graduated with Highest Distinction & 9× VC/Dean’s List',
    context: 'Maintained 3.96/4.00 B.Sc. CGPA (9/9 semesters honored) and 4.00/4.00 M.Sc. CGPA at BRAC University.',
    category: 'academic',
  },
  {
    id: 'nhspc-2016',
    year: '2016',
    title: '13th Rank — National High School Programming Contest (NHSPC)',
    context: 'National finalist placement in nationwide competitive programming olympiad.',
    category: 'competition',
  },
];

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'ml-nlp',
    indexCode: 'DOM-01',
    title: 'Applied ML, Bangla NLP & Vision',
    subtitle: 'Deep Generative & Graph Architectures',
    lens: 'research',
    items: [
      'PyTorch & TensorFlow',
      'Bangla NLP (Bangla-BERT, mBERT, Spoken QA)',
      'Diffusion Models (Stable Diffusion 2.1, ControlNet)',
      'BiomedCLIP & Multimodal Alignment',
      'Graph Neural Networks (GraphSAGE, GAT, GCN)',
      'Variational Autoencoders (β-VAE, CVAE)',
    ],
    footnote: 'Backed by 5 graduate & thesis research papers',
  },
  {
    id: 'systems-fullstack',
    indexCode: 'DOM-02',
    title: 'Systems & Full-Stack Engineering',
    subtitle: 'Secure, Low-Latency Web & Backend Platforms',
    lens: 'systems',
    items: [
      'Go (Microservices & Tag-Based RBAC)',
      'Angular (PWA & E2E Encrypted Messaging)',
      'React & TypeScript',
      'Django & Node.js',
      'PostgreSQL & MySQL Schema Design',
      'RESTful APIs & Access-Control Security',
    ],
    footnote: 'Production engineering at TigerIT Bangladesh',
  },
  {
    id: 'agentic-algorithms',
    indexCode: 'DOM-03',
    title: 'Agentic Engineering & Algorithms',
    subtitle: 'AI Workflow Orchestration & Competitive Rigor',
    lens: 'algorithms',
    items: [
      'Agentic Workflows (Google Antigravity, GitHub Copilot)',
      'Prompt & Technical Specification Design',
      'Verification & Auditing of AI-Generated Code',
      'Graph Algorithms & Dynamic Programming (C++)',
      'Codeforces Expert (1609) · CodeChef 4★',
      '1,000+ Competitive Problems Solved',
    ],
    footnote: 'Champion, BRACU Programming Contest',
  },
];
