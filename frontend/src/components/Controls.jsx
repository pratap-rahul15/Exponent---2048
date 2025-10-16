import React from 'react';
import { FiArrowLeft, FiArrowRight, FiArrowUp, FiArrowDown } from 'react-icons/fi';


const btnBase =
  "rounded-full text-white shadow-lg ring-1 ring-white/10 " +
  "bg-gradient-to-br from-indigo-500 to-violet-600 " +
  "flex items-center justify-center " +
  "hover:scale-105 active:scale-95 transition-transform duration-150";

  // btnBase: Common button styles for the control buttons.
export default function Controls({ onMove }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex justify-center">
        <button
          aria-label="Move up"
          className={`${btnBase} w-16 h-16 sm:w-14 sm:h-14`}
          onClick={() => onMove('up')}
        >
          <FiArrowUp size={26} className="sm:hidden" />
          <FiArrowUp size={22} className="hidden sm:block" />
        </button>
      </div>
      <div className="flex gap-6 sm:gap-5">
        <button
          aria-label="Move left"
          className={`${btnBase} w-16 h-16 sm:w-14 sm:h-14`}
          onClick={() => onMove('left')}
        >
          <FiArrowLeft size={26} className="sm:hidden" />
          <FiArrowLeft size={22} className="hidden sm:block" />
        </button>
        <button
          aria-label="Move down"
          className={`${btnBase} w-16 h-16 sm:w-14 sm:h-14`}
          onClick={() => onMove('down')}
        >
          <FiArrowDown size={26} className="sm:hidden" />
          <FiArrowDown size={22} className="hidden sm:block" />
        </button>
        <button
          aria-label="Move right"
          className={`${btnBase} w-16 h-16 sm:w-14 sm:h-14`}
          onClick={() => onMove('right')}
        >
          <FiArrowRight size={26} className="sm:hidden" />
          <FiArrowRight size={22} className="hidden sm:block" />
        </button>
      </div>
      <div className="mt-1 text-xs text-slate-200"> </div>
    </div>
  );
}
