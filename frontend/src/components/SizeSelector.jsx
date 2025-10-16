import React, { useState, useEffect } from 'react';

const SIZES = [4, 5, 6];

// Component for selecting the board size and starting a new game.
export default function SizeSelector({ value = 4, onNewGame }) {
  const [sel, setSel] = useState(value);

  useEffect(() => setSel(value), [value]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-slate-300">Board</label>
      <select
        aria-label="Board size"
        className="
          px-3 py-2 rounded-md text-sm
          bg-slate-800 border border-slate-700 text-slate-100
          focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/25 outline-none
        "
        value={sel}
        onChange={(e) => setSel(Number(e.target.value))}
      >
        {SIZES.map(n => <option key={n} value={n}>{n} × {n}</option>)}
      </select>

      <button
        className="btn-primary text-sm"
        onClick={() => onNewGame(sel)}
        aria-label="Start new game with selected size"
      >
        New Game
      </button>
    </div>
  );
}
