export function validateScorePayload(body) {

  if (!body) return { ok: false, error: 'Missing body' };

  const { name, score } = body;

  if (typeof name !== 'string' || name.trim().length === 0) {
    return { ok: false, error: 'Invalid name' };

  }
  const nscore = Number(score);

  if (!Number.isFinite(nscore) || nscore < 0) {
    return { ok: false, error: 'Invalid score' };

  }

  return { ok: true, payload: { name: name.trim().slice(0,50), score: Math.floor(nscore) } };
  
}
