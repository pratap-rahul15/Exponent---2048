import { Howl } from 'howler';
import { useMemo } from 'react';

export default function useSounds() {
  // you can use small .mp3/.wav files placed in public/sounds/
  const sounds = useMemo(() => {
    const move = new Howl({ src: ['/sounds/move.mp3'], volume: 0.25 });
    const merge = new Howl({ src: ['/sounds/merge.mp3'], volume: 0.35 });
    return {
      playMove: () => { try { move.play(); } catch(e){} },
      playMerge: () => { try { merge.play(); } catch(e){} }
    };
  }, []);

  return sounds;
}
