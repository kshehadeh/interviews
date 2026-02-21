
function reverse(x: number): number {
    if (Math.abs(x) < 10) {
        return x
    }

    let newNumber = 0
    const lowestSig = 1
    const highestSig = Math.pow(10, Math.floor(Math.log10(Math.abs(x))))
    let sigBackward = highestSig
    let sigForward = lowestSig
    let num = Math.abs(x)
    while (sigBackward >= 1) {
        // Get the last digit in the number so far
        const digit = Math.floor(num/sigForward)%10 // 12345 with sigForward of 10 = 4
        newNumber += (digit*sigBackward) // 4 * 100 = 400, for example
        sigForward *= 10 // goes from 10 => 100 for example
        sigBackward /= 10 // goest from 1000 => 100 for example
    }
    
    if (newNumber > Math.pow(2,32)/2) {
        return 0
    }
    return x < 0 ? -1*newNumber : newNumber
}

console.log(reverse(0));
console.log(reverse(1000000000000000000));
console.log(reverse (123));
console.log(reverse(-123));
