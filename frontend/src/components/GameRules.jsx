import React from 'react';

export default function GameRules() {
  return (
    <div className="card-glass p-6">
      <h2 className="h-premium text-xl mb-2">How to Play</h2>
      <ol className="list-decimal ml-5 text-slate-300 space-y-2">
        <li>Slide tiles using the <strong>arrow keys</strong> or on-screen controls (swipe on mobile).</li>
        <li>Tiles with the same number merge into one tile with their sum (2 + 2 → 4). Each tile merges once per move.</li>
        <li>After each valid move a new tile (2 usually, 10% chance of 4) appears in a random empty cell.</li>
        <li>Reach a tile with value <strong>2048</strong> to win. If no moves remain the game ends.</li>
        <li>Your score increases by the value of merged tiles. Submit your score after the game to appear on the leaderboard.</li>
      </ol>
      <div className="mt-4 text-sm text-slate-400">Tip: Keep your highest tile in one corner and try to build monotonically around it.</div>
    </div>
  );
}
