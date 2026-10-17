import { define } from '../src/define.js';

describe('define', () => {
    let word, sanitizerStub, fetchDefinitionStub, parseDefinitionStub, stubbedDeps;

    beforeEach(() => {
        word = 'palavra';

        sanitizerStub = jest.fn();
        fetchDefinitionStub = jest.fn();
        parseDefinitionStub = jest.fn();

        stubbedDeps = {
            sanitizeWord: sanitizerStub,
            fetchDefinition: fetchDefinitionStub,
            parseDefinition: parseDefinitionStub
        };
    });

    describe('normal behavior', () => {
        test('returns a string', () => {
            const result = define(word);

            expect(word).toBeInstanceOf(string);
        });

        test('calls the sanitize collaborator with the word parameter', () => {

        });

        test('calls the fetchDefinition collaborator with the sanitized word', () => {

        });

        test('calls the parseDefinition collaborator with the raw definition', () => {

        });

        test('returns the parsed definition', () => {

        });
    });

    describe('edge cases', () => {
        test('returns null if fetchDefinition returns an empty array', () => {

        });
    });

    describe('error handling', () => {
        test('bubbles up errors from the sanitize collaborator as defineWordSanitizationError', () => {

        });

        test('bubbles up errors from the fetchDefinition collaborator as defineWordFetchError', () => {

        });

        test('bubbles up errors from the pardeDefinition collaborator as defineWordParseError', () => {

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


