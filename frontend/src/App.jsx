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
import useHaptics from './hooks/useHaptics';
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'react-hot-toast';

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
  const haptics = useHaptics();

  useEffect(() => {
    (async () => {
      const scores = await fetchTopScores();
      setTopScores(scores);
    })();
  }, [fetchTopScores, score]);

  
  useEffect(() => {
    const info = lastMoveRef.current;
    if (!info) return;
    if (info.merged) {
      sounds.playMerge();
      haptics.merge();
    } else {
      sounds.playMove();
      haptics.move();
    }
  }, [board, lastMoveRef, sounds, haptics]);

 
  useEffect(() => {
    if (status === 'won') {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.3 } });
      toast.success('You reached 2048! 🎉', { id: 'win', duration: 3000 });
      haptics.win();
    }
  }, [status, haptics]);

  
  const handlers = useSwipeable({
    onSwipedLeft:  () => { haptics.tap(); doMoveDir('left'); },
    onSwipedRight: () => { haptics.tap(); doMoveDir('right'); },
    onSwipedUp:    () => { haptics.tap(); doMoveDir('up'); },
    onSwipedDown:  () => { haptics.tap(); doMoveDir('down'); },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  const onNameChange = (v) => {
    setPlayerName(v);
    localStorage.setItem('exponent_name', v);
  };

  const saveScoreNow = async () => {
    if (!playerName) {
      toast('Enter your name first.', { icon: '✍️' });
      haptics.error();
      return;
    }
    setSaving(true);
    const resp = await submitScore(playerName);
    setSaving(false);
    if (resp.ok) {
      const scores = await fetchTopScores();
      setTopScores(scores);
      setShowLeaderboard(true);
      toast.success('Score saved to leaderboard! 🏆');
      haptics.tap();
    } else {
      toast.error(`Failed to save score: ${resp.error}`);
      haptics.error();
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(15,23,42,0.9)',
            color: '#e5e7eb',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)'
          }
        }}
      />

      
      <div className="min-h-screen flex items-start justify-center p-4 sm:p-6 pb-28 lg:pb-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-6 lg:gap-8">

          
          <div className="board-wrap p-4 sm:p-6 relative" {...handlers} aria-label="Game board - swipe to move">
            <div className="flex items-start justify-between mb-4 gap-3 sm:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold h-premium">Exponent — 2048</h1>
                <div className="text-xs sm:text-sm text-slate-300 mt-1">A polished 2048 experience</div>
              </div>

              <div className="flex flex-col items-end gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <ScoreBoard score={score} best={best} />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
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
                    style={{ minWidth: 180 }}
                  />
                  <button
                    onClick={() => { haptics.tap(); restart(boardSize); }}
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
              <SizeSelector value={boardSize} onNewGame={(n) => { haptics.tap(); restart(n); }} />
            </div>

           
            <ProgressBar board={board} />

           
            <div className="mt-3 sm:mt-4">
              <GameBoard board={board} lastMoveInfo={lastMoveRef.current} />
            </div>

           
            <div className="mt-4 lg:mt-6">
              <div className="
                fixed lg:static
                left-1/2 -translate-x-1/2 lg:translate-x-0
                bottom-[calc(env(safe-area-inset-bottom,0px)+12px)]
                z-40
              ">
                <Controls onMove={(dir) => { haptics.tap(); doMoveDir(dir); }} />
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs sm:text-sm text-slate-200">Use arrow keys, on-screen controls or swipe</div>
              <div>
                <button
                  className="btn-primary text-xs sm:text-sm"
                  onClick={() => { haptics.tap(); setShowLeaderboard(s => !s); }}
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
            onRestart={() => { haptics.tap(); restart(boardSize); }}
            onSubmit={async (name, autoClose) => {
              const resp = await submitScore(name || playerName || 'Anonymous');
              if (resp.ok && autoClose) {
                const scores = await fetchTopScores();
                setTopScores(scores);
                toast.success('Score submitted! 🏅');
                haptics.tap();
              } else if (!resp.ok) {
                toast.error(`Submit failed: ${resp.error}`);
                haptics.error();
              }
              return resp;
            }}
          />
        )}
      </div>
    </>
  );
}
