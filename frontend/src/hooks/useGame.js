import { useState, useEffect, useCallback, useRef } from 'react';
import {
  emptyBoard, addRandomTile, moveLeft, moveRight, moveUp, moveDown,
  boardsEqual, reached2048, hasAnyMoves
} from '../game/board';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function useGame(initialSize = 4) {

  // expose a real boardSize state so UI will change it eventually.
  const [boardSize, setBoardSize] = useState(initialSize);


  //  initialize a board with two tiles
  const makeInitBoard = useCallback(() => {
    let b = emptyBoard(boardSize);
    b = addRandomTile(b);
    b = addRandomTile(b);
    return b;
  }, [boardSize]);
  

  // main game state

  const [board, setBoard] = useState(makeInitBoard);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('best') || 0));
  const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'lost'
  const lastMoveRef = useRef({ merged: false, addedTilePos: null });

  // persist best score
  useEffect(() => {
    localStorage.setItem('best', String(best));
  }, [best]);


  //  restart game, optionally with new size
  const restart = useCallback((newSize = boardSize) => {
    setBoardSize(newSize);
    setScore(0);
    setStatus('playing');
    lastMoveRef.current = { merged: false, addedTilePos: null };
    setBoard(() => {
      let b = emptyBoard(newSize);
      b = addRandomTile(b);
      b = addRandomTile(b);
      return b;
    });
  }, [boardSize]);


  // apply a move function and update state accordingly
  const findAddedTilePos = (oldBoard, newBoard) => {
    for (let r = 0; r < newBoard.length; r++) {
      for (let c = 0; c < newBoard.length; c++) {
        if (oldBoard[r][c] === 0 && newBoard[r][c] !== 0) return [r, c];
      }
    }
    return null;
  };


  // returns true if move was applied
  const applyMoveFn = (moveFn) => {
    if (status !== 'playing') return false;
    const { board: moved, scoreGain } = moveFn(board);
    if (!boardsEqual(moved, board)) {
      const withTile = addRandomTile(moved);
      const newScore = score + scoreGain;
      setBoard(withTile);
      setScore(newScore);
      if (newScore > best) setBest(newScore);
      if (reached2048(withTile)) setStatus('won');
      else if (!hasAnyMoves(withTile)) setStatus('lost');

      lastMoveRef.current = {
        merged: scoreGain > 0,
        addedTilePos: findAddedTilePos(board, withTile)
      };
      return true;
    }
    return false;
  };

// move handlers
  const doMoveDir = useCallback((dir) => {
    const map = { left: moveLeft, right: moveRight, up: moveUp, down: moveDown };
    const fn = map[dir];
    if (!fn) return false;
    return applyMoveFn(fn);
  }, [board, score, status, best]);

  // keyboard handlers
  useEffect(() => {
    const handler = (e) => {
      if (status !== 'playing') return;
      if (e.key === 'ArrowLeft') doMoveDir('left');
      else if (e.key === 'ArrowRight') doMoveDir('right');
      else if (e.key === 'ArrowUp') doMoveDir('up');
      else if (e.key === 'ArrowDown') doMoveDir('down');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [doMoveDir, status]);

  // leaderboard API
  const submitScore = useCallback(async (name) => {
    try {
      await axios.post(`${API}/scores`, { name, score });
      return { ok: true };
    } catch (err) {
      // be quiet if backend is offline, but return structured error
      const msg = err?.response?.data?.error || err?.message || 'submit_failed';
      return { ok: false, error: msg };
    }
  }, [score]);

  // fetch top scores
  const fetchTopScores = useCallback(async () => {
    try {
      const resp = await axios.get(`${API}/scores`);
      return resp.data.scores || [];
    } catch {
      // return empty if offline — keeps console clean during FE-only dev
      return [];
    }
  }, []);

  return {
    // state
    board,
    score,
    best,
    status,
    boardSize,

    // actions
    restart,
    doMoveDir,

    // services
    submitScore,
    fetchTopScores,

    // diagnostics
    lastMoveRef,
  };
}
