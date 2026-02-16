# String / Sliding Window (Product FE vibe)

"You're building a search feature. We want to find the smallest snippet of text that contains all required keywords."

## Problem

Write a function:

function minWindow(text: string, required: string): string

Return the smallest substring of text that contains all characters from required including duplicates.
	•	If no such window exists, return ""
	•	Matching is case-sensitive
	•	required can contain repeated characters (e.g., "AABC" means you need 2 A's, 1 B, 1 C)

Example 1

`minWindow("ADOBECODEBANC", "ABC")  // "BANC"`

Example 2

`minWindow("a", "aa")              // ""`

Example 3

`minWindow("aaabdabcefaecbef", "abc") // "abc"`
