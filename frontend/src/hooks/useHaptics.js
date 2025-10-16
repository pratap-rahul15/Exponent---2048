export default function useHaptics() {

    // Vibrate the device with the given pattern if it is supported.
  const vibrate = (pattern) => {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
    
    }
  };

  return {
    tap:   () => vibrate(10),                 
    move:  () => vibrate(8),                  
    merge: () => vibrate([6, 40, 12]),        
    win:   () => vibrate([12, 50, 12, 50, 20]), 
    error: () => vibrate([30, 40, 30]),       
  };
}
