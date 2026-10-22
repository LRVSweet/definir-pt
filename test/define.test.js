import { define } from '../src/define.js';
import '@jest/globals';

describe('define', () => {
    let word,
        sanitizedWord,
        rawDefinition,
        parsedDefinition,
        sanitizerStub,
        fetchDefinitionStub,
        parseDefinitionStub,
        stubbedDeps;

    beforeEach(() => {
        word = 'palavra';
        sanitizedWord = 'palavra_sanitized';
        rawDefinition = { id: 'raw_definition' };
        parsedDefinition = 'parsed_definition';

        sanitizerStub = jest.fn().mockReturnValue('palavra_sanitized');
        fetchDefinitionStub = jest.fn().mockResolvedValue(rawDefinition);
        parseDefinitionStub = jest.fn().mockReturnValue(parsedDefinition);

        stubbedDeps = {
            sanitizeFn: sanitizerStub,
            fetchDefinitionFn: fetchDefinitionStub,
            parseDefinitionFn: parseDefinitionStub
        };
    });

    describe('normal behavior', () => {
        test('returns a string', async () => {
            const result = await define(word, stubbedDeps);

            expect(typeof result).toEqual('string');
        });

        test('calls the sanitize collaborator with the word parameter', async () => {
            await define(word, stubbedDeps);

            expect(sanitizerStub).toHaveBeenCalledWith(word);
        });

        test('calls the fetchDefinition collaborator with the sanitized word', async () => {
            await define(word, stubbedDeps);

            expect(fetchDefinitionStub).toHaveBeenCalledWith(sanitizedWord)
        });

        test('calls the parseDefinition collaborator with the raw definition', async () => {
            await define(word, stubbedDeps);

            expect(parseDefinitionStub).toHaveBeenCalledWith(rawDefinition);
        });

        test('returns the parsed definition', async () => {
            const result = await define(word, stubbedDeps);

            expect(result).toEqual(parsedDefinition);
        });
    });

    describe('edge cases', () => {
        test('returns null if fetchDefinition returns an empty array', async () => {
            fetchDefinitionStub.mockResolvedValue([]);

            const result = await define(word, stubbedDeps);

            expect(result).toBeNull();
        });
    });

    describe('error handling', () => {
        let mockError;

        beforeEach(() => {
            mockError = new Error('MOCK_ERROR');
        });

        test('bubbles up errors from the sanitize collaborator', async () => {
            sanitizerStub.mockImplementation(() => {
                throw mockError;
            });

            await expect(() => define(word, stubbedDeps)).rejects.toThrow(mockError);
        });

        test('bubbles up errors from the fetchDefinition collaborator', async () => {
            fetchDefinitionStub.mockRejectedValue(mockError);

            await expect(() => define(word, stubbedDeps)).rejects.toThrow(mockError);
        });

        test('bubbles up errors from the parseDefinition collaborator', async () => {
            parseDefinitionStub.mockImplementation(() => {
                throw mockError;
            });

            await expect(() => define(word, stubbedDeps)).rejects.toThrow(mockError);
        });
    });
});

/**
 * Responsibilities:
 * - Hides how definitions are obtained.
 * 
 * Internal design decisions / decisions likely to change:
 * - What cleaning / sanitization is applied to `word` before fetching the definition
 * - How the raw definition is fetched
 * - How the raw definition is parsed
 */


