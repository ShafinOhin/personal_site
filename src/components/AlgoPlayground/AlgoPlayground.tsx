import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, RotateCcw } from 'lucide-react';
import { HONOR_ITEMS } from '../../data/portfolioData';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './AlgoPlayground.module.css';

const GRID_ROWS = 7;
const GRID_COLS = 13;
const START_NODE = { r: 3, c: 1 };
const TARGET_NODE = { r: 3, c: 11 };

// Default architectural barrier pattern
const INITIAL_WALLS = new Set<string>([
  '1-4',
  '2-4',
  '3-4',
  '4-4',
  '2-8',
  '3-8',
  '4-8',
  '5-8',
  '1-6',
  '5-6',
]);

type AlgoKind = 'astar' | 'bfs';

/**
 * Pairs Shafin's Competitive Programming honors (Codeforces Expert, IUPC Champion)
 * with a live, interactive graph search micro-laboratory inspired by his React AlgoVisualizer project.
 */
export const AlgoPlayground: React.FC = () => {
  const [algo, setAlgo] = useState<AlgoKind>('astar');
  const [walls, setWalls] = useState<Set<string>>(() => new Set(INITIAL_WALLS));
  const [visitedSet, setVisitedSet] = useState<Set<string>>(() => new Set());
  const [pathSet, setPathSet] = useState<Set<string>>(() => new Set());
  const [stats, setStats] = useState<{ visitedCount: number; pathLength: number }>({
    visitedCount: 0,
    pathLength: 0,
  });

  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  // Run graph search (BFS or A* with Manhattan heuristic) and animate exploration wavefront
  const runSearch = useCallback(
    (selectedAlgo: AlgoKind, currentWalls: Set<string>) => {
      clearTimers();
      setVisitedSet(new Set());
      setPathSet(new Set());

      const startKey = `${START_NODE.r}-${START_NODE.c}`;
      const targetKey = `${TARGET_NODE.r}-${TARGET_NODE.c}`;

      const visitedOrder: string[] = [];
      const parentMap = new Map<string, string>();
      const gScore = new Map<string, number>();
      const closed = new Set<string>();

      gScore.set(startKey, 0);

      interface QueueItem {
        r: number;
        c: number;
        priority: number;
      }

      const openQueue: QueueItem[] = [{ r: START_NODE.r, c: START_NODE.c, priority: 0 }];
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      while (openQueue.length > 0) {
        if (selectedAlgo === 'astar') {
          openQueue.sort((a, b) => a.priority - b.priority);
        }

        const current = openQueue.shift()!;
        const currKey = `${current.r}-${current.c}`;

        if (closed.has(currKey)) continue;
        closed.add(currKey);

        if (currKey !== startKey && currKey !== targetKey) {
          visitedOrder.push(currKey);
        }

        if (currKey === targetKey) {
          break;
        }

        const currentCost = gScore.get(currKey) ?? 0;

        for (const [dr, dc] of directions) {
          const nr = current.r + dr;
          const nc = current.c + dc;
          const nextKey = `${nr}-${nc}`;

          if (nr < 0 || nr >= GRID_ROWS || nc < 0 || nc >= GRID_COLS) continue;
          if (currentWalls.has(nextKey) || closed.has(nextKey)) continue;

          const tentativeG = currentCost + 1;
          const prevG = gScore.get(nextKey);

          if (prevG === undefined || tentativeG < prevG) {
            gScore.set(nextKey, tentativeG);
            parentMap.set(nextKey, currKey);
            const manhattan =
              Math.abs(nr - TARGET_NODE.r) + Math.abs(nc - TARGET_NODE.c);
            const priority =
              selectedAlgo === 'astar' ? tentativeG + manhattan : tentativeG;
            openQueue.push({ r: nr, c: nc, priority });
          }
        }
      }

      // Reconstruct shortest path
      const shortestPath: string[] = [];
      if (parentMap.has(targetKey)) {
        let stepKey = parentMap.get(targetKey);
        while (stepKey && stepKey !== startKey) {
          shortestPath.unshift(stepKey);
          stepKey = parentMap.get(stepKey);
        }
      }

      setStats({
        visitedCount: visitedOrder.length,
        pathLength: shortestPath.length > 0 ? shortestPath.length + 1 : 0,
      });

      // Animate visited wavefront
      visitedOrder.forEach((key, idx) => {
        const timerId = window.setTimeout(() => {
          setVisitedSet((prev) => {
            const next = new Set(prev);
            next.add(key);
            return next;
          });
        }, idx * 18);
        timersRef.current.push(timerId);
      });

      // Animate shortest path after wavefront completes
      const baseDelay = visitedOrder.length * 18 + 40;
      shortestPath.forEach((key, idx) => {
        const timerId = window.setTimeout(() => {
          setPathSet((prev) => {
            const next = new Set(prev);
            next.add(key);
            return next;
          });
        }, baseDelay + idx * 28);
        timersRef.current.push(timerId);
      });
    },
    [clearTimers]
  );

  // Run an initial A* demonstration on mount
  useEffect(() => {
    runSearch('astar', INITIAL_WALLS);
    return () => clearTimers();
  }, [runSearch, clearTimers]);

  const handleToggleCell = (r: number, c: number) => {
    if (
      (r === START_NODE.r && c === START_NODE.c) ||
      (r === TARGET_NODE.r && c === TARGET_NODE.c)
    ) {
      return;
    }
    const key = `${r}-${c}`;
    const updatedWalls = new Set(walls);
    if (updatedWalls.has(key)) {
      updatedWalls.delete(key);
    } else {
      updatedWalls.add(key);
    }
    setWalls(updatedWalls);
    runSearch(algo, updatedWalls);
  };

  const handleSwitchAlgo = (nextAlgo: AlgoKind) => {
    setAlgo(nextAlgo);
    runSearch(nextAlgo, walls);
  };

  const handleResetWalls = () => {
    const freshWalls = new Set(INITIAL_WALLS);
    setWalls(freshWalls);
    runSearch(algo, freshWalls);
  };

  return (
    <section id="algorithms" className={styles.section}>
      <SectionHeader
        index="03"
        label="Algorithms"
        title="Competitive programming"
        description="Codeforces Expert (max 1609) and 4★ on CodeChef, with 1,000+ problems solved. The grid on the right is a small pathfinding demo — click cells to add walls."
      />

      <div className={styles.mainGrid}>
        {/* Honors list */}
        <div className={styles.honorsPanel}>
          <div className={styles.honorList}>
            {HONOR_ITEMS.map((honor) => (
              <div key={honor.id} className={styles.honorRow}>
                <span className={styles.honorYear}>{honor.year}</span>
                <div>
                  <h3 className={styles.honorTitle}>{honor.title}</h3>
                  <p className={styles.honorContext}>{honor.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive pathfinding demo */}
        <div className={styles.visualizerPanel}>
          <div className={styles.visTopBar}>
            <h3 className={styles.visHeading}>Pathfinding</h3>

            <div className={styles.algoControls}>
              <button
                type="button"
                onClick={() => handleSwitchAlgo('astar')}
                className={`${styles.algoSelectBtn} ${
                  algo === 'astar' ? styles.algoSelectBtnActive : ''
                }`}
              >
                A*
              </button>
              <button
                type="button"
                onClick={() => handleSwitchAlgo('bfs')}
                className={`${styles.algoSelectBtn} ${
                  algo === 'bfs' ? styles.algoSelectBtnActive : ''
                }`}
              >
                BFS
              </button>
            </div>
          </div>

          <div
            className={styles.latticeContainer}
            role="grid"
            aria-label="Interactive pathfinding lattice. Click any cell to toggle barrier walls."
          >
            {Array.from({ length: GRID_ROWS }).map((_, r) =>
              Array.from({ length: GRID_COLS }).map((__, c) => {
                const key = `${r}-${c}`;
                const isStart = r === START_NODE.r && c === START_NODE.c;
                const isTarget = r === TARGET_NODE.r && c === TARGET_NODE.c;
                const isWall = walls.has(key);
                const isPath = pathSet.has(key);
                const isVisited = visitedSet.has(key);

                let cellStateClass = '';
                if (isStart) cellStateClass = styles.cellStart;
                else if (isTarget) cellStateClass = styles.cellTarget;
                else if (isWall) cellStateClass = styles.cellWall;
                else if (isPath) cellStateClass = styles.cellPath;
                else if (isVisited) cellStateClass = styles.cellVisited;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleToggleCell(r, c)}
                    className={`${styles.latticeCell} ${cellStateClass}`}
                    title={
                      isStart
                        ? 'Origin Node (S)'
                        : isTarget
                          ? 'Target Node (T)'
                          : 'Click to toggle barrier node'
                    }
                  >
                    {isStart ? 'S' : isTarget ? 'T' : ''}
                  </button>
                );
              })
            )}
          </div>

          <div className={styles.visActionFooter}>
            <div className={styles.runBtnGroup}>
              <button
                type="button"
                onClick={() => runSearch(algo, walls)}
                className={styles.runBtn}
              >
                <Play size={13} />
                <span>Replay</span>
              </button>
              <button type="button" onClick={handleResetWalls} className={styles.resetBtn}>
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
              <a
                href="https://github.com/ShafinOhin/AlgoVisualizer"
                target="_blank"
                rel="noreferrer"
                className={styles.resetBtn}
              >
                <span>Source</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div className={styles.telemetryReadout}>
              {stats.visitedCount} explored ·{' '}
              {stats.pathLength > 0 ? `path ${stats.pathLength}` : 'no path'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
