import React, { useMemo } from 'react';
import { FiAward } from 'react-icons/fi';

// Formats a timestamp into a human-readable string.
function formatWhen(ts) {
  try {
    const d = ts ? new Date(ts) : new Date();
    return d.toLocaleString([], { hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit' });
  } catch {
    return '';
  }
}

// Generates an avatar with the initial of the name.
function Avatar({ name }) {
  const initial = (name?.trim?.()[0] || '?').toUpperCase();
  return (
    <div
      className="
        w-10 h-10 rounded-full bg-gradient-to-br
        from-indigo-500/60 to-violet-500/60
        flex items-center justify-center
        font-semibold text-white shadow-md ring-1 ring-white/20
      "
    >
      {initial}
    </div>
  );
}

// Displays a badge for the rank with special styles for top 3 ranks.
function RankBadge({ rank }) {
  const styleByRank = {
    1: 'bg-gradient-to-br from-amber-300 to-yellow-500 text-slate-900',
    2: 'bg-gradient-to-br from-zinc-300 to-slate-400 text-slate-900',
    3: 'bg-gradient-to-br from-orange-400 to-amber-500 text-slate-900',
  }[rank] || 'bg-slate-700 text-slate-200';

  return (
    <div
      className={`
        px-2 py-1 rounded-md text-xs font-bold
        flex items-center justify-center gap-1 shadow-sm ${styleByRank}
      `}
    >
      <FiAward size={13} /> #{rank}
    </div>
  );
}

// Main Leaderboard component that displays top scores.

export default function Leaderboard({ topScores = [] }) {
  const rows = useMemo(() => {
    const norm = (topScores || []).map((s, i) => ({
      name: s?.name ?? `Player ${i + 1}`,
      score: Number(s?.score ?? 0),
      createdAt: s?.createdAt ?? Date.now(),
    }));
    norm.sort((a, b) => b.score - a.score);
    return norm.slice(0, 10);
  }, [topScores]);

  if (!rows.length) {
    return (
      <div className="text-slate-400 text-sm">
        No scores yet. Play a round and hit <span className="text-indigo-400 font-medium">Save Score</span> to appear here.
      </div>
    );
  }

  // Render the leaderboard rows.
  return (
    <div className="flex flex-col gap-3 mt-3">
      {rows.map((row, idx) => (
        <div
          key={`${row.name}-${row.createdAt}-${idx}`}
          className="
            flex justify-between items-center
            bg-gradient-to-br from-slate-800/60 to-slate-900/60
            border border-white/10 rounded-xl px-4 py-3
            hover:border-indigo-400/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]
            transition-all duration-200 ease-in-out
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            <RankBadge rank={idx + 1} />
            <Avatar name={row.name} />
            <div className="min-w-0">
              <div className="font-semibold text-sm text-slate-100 truncate">{row.name}</div>
              <div className="text-xs text-slate-400">{formatWhen(row.createdAt)}</div>
            </div>
          </div>

          <div
            className="
              px-4 py-1.5 rounded-md text-sm font-bold
              bg-gradient-to-r from-indigo-500 to-violet-600
              text-white shadow ring-1 ring-white/10
            "
          >
            {row.score.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
