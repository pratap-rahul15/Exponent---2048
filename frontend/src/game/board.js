export const range = n => Array.from({length: n}, (_, i) => i);

// Creates an empty board of given size (default 4x4).
export function emptyBoard(size = 4) {
  return range(size).map(() => Array(size).fill(0));
}

// Clones a board (2D array) to avoid mutating the original.
export function cloneBoard(board) {
  return board.map(row => row.slice());
}

// Adds a random tile (2 or 4) to an empty spot on the board.
export function addRandomTile(board, randFn = Math.random) {
  const size = board.length;
  const empties = [];
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (board[r][c] === 0) empties.push([r, c]);

  if (empties.length === 0) return board;
  const [r, c] = empties[Math.floor(randFn() * empties.length)];
  const value = randFn() < 0.9 ? 2 : 4;
  const newB = cloneBoard(board);
  newB[r][c] = value;
  return newB;
}

// Slides and merges a single row to the left, returning the new row and score gained.
function slideAndMergeRow(row) {
  const nonZero = row.filter(x => x !== 0);
  const newRow = [];
  let scoreGain = 0;
  for (let i = 0; i < nonZero.length; i++) {
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i+1]) {
      const merged = nonZero[i] + nonZero[i+1];
      newRow.push(merged);
      scoreGain += merged;
      i++; 
    } else {
      newRow.push(nonZero[i]);
    }
  }
  while (newRow.length < row.length) newRow.push(0);
  return { row: newRow, scoreGain };
}

// Moves the entire board left, returning the new board and total score gained.
export function moveLeft(board) {
  const n = board.length;
  const newBoard = [];
  let totalGain = 0;
  for (let r = 0; r < n; r++) {
    const { row, scoreGain } = slideAndMergeRow(board[r]);
    newBoard.push(row);
    totalGain += scoreGain;
  }
  return { board: newBoard, scoreGain: totalGain };
}

// Reverses each row of the board (used for right moves).
export function reverseRows(board) {
  return board.map(row => row.slice().reverse());
}

// Transposes the board (used for up/down moves).
export function transpose(board) {
  const n = board.length;
  const t = emptyBoard(n);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      t[j][i] = board[i][j];
  return t;
}

// Moves in other directions by transforming the board and reusing moveLeft.
export function moveRight(board) {
  const rev = reverseRows(board);
  const { board: moved, scoreGain } = moveLeft(rev);
  return { board: reverseRows(moved), scoreGain };
}

// Up and down moves use transpose to convert to left/right moves.
export function moveUp(board) {
  const t = transpose(board);
  const { board: moved, scoreGain } = moveLeft(t);
  return { board: transpose(moved), scoreGain };
}

// Down move is transpose, reverse, left move, reverse, transpose.
export function moveDown(board) {
  const t = transpose(board);
  const rev = reverseRows(t);
  const { board: moved, scoreGain } = moveLeft(rev);
  return { board: transpose(reverseRows(moved)), scoreGain };
}

// Checks if two boards are equal.
export function boardsEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < a.length; j++)
      if (a[i][j] !== b[i][j]) return false;
  return true;
}

//  Checks if there are any valid moves left on the board.
export function hasAnyMoves(board) {
  const n = board.length;
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (board[r][c] === 0) return true;

  for (let r = 0; r < n; r++)
    for (let c = 0; c < n - 1; c++)
      if (board[r][c] === board[r][c + 1]) return true;

  for (let c = 0; c < n; c++)
    for (let r = 0; r < n - 1; r++)
      if (board[r][c] === board[r + 1][c]) return true;

  return false;
}

//  Checks if the board has reached the 2048 tile.
export function reached2048(board) {
  return board.some(row => row.some(x => x === 2048));
}
