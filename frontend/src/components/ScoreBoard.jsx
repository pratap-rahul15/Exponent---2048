import React from 'react';
import { FiActivity } from 'react-icons/fi';

// Displays the current score, best score, and a live activity indicator.
export default function ScoreBoard({ score, best }) {
  return (
    <div className="flex items-center gap-3">
      <div className="score-chip">
        <div className="text-xs text-slate-300">SCORE</div>
        <div className="text-2xl font-bold">{score}</div>
      </div>

      <div className="score-chip">
        <div className="text-xs text-slate-300">BEST</div>
        <div className="text-2xl font-bold">{best}</div>
      </div>

      <div className="ml-3 flex items-center gap-2 text-slate-300">
        <FiActivity size={20} />
        <div className="text-xs">Live</div>
      </div>
    </div>
  );
}
