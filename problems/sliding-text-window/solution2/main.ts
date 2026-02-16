function minWindow(text: string, required: string): string {
    if (required.length === 0) return "";
  
    const need: Record<string, number> = {};
    for (const ch of required) need[ch] = (need[ch] ?? 0) + 1;
  
    let missing = required.length; // total characters still missing (including duplicates)
    let left = 0;
  
    let bestStart = 0;
    let bestLen = Infinity;
  
    for (let right = 0; right < text.length; right++) {
      const ch = text[right];
  
      if (need[ch] !== undefined) {
        if (need[ch] > 0) missing--;
        need[ch]--;
      }
  
      // when missing == 0, window is valid; try shrinking from the left
      while (missing === 0) {
        const windowLen = right - left + 1;
        if (windowLen < bestLen) {
          bestLen = windowLen;
          bestStart = left;
        }
  
        const leftCh = text[left];
        if (need[leftCh] !== undefined) {
          need[leftCh]++;
          if (need[leftCh] > 0) missing++; // we now miss one required char
        }
        left++;
      }
    }
  
    return bestLen === Infinity ? "" : text.slice(bestStart, bestStart + bestLen);
  }

console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
