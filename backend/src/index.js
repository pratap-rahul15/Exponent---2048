import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { getTopScores, addScore } from "./scoresStore.js";
import { validateScorePayload } from "./validators.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*' 
}));
app.use(bodyParser.json());


app.get('/', (req, res) => res.json({ ok: true, service: 'Exponent Backend API' }));


app.get('/scores', (req, res) => {
  const top = getTopScores(10);
  res.json({ ok: true, scores: top });
});


app.post('/scores', (req, res) => {
  const v = validateScorePayload(req.body);
  if (!v.ok) return res.status(400).json({ ok: false, error: v.error });
  const entry = addScore(v.payload);
  res.status(201).json({ ok: true, entry });
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: 'internal_error' });
});

app.listen(PORT, () => {
  console.log(` Exponent - 2048 backend running on port ${PORT}`);
});
