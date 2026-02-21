const INT32_MAX = 2 ** 31 - 1;
const INT32_MIN = -(2 ** 31);

/**
 * Reverse integer digits. Returns 0 if the result would overflow 32-bit signed range.
 * Classic approach: repeatedly "pop" the last digit (x % 10) and "push" onto result (result * 10 + digit).
 * Overflow: check before growing result, using integer thresholds (no log10 or float).
 */
function reverse(x: number): number {
  let n = Math.abs(x);
  let result = 0;

  while (n > 0) {
    const digit = n % 10;
    n = Math.floor(n / 10);

    // Positive result must stay <= INT32_MAX. So result * 10 + digit <= INT32_MAX
    // => result <= (INT32_MAX - digit) / 10. Use integer check without floating point.
    const maxAllowed = x < 0
      ? Math.floor((-(INT32_MIN) - digit) / 10)  // for negative: result <= 2^31, so (2^31 - digit) / 10
      : Math.floor((INT32_MAX - digit) / 10);

    if (result > maxAllowed) return 0;
    result = result * 10 + digit;
  }

  return x < 0 ? -result : result;
}

console.log(reverse(0));
console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));
console.log(reverse(1534236469));  // overflow -> 0
console.log(reverse(-2147483648)); // -8463847412 reversed = -2147483648, valid
