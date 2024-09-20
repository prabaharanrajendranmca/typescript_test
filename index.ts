export function checkNumberPadding(intStrs: string[]): number {
    // Return 0 for empty input
    if (intStrs.length === 0) return 0;

    // Extract the length of each string
    const lengths = intStrs.map(s => s.length);

    // Extract number of leading zeros for each string
    const leadingZeros = intStrs.map(s => s.match(/^0+/)?.[0]?.length || 0);

    // Determine minimum and maximum observed length
    const minLen = Math.min(...lengths);
    const maxLen = Math.max(...lengths);

    // Case: No leading zeros at all, handle unpadded numbers
    if (leadingZeros.every(z => z === 0)) {
        // If all strings have the same length, return 1 (no padding)
        if (minLen === maxLen) {
            return 1;
        } else {
            // If string lengths vary and increase progressively, return negative min length (inconclusive)
            return -minLen;
        }
    }

    // Check for consistent padding length
    const firstLeadingZeros = leadingZeros[0];

    for (let i = 1; i < intStrs.length; i++) {
        const currentLeadingZeros = leadingZeros[i];

        // If leading zeros differ, return -1 (inconsistent padding)
        if (firstLeadingZeros !== currentLeadingZeros && currentLeadingZeros !== 0) {
            return -1;
        }
    }

    // If padding is consistent, return the expected padded length
    if (minLen === maxLen) {
        return maxLen;
    } else if (maxLen > minLen) {
        // If some strings overflow the padding but others are padded consistently
        return minLen;
    }

    // Default case, return negative minimum observed length when inconclusive
    return -minLen;
}

// Test cases

console.log("Test case 1:", checkNumberPadding(["001", "002"])); // Expected: 3
console.log("Test case 2:", checkNumberPadding(["001", "002", "9999"])); // Expected: 3
console.log("Test case 3:", checkNumberPadding(["01", "2", "999"])); // Expected: 1
console.log("Test case 6:", checkNumberPadding(["999", "9999"])); // Expected: -3
console.log("Test case 5:", checkNumberPadding(["99", "999", "9999"])); // Expected: -2
console.log("Test case 4:", checkNumberPadding(["01", "002"])); // Expected: -1
console.log("Test case 7:", checkNumberPadding([])); // Expected: 0
