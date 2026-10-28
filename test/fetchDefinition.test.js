import { describe, test, expect, jest } from '@jest/globals';

import { _fetchDefinition, _getDefinition, _parseResponse } from '../src/fetchDefinition.js';

describe("_fetchDefintion", () => {

});

describe("_getDefinition", () => {
    let word, defineWordUrl, mockResponseJson, mockJsonMethod, mockFetch, mockResponse, mockJson, testDeps;

    beforeEach(() => {
        word = "palavra";

        defineWordUrl = new URL("DEFINE_WORD_URL/");

        mockResponseJson = { id: "RESPONSE_JSON" };

        mockJsonMethod = jest.fn().mockReturnValue(mockResponseJson);

        mockFetch = jest.fn().mockReturnValue(mockResponse);

        mockResponse = {
            ok: true,
            json: mockJsonMethod
        };

        testDeps = {
            fetchFn: mockFetch,
            targetUrl: defineWordUrl
        };
    });

    describe("standard behavior", () => {
        test("calls the fetchFn exactly once", async () => {
            await _getDefinition(word, testDeps);

            expect(mockFetch).toHaveBeenCalledTimes(1);
        });

        test("calls the fetchFn with the correct path", async () => {
            const expectedPath = `${defineWordUrl}/${word}`;

            await _getDefinition(word, testDeps);

            expect(mockFetch).toHaveBeenCalledWith(expectedPath);
        });

        test("calls the json() method on the response exactly once", async () => {
            await _getDefinition(word, testDeps);

            expect(mockJsonMethod).toHaveBeenCalledTimes(1);
        });

        test("returns the json-ified response", async () => {
            expect(await _getDefinition(word, testDeps)).toBe(mockResponseJson);
        });
    });

    describe("edge cases", () => {
        test("does not throw if the json-ified response is empty", async () => {
            mockJsonMethod.mockReturnValue(undefined);

            expect(async () => await _getDefinition(word, testDeps)).not.toThrow();
        });
    });

    describe("error handling", () => {
        test("throws if response.ok is false", async () => {
            mockResponse.ok = false;

            expect(async () => await _getDefinition(word, testDeps)).toThrow();
        });

        test("bubbles up errors from fetchFn", () => {
            const mockErr = new Error("FETCH_ERR");

            mockFetch.mockImplementation(() => {
                throw mockErr;
            });

            expect(() => _getDefinition(word, testDeps)).toThrow(mockErr);
        });
    });
});

describe("_parseResponse", () => {

});
