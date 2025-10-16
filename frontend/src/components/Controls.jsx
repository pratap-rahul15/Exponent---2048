import React from 'react';
import { FiArrowLeft, FiArrowRight, FiArrowUp, FiArrowDown } from 'react-icons/fi';

// Button styles
const btn =
  "w-14 h-14 rounded-full text-white shadow-lg ring-1 ring-white/10 " +
  "bg-gradient-to-br from-indigo-500 to-violet-600 " +
  "flex items-center justify-center " +
  "hover:scale-105 active:scale-95 transition-transform duration-120";

  // Controls component
export default function Controls({ onMove }) {

  return (

    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex justify-center">
        <button aria-label="Move up" className={btn} onClick={() => onMove('up')}>
          <FiArrowUp size={22} />

        </button>

      </div>

      <div className="flex gap-5">
        <button aria-label="Move left" className={btn} onClick={() => onMove('left')}>
          <FiArrowLeft size={22} />
        </button>
        <button aria-label="Move down" className={btn} onClick={() => onMove('down')}>
          <FiArrowDown size={22} />
        </button>
        <button aria-label="Move right" className={btn} onClick={() => onMove('right')}>
          <FiArrowRight size={22} />
        </button>
      </div>
      <div className="mt-2 text-xs text-slate-300"> </div>
    </div>
  );
}
