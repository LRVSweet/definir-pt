/**
 * Sanitizes a word by trimming leading or trailing spaces and converting it to lower case.
 * @param {string} word - The word to sanitize.
 * @returns {string} - The sanitized word.
 */
export function sanitizeWord(word) {
    return word.trim().toLowerCase();
}
