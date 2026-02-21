function checkIfPangram(sentence: string): boolean {
    const fullCount = 26
    const m = new Set()
    
    for (let i = 0; i < sentence.length; i++) {
        m.add(sentence[i])        
    }
    
    return m.size === fullCount
};

console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog"));
console.log(checkIfPangram("leetcode"));