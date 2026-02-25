function debounce(func: () => void, wait: number) {
    const useThis = this;
    let debounceBackoff = false;
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (!debounceBackoff) {
        debounceBackoff = true;
        const result = func.apply(useThis, []);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          debounceBackoff = false;
        }, wait);
        return result
      }
    };
  }
  
  let i = 0;
  function increment() {
    i++;
  }
  const debouncedIncrement = debounce(increment, 100);
  
  // t = 0: Call debouncedIncrement().
  debouncedIncrement(); // i = 0
  console.log(i);
  
  await new Promise(resolve => setTimeout(resolve, 200));

  // t = 50: i is still 0 because 100ms have not passed.
  //  Call debouncedIncrement() again.
  debouncedIncrement(); // i = 0
  console.log(i);


// Alternative for comparison: true trailing-edge debounce.
// It waits until calls stop for `wait` ms, then runs once with the latest args/this.
function debounceTrailing<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return debounced as ((this: ThisParameterType<T>, ...args: Parameters<T>) => void) & {
    cancel: () => void;
  };
}

// Example usage of the trailing version:
let j = 0;
function incrementTrailing() {
  j++;
}
const trailingDebouncedIncrement = debounceTrailing(incrementTrailing, 100);
trailingDebouncedIncrement();
trailingDebouncedIncrement();
trailingDebouncedIncrement();
console.log("j immediately after burst:", j); // 0

await new Promise(resolve => setTimeout(resolve, 150));
console.log("j after 150ms:", j); // 1

export {};
  