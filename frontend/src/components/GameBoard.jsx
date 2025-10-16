import React from 'react';
import Tile from './Tile';

export default function GameBoard({ board, lastMoveInfo = null }) {
  const size = board.length;
  const gridStyle = { gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` };

  // newPos is lastMoveInfo.addedTilePos (row, col) or null.
  const newPos = lastMoveInfo?.addedTilePos || null;
  
  // merged is true if last move merged tiles.
  const merged = lastMoveInfo?.merged || false;

  return (
    <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.18)]">

      <div className="grid gap-3" style={gridStyle}>

        {board.flat().map((v, idx) => {

          const r = Math.floor(idx / size);
          const c = idx % size;
          const isNew = newPos && newPos[0] === r && newPos[1] === c;

          return (
            <div key={idx} className="cell flex items-center justify-center">
              {v !== 0 ? <Tile value={v} isNew={isNew} isMerged={merged && !isNew} /> : <div className="w-full h-full" />}
            </div>
            
          );
        })}
      </div>
    </div>
  );
}
