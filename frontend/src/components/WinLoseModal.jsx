import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';

export default function WinLoseModal({ status, score, defaultName = '', onRestart, onSubmit }) {
  const [name, setName] = useState(defaultName || '');
  const [autoSubmit, setAutoSubmit] = useState(Boolean(defaultName));
  const [loading, setLoading] = useState(false);

  const label = status === 'won' ? 'You reached 2048!' : 'Game Over';

  const submit = async (closeAfter = true) => {
    if (!name) {
      toast('Enter your name first.', { icon: '✍️' });
      return;
    }
    setLoading(true);
    const resp = await onSubmit(name, closeAfter);
    setLoading(false);
    if (resp.ok && closeAfter) toast.success('Score submitted! 🏅');
    else if (!resp.ok) toast.error(`Submit failed: ${resp.error}`);
    return resp;
  };

  const shareImage = async () => {
    try {
      const boardEl = document.querySelector('.board-wrap');
      if (!boardEl) return toast.error('Board not found to capture.');
      const canvas = await html2canvas(boardEl, { scale: 1.5 });
      canvas.toBlob((blob) => {
        if (!blob) return toast.error('Failed to generate image.');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `exponent-2048-${score}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Board image downloaded 📸');
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to create image for sharing.');
    }
  };

  const shareText = async () => {
    const text = `I scored ${score} on Exponent 2048! Play it here: <your-deployed-link>`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Share text copied to clipboard!');
    } catch (err) {
      toast.error('Copy failed—try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative p-6 bg-slate-900 rounded-xl w-[96%] max-w-md">
        <h2 className="text-2xl font-bold">{label}</h2>
        <p className="mt-2 text-slate-300">
          Score: <span className="font-semibold">{score}</span>
        </p>

        <div className="mt-4">
          <input
            className="w-full p-2 rounded-md bg-slate-800 border border-slate-700"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            id="autosubmit"
            type="checkbox"
            checked={autoSubmit}
            onChange={(e) => setAutoSubmit(e.target.checked)}
          />
          <label htmlFor="autosubmit" className="text-sm text-slate-300">
            Auto-submit next time
          </label>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button
            className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600"
            onClick={onRestart}
          >
            Restart
          </button>

          <button
            className="btn-primary"
            onClick={() => submit(true)}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Score'}
          </button>

          <button
            className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600"
            onClick={shareText}
          >
            Share Text
          </button>

          <button
            className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600"
            onClick={shareImage}
          >
            Share Image
          </button>
        </div>

        <div className="mt-3 text-sm text-slate-400">
          Tip: You can download a PNG of your board or copy a share message.
        </div>
      </div>
    </div>
  );
}
