import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('data');

const DATA_FILE = path.join(DATA_DIR, 'scores.json');


if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });


function loadScores() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Failed to load scores:', err);
    return [];
  }
}

// Now save the scores
function saveScores(scores) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(scores, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save scores:', err);
    return false;
  }
}

let inMemory = loadScores();

// Fetch the top scoes.
export function getTopScores(limit = 10) {
  const copy = inMemory.slice();
  copy.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  return copy.slice(0, limit);
}

// Add a new score.
export function addScore({ name, score }) {
  const entry = {
    name: String(name).slice(0, 50),
    score: Number(score),
    createdAt: new Date().toISOString()
  };
  inMemory.push(entry);
  saveScores(inMemory);
  return entry;
}


export function _resetStoreForTests() {
  inMemory = [];
  saveScores(inMemory);
}
