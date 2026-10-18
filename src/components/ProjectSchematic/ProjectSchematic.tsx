import React, { useState } from 'react';
import { SchematicKind } from '../../types/portfolio';
import styles from './ProjectSchematic.module.css';

interface ProjectSchematicProps {
  kind: SchematicKind;
}

/**
 * Renders an interactive, domain-specific architectural micro-schematic for each research work.
 * Keeps each project card tactile and informative without cluttered UI gimmicks.
 */
export const ProjectSchematic: React.FC<ProjectSchematicProps> = ({ kind }) => {
  // State for Spoken QA pipeline phase toggle
  const [qaMode, setQaMode] = useState<'text' | 'spoken'>('spoken');

  // State for MRI Diffusion stage inspector
  const [mriStage, setMriStage] = useState<'canny' | 'controlnet' | 'biomedclip'>('biomedclip');

  // State for GNN DDI architecture ablation selector
  const [gnnModel, setGnnModel] = useState<'graphsage' | 'gcnskip' | 'gat' | 'gcn'>('graphsage');

  // State for VAE Music latent bottleneck selector
  const [vaeVariant, setVaeVariant] = useState<'betavae' | 'cvae' | 'convvae'>('betavae');

  // State for Bangla NER sentence example selector
  const [nerSample, setNerSample] = useState<0 | 1>(0);

  if (kind === 'spoken-qa') {
    return (
      <div className={styles.schematicBox}>
        <div className={styles.schematicHeader}>
          <span className={styles.schematicLabel}>INTERACTIVE SCHEMATIC // SPOKEN_SQUAD_BN</span>
          <div className={styles.tabRow}>
            <button
              type="button"
              onClick={() => setQaMode('spoken')}
              className={`${styles.tabBtn} ${qaMode === 'spoken' ? styles.tabBtnActive : ''}`}
            >
              Cascaded Spoken QA
            </button>
            <button
              type="button"
              onClick={() => setQaMode('text')}
              className={`${styles.tabBtn} ${qaMode === 'text' ? styles.tabBtnActive : ''}`}
            >
              Text SQuAD_bn Baseline
            </button>
          </div>
        </div>

        {qaMode === 'spoken' ? (
          <>
            <div className={styles.pipelineGrid}>
              <div className={styles.pipelineNode}>
                <span className={styles.nodeStep}>01 · Audio Synthesis</span>
                <span className={styles.nodeTitle}>Google Cloud TTS</span>
                <span className={styles.nodeSub}>Synthesized Bangla speech passages from SQuAD_bn</span>
              </div>
              <div className={`${styles.pipelineNode} ${styles.pipelineNodeHighlight}`}>
                <span className={styles.nodeStep}>02 · Bottleneck</span>
                <span className={styles.nodeTitle}>Bangla ASR Engine</span>
                <span className={styles.nodeSub}>Phonetic &amp; morphological transcription drift</span>
              </div>
              <div className={styles.pipelineNode}>
                <span className={styles.nodeStep}>03 · Reader LLM</span>
                <span className={styles.nodeTitle}>GPT-4o / Bangla-BERT</span>
                <span className={styles.nodeSub}>Evaluated via AOS, Exact Match &amp; F1</span>
              </div>
            </div>
            <div className={styles.telemetryReadout}>
              <span>
                Diagnostic: <span className={styles.readoutHighlight}>ASR Error Propagation</span>{' '}
                degrades span boundaries
              </span>
              <span className={styles.readoutBlue}>Metric: Audio Overlapping Score (AOS)</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.pipelineGrid}>
              <div className={styles.pipelineNode}>
                <span className={styles.nodeStep}>01 · Corpus</span>
                <span className={styles.nodeTitle}>SQuAD_bn Text</span>
                <span className={styles.nodeSub}>Clean Bangla reading comprehension passages</span>
              </div>
              <div className={styles.pipelineNode}>
                <span className={styles.nodeStep}>02 · Fine-Tuned</span>
                <span className={styles.nodeTitle}>Bangla-BERT · mBERT</span>
                <span className={styles.nodeSub}>Supervised span extraction vs. RoBERTa</span>
              </div>
              <div className={`${styles.pipelineNode} ${styles.pipelineNodeHighlight}`}>
                <span className={styles.nodeStep}>03 · Frontier SOTA</span>
                <span className={styles.nodeTitle}>GPT-4o &amp; Llama 3</span>
                <span className={styles.nodeSub}>Zero-shot &amp; few-shot outperforming baselines</span>
              </div>
            </div>
            <div className={styles.telemetryReadout}>
              <span>
                Finding: <span className={styles.readoutHighlight}>GPT-4o achieves SOTA</span> on
                clean Bangla text QA
              </span>
              <span className={styles.readoutBlue}>Bottleneck: Dataset label inconsistencies</span>
            </div>
          </>
        )}
      </div>
    );
  }

  if (kind === 'mri-diffusion') {
    return (
      <div className={styles.schematicBox}>
        <div className={styles.schematicHeader}>
          <span className={styles.schematicLabel}>ZERO-SHOT SYNTHESIS // CONDITIONING GATE</span>
          <div className={styles.tabRow}>
            <button
              type="button"
              onClick={() => setMriStage('canny')}
              className={`${styles.tabBtn} ${mriStage === 'canny' ? styles.tabBtnActive : ''}`}
            >
              1. Canny Prior
            </button>
            <button
              type="button"
              onClick={() => setMriStage('controlnet')}
              className={`${styles.tabBtn} ${mriStage === 'controlnet' ? styles.tabBtnActive : ''}`}
            >
              2. SD 2.1 + ControlNet
            </button>
            <button
              type="button"
              onClick={() => setMriStage('biomedclip')}
              className={`${styles.tabBtn} ${mriStage === 'biomedclip' ? styles.tabBtnActive : ''}`}
            >
              3. BiomedCLIP Gate
            </button>
          </div>
        </div>

        <div className={styles.pipelineGrid}>
          <div
            className={`${styles.pipelineNode} ${
              mriStage === 'canny' ? styles.pipelineNodeHighlight : ''
            }`}
          >
            <span className={styles.nodeStep}>Structural Prior</span>
            <span className={styles.nodeTitle}>Canny Edge MRI</span>
            <span className={styles.nodeSub}>Preserves cortical &amp; ventricular anatomy</span>
          </div>
          <div
            className={`${styles.pipelineNode} ${
              mriStage === 'controlnet' ? styles.pipelineNodeHighlight : ''
            }`}
          >
            <span className={styles.nodeStep}>Semantic Synthesis</span>
            <span className={styles.nodeTitle}>Radiology Prompts</span>
            <span className={styles.nodeSub}>Zero-shot synthesis of 5 rare brain pathologies</span>
          </div>
          <div
            className={`${styles.pipelineNode} ${
              mriStage === 'biomedclip' ? styles.pipelineNodeHighlight : ''
            }`}
          >
            <span className={styles.nodeStep}>Quality Filter</span>
            <span className={styles.nodeTitle}>BiomedCLIP Gate</span>
            <span className={styles.nodeSub}>Selects top 100 scans/class → 100% AlexNet acc</span>
          </div>
        </div>

        <div className={styles.telemetryReadout}>
          <span>
            Downstream Classifiers: <span className={styles.readoutHighlight}>ResNet-50 · EfficientNet-B0 · GoogLeNet · AlexNet</span>
          </span>
          <span className={styles.readoutBlue}>+AUC-ROC &amp; F1 across all 4 models</span>
        </div>
      </div>
    );
  }

  if (kind === 'gnn-ddi') {
    const metricsMap = {
      graphsage: {
        name: 'GraphSAGE (Best Overall)',
        auc: '0.9974',
        hits20: '0.6166',
        note: 'Inductive neighbor sampling + shallow 2-layer depth prevents over-smoothing',
      },
      gcnskip: {
        name: 'GCN + Residual Skip',
        auc: '0.9961',
        hits20: '0.5840',
        note: 'Skip connections preserve drug node identity across message-passing layers',
      },
      gat: {
        name: 'Graph Attention (GAT)',
        auc: '0.9948',
        hits20: '0.5512',
        note: 'Multi-head attention weights pharmacological neighbor importance',
      },
      gcn: {
        name: 'Vanilla GCN Baseline',
        auc: '0.9932',
        hits20: '0.5190',
        note: 'Degrades at deeper layers without residual skip connections',
      },
    };
    const active = metricsMap[gnnModel];

    return (
      <div className={styles.schematicBox}>
        <div className={styles.schematicHeader}>
          <span className={styles.schematicLabel}>ABLATION TELEMETRY // BIOSNAP-DDI GRAPH</span>
          <div className={styles.tabRow}>
            <button
              type="button"
              onClick={() => setGnnModel('graphsage')}
              className={`${styles.tabBtn} ${gnnModel === 'graphsage' ? styles.tabBtnActive : ''}`}
            >
              GraphSAGE
            </button>
            <button
              type="button"
              onClick={() => setGnnModel('gcnskip')}
              className={`${styles.tabBtn} ${gnnModel === 'gcnskip' ? styles.tabBtnActive : ''}`}
            >
              GCN-Skip
            </button>
            <button
              type="button"
              onClick={() => setGnnModel('gat')}
              className={`${styles.tabBtn} ${gnnModel === 'gat' ? styles.tabBtnActive : ''}`}
            >
              GAT
            </button>
            <button
              type="button"
              onClick={() => setGnnModel('gcn')}
              className={`${styles.tabBtn} ${gnnModel === 'gcn' ? styles.tabBtnActive : ''}`}
            >
              Vanilla GCN
            </button>
          </div>
        </div>

        <div className={styles.pipelineGrid}>
          <div className={styles.pipelineNode}>
            <span className={styles.nodeStep}>Architecture</span>
            <span className={styles.nodeTitle}>{active.name}</span>
            <span className={styles.nodeSub}>BioSNAP-DDI Link Prediction</span>
          </div>
          <div className={`${styles.pipelineNode} ${styles.pipelineNodeHighlight}`}>
            <span className={styles.nodeStep}>Test ROC-AUC</span>
            <span className={styles.nodeTitle}>{active.auc}</span>
            <span className={styles.nodeSub}>Global interaction discrimination</span>
          </div>
          <div className={styles.pipelineNode}>
            <span className={styles.nodeStep}>Test Hits@20</span>
            <span className={styles.nodeTitle}>{active.hits20}</span>
            <span className={styles.nodeSub}>Top-20 candidate ranking precision</span>
          </div>
        </div>

        <div className={styles.telemetryReadout}>
          <span>Ablation Insight: {active.note}</span>
        </div>
      </div>
    );
  }

  if (kind === 'vae-clustering') {
    return (
      <div className={styles.schematicBox}>
        <div className={styles.schematicHeader}>
          <span className={styles.schematicLabel}>LATENT BOTTLENECK // MULTIMODAL EN+BN MIR</span>
          <div className={styles.tabRow}>
            <button
              type="button"
              onClick={() => setVaeVariant('betavae')}
              className={`${styles.tabBtn} ${vaeVariant === 'betavae' ? styles.tabBtnActive : ''}`}
            >
              β-VAE (Disentangled)
            </button>
            <button
              type="button"
              onClick={() => setVaeVariant('cvae')}
              className={`${styles.tabBtn} ${vaeVariant === 'cvae' ? styles.tabBtnActive : ''}`}
            >
              Conditional VAE
            </button>
            <button
              type="button"
              onClick={() => setVaeVariant('convvae')}
              className={`${styles.tabBtn} ${vaeVariant === 'convvae' ? styles.tabBtnActive : ''}`}
            >
              ConvVAE
            </button>
          </div>
        </div>

        <div className={styles.pipelineGrid}>
          <div className={styles.pipelineNode}>
            <span className={styles.nodeStep}>Modality 1 + 2</span>
            <span className={styles.nodeTitle}>Audio + Bangla/EN Lyrics</span>
            <span className={styles.nodeSub}>Spectral MFCC/Mel + semantic lyric embeddings</span>
          </div>
          <div className={`${styles.pipelineNode} ${styles.pipelineNodeHighlight}`}>
            <span className={styles.nodeStep}>Latent Projection</span>
            <span className={styles.nodeTitle}>
              {vaeVariant === 'betavae'
                ? 'β-VAE KL Penalty (β > 1)'
                : vaeVariant === 'cvae'
                  ? 'Language-Conditioned CVAE'
                  : 'Spectrogram ConvVAE'}
            </span>
            <span className={styles.nodeSub}>
              {vaeVariant === 'betavae'
                ? 'Separates timbre, rhythm & linguistic factors'
                : vaeVariant === 'cvae'
                  ? 'Aligns cross-lingual genre manifolds'
                  : 'Captures local time-frequency motifs'}
            </span>
          </div>
          <div className={styles.pipelineNode}>
            <span className={styles.nodeStep}>Clustering Suite</span>
            <span className={styles.nodeTitle}>K-Means · Agglom · DBSCAN</span>
            <span className={styles.nodeSub}>Evaluated via Silhouette, ARI &amp; NMI</span>
          </div>
        </div>
      </div>
    );
  }

  // Default: 'bangla-ner' (SemEval 2023 Task 2 Sequence Labeling)
  const samples = [
    {
      label: 'Sample 01 (Literary & Geo)',
      tokens: [
        { text: 'রবীন্দ্রনাথ ঠাকুর', tag: 'B-PER', kind: 'per' },
        { text: 'কুষ্টিয়ার', tag: 'B-LOC', kind: 'loc' },
        { text: 'শিলাইদহে', tag: 'I-LOC', kind: 'loc' },
        { text: 'গীতাঞ্জলি', tag: 'B-CW', kind: 'per' },
        { text: 'রচনা করেন।', tag: 'O', kind: 'none' },
      ],
    },
    {
      label: 'Sample 02 (Academic & Org)',
      tokens: [
        { text: 'ব্র্যাক বিশ্ববিদ্যালয়', tag: 'B-GRP', kind: 'loc' },
        { text: 'ঢাকায়', tag: 'B-LOC', kind: 'loc' },
        { text: 'বাংলা ভাষা', tag: 'B-CW', kind: 'per' },
        { text: 'গবেষণা পরিচালনা করছে।', tag: 'O', kind: 'none' },
      ],
    },
  ];
  const currentSample = samples[nerSample];

  return (
    <div className={styles.schematicBox}>
      <div className={styles.schematicHeader}>
        <span className={styles.schematicLabel}>SEMEVAL 2023 TASK 2 // BANGLA TOKEN TAGGER</span>
        <div className={styles.tabRow}>
          <button
            type="button"
            onClick={() => setNerSample(0)}
            className={`${styles.tabBtn} ${nerSample === 0 ? styles.tabBtnActive : ''}`}
          >
            Utterance A
          </button>
          <button
            type="button"
            onClick={() => setNerSample(1)}
            className={`${styles.tabBtn} ${nerSample === 1 ? styles.tabBtnActive : ''}`}
          >
            Utterance B
          </button>
        </div>
      </div>

      <div className={styles.tokenStream} aria-label={currentSample.label}>
        {currentSample.tokens.map((tok, index) => (
          <span
            key={index}
            className={`${styles.tokenChip} ${
              tok.kind === 'per'
                ? styles.tokenEntityPer
                : tok.kind === 'loc'
                  ? styles.tokenEntityLoc
                  : ''
            }`}
          >
            <span>{tok.text}</span>
            <span className={styles.tokenTag}>{tok.tag}</span>
          </span>
        ))}
      </div>

      <div className={styles.telemetryReadout}>
        <span>Subword BIO alignment on noisy MultiCoNER II Bangla sequences</span>
        <span className={styles.readoutBlue}>+ CSE428 Vision (LogReg · MLP · CNN)</span>
      </div>
    </div>
  );
};
