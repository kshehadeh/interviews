function countCharacters(string: string, character: string) {
    const count = string.match(new RegExp(character, 'g'))?.length || 0;
    return count;
}

function objectify(string: string) {
    return string.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {} as Record<string, number>)
}

function testSegment(segment: string, required: string) {
    const found = objectify(required);
    Object.keys(found).forEach(char => {
        found[char] -= countCharacters(segment, char);
    });
    return Object.values(found).every(count => count <= 0);
}

function minWindow(text: string, required: string): string {
    let left = 0;
    let right = 0;
    let minLength = Infinity;
    let minStart = 0;

    while (right < text.length) {
        if (testSegment(text.slice(left, right + 1), required)) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }
            left++;
        } else {
            right++;
        }
    }

    return minLength === Infinity ? '' : text.slice(minStart, minStart + minLength);
}

