function sortedSquares(nums: number[]): number[] {
    
    const arr = Array(nums.length).fill(undefined)
    let i = 0, j = nums.length - 1
    for (let p = nums.length-1; p >= 0; p--) {
        const ni = Math.abs(nums[i])
        const nj = Math.abs(nums[j])
        
        if (ni > nj) {
            arr[p] = ni * ni
            i++
        } else {
            arr[p] = nj * nj
            j--
        }
    }
    
    return arr
};

console.log(sortedSquares([-4,-1,0,3,10]));