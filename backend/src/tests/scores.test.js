import { _resetStoreForTests } from '../src/scoresStore.js';
import { validateScorePayload } from '../src/validators.js';
import { addScore, getTopScores } from '../src/scoresStore.js';

describe('validators', () => {
  test('validate good payload', () => {
    const v = validateScorePayload({ name: 'Alice', score: 123 });
    expect(v.ok).toBe(true);
    expect(v.payload.name).toBe('Alice');
    expect(v.payload.score).toBe(123);
  });
  test('reject empty name', () => {
    const v = validateScorePayload({ name: '', score: 1 });
    expect(v.ok).toBe(false);
  });
  test('reject bad score', () => {
    const v = validateScorePayload({ name: 'Bob', score: -2 });
    expect(v.ok).toBe(false);
  });
});

describe('scoresStore', () => {
  beforeEach(() => {
    _resetStoreForTests();
  });
  test('add and get top', () => {
    addScore({ name: 'A', score: 10 });
    addScore({ name: 'B', score: 50 });
    addScore({ name: 'C', score: 20 });
    const top = getTopScores(2);
    expect(top.length).toBe(2);
    expect(top[0].name).toBe('B');
    expect(top[1].name).toBe('C');
  });
});
