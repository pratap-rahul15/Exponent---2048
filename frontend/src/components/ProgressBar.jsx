import React from 'react';

function getMaxTile(board) {
  let max = 0;
  for (const row of board) for (const v of row) if (v > max) max = v;
  return max;
}

export default function ProgressBar({ board }) {

  const max = getMaxTile(board) || 2;

  // percent grows logarithmically (2 → 0%, 2048 → 100%)
  const percent = Math.min(100, Math.round((Math.log2(max) / Math.log2(2048)) * 100));

  // Render the progress bar.
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">Progress to 2048</div>
        <div className="text-xs text-slate-400 font-medium">{percent}% (tile {max})</div>
      </div>
  
      <div
        className="w-full h-3 rounded-full bg-slate-800 overflow-hidden"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg,#6366f1,#7c3aed)',
          }}
        />
      </div>
    </div>
  );
}
