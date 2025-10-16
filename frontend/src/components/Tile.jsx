import React from 'react';
import { motion } from 'framer-motion';

export default function Tile({ value, isNew = false, isMerged = false }) {
  const valueClass = `tile-${value}`; 

  // Initial animation state
  const initial = isNew ? { scale: 0.6, opacity: 0 } : { scale: 0.98, opacity: 0.95 };

  // Animation for when the tile is merged or just appears.
  const animate = isMerged
    ? { scale: [1, 1.12, 1], opacity: 1 }
    : { scale: 1, opacity: 1 };

  // Different transition styles for new and merged tiles.
  const transition = isMerged
    ? { type: 'tween', duration: 0.25, ease: 'easeOut' }
    : { type: 'spring', stiffness: 450, damping: 22 };

    // Render the tile with animations and appropriate styles.
  return (
    <motion.div
      layout
      initial={initial}
      animate={animate}
      transition={transition}
      className={`${valueClass} tile`}
      style={{ width: '100%', height: '100%' }}
      aria-label={`Tile ${value}`}
    >
      <div className="text-center w-full select-none">{value}</div>
    </motion.div>
  );
}
