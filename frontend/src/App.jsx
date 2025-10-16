import React, { useState, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import ScoreBoard from './components/ScoreBoard';
import Leaderboard from './components/Leaderboard';
import WinLoseModal from './components/WinLoseModal';
import GameRules from './components/GameRules';
import ProgressBar from './components/ProgressBar';
import SizeSelector from './components/SizeSelector';
import { useSwipeable } from 'react-swipeable';
import useSounds from './sounds/useSounds';
import confetti from 'canvas-confetti';

export default function App() {
  const {
    board,
    score,
    best,
    status,
    boardSize,
    restart,
    doMoveDir,
    submitScore,
    fetchTopScores,
    lastMoveRef
  } = useGame(4);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('exponent_name') || '');
  const [saving, setSaving] = useState(false);
  const sounds = useSounds();

  useEffect(() => {
    (async () => {
      const scores = await fetchTopScores();
      setTopScores(scores);
    })();
  }, [fetchTopScores, score]);

  // sounds
  useEffect(() => {
    const info = lastMoveRef.current;
    if (!info) return;
    if (info.merged) sounds.playMerge();
    else sounds.playMove();
  }, [board, lastMoveRef, sounds]);

  // confetti on win
  useEffect(() => {
    if (status === 'won') {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.3 } });
    }
  }, [status]);

  // swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => doMoveDir('left'),
    onSwipedRight: () => doMoveDir('right'),
    onSwipedUp: () => doMoveDir('up'),
    onSwipedDown: () => doMoveDir('down'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });
// name change
  const onNameChange = (v) => {
    setPlayerName(v);
    localStorage.setItem('exponent_name', v);
  };
// save score
  const saveScoreNow = async () => {
    if (!playerName) {
      alert('Enter your name first.');
      return;
    }
    setSaving(true);
    const resp = await submitScore(playerName);
    setSaving(false);
    if (resp.ok) {
      const scores = await fetchTopScores();
      setTopScores(scores);
      setShowLeaderboard(true);
      alert('Score saved to leaderboard!');
    } else {
      alert(`Failed to save score: ${resp.error}`);
    }
  };

  // main render return function
  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8">

       
        <div className="board-wrap p-6" {...handlers} aria-label="Game board - swipe to move">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <h1 className="text-3xl font-bold h-premium">Exponent — 2048</h1>
              <div className="text-sm text-slate-400 mt-1">A polished 2048 experience</div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3">
                <ScoreBoard score={score} best={best} />
              </div>

              <div className="flex items-center gap-3">
                <input
                  aria-label="Player name"
                  placeholder="Enter name for leaderboard"
                  value={playerName}
                  onChange={(e) => onNameChange(e.target.value)}
                  className="
                    px-3 py-2 rounded-md text-sm text-slate-100 placeholder:text-slate-400
                    bg-slate-700/70 border border-indigo-400/30
                    focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/25 outline-none
                  "
                  style={{ minWidth: 220 }}
                />
                <button
                  onClick={() => restart(boardSize)}
                  aria-label="Restart game"
                  className="btn-primary text-sm"
                >
                  Restart
                </button>
                <button
                  onClick={saveScoreNow}
                  aria-label="Save score now"
                  className="btn-primary text-sm"
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save Score'}
                </button>
              </div>
            </div>
          </div>

          
          <div className="mb-3">
            <SizeSelector value={boardSize} onNewGame={(n) => restart(n)} />
          </div>

          
          <ProgressBar board={board} />

         
          <div className="mt-4">
            <GameBoard board={board} lastMoveInfo={lastMoveRef.current} />
          </div>

         
          <div className="mt-4 flex justify-center">
            <Controls onMove={(dir) => doMoveDir(dir)} />
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-slate-300">Use arrow keys, on-screen controls or swipe</div>
            <div>
              <button
                className="btn-primary text-sm"
                onClick={() => setShowLeaderboard(s => !s)}
                aria-label="Toggle leaderboard"
              >
                {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
              </button>
            </div>
          </div>
        </div>

        
        <div>
          <div className="mb-4">
            <GameRules />
          </div>

          {showLeaderboard && (
            <div className="card-glass p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="h-premium text-lg">Leaderboard</h2>
                <div className="text-sm text-slate-400">Top Players</div>
              </div>
              <Leaderboard topScores={topScores} />
            </div>
          )}
        </div>
      </div>

     
      {status !== 'playing' && (
        <WinLoseModal
          status={status}
          score={score}
          defaultName={playerName}
          onRestart={() => restart(boardSize)}
          onSubmit={async (name, autoClose) => {
            const resp = await submitScore(name || playerName || 'Anonymous');
            if (resp.ok && autoClose) {
              const scores = await fetchTopScores();
              setTopScores(scores);
            }
            return resp;
          }}
        />
      )}
    </div>
  );
}
