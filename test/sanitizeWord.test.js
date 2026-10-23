import { describe, test, expect } from '@jest/globals';

import { sanitizeWord } from '../src/sanitizeWord';

describe('sanitizeWord', () => {
    describe('standard behavior', () => {
        test('returns a string', () => {
            const word = 'palavra';

            const result = sanitizeWord(word);

            expect(typeof result).toBe('string');
        });

        test('trims leading and trailing spaces', () => {
            const word = "  palavra   ";
            const expected = "palavra";

            const result = sanitizeWord(word);

            expect(result).toBe(expected);
        });

        test('converts to lowercase', () => {
            const word = "PaLaVrA";
            const expected = "palavra";

            const result = sanitizeWord(word);

            expect(result).toBe(expected);
        });

        test('preserves spaces between words', () => {
            const word = "palavra boa";
            const expected = "palavra boa";

            const result = sanitizeWord(word);

            expect(result).toBe(expected);
        });
    });

    describe('edge cases', () => {
        test('returns an empty string if given an empty string', () => {
            const emptyString = '';
            const expected = '';

            const result = sanitizeWord(emptyString);

            expect(result).toBe(expected);
        });
    });
});
