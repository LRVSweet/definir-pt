import { _fetchDefinition } from './fetchDefinition.js';

const DEFAULT_DEPS = {
    sanitizeFn: null,
    fetchDefinitionFn: _fetchDefinition,
    formatDefinitionFn: null
};

/**
 * @typedef {Object} Definition
 * @property {string} word - The word that is defined.
 * @property {string} gender - The gender of the word that is defined.
 * @property {string} partOfSpeech - The part of speech of the word.
 * @property {string} definition - The definition of the word.
 */

/**
 * returns the definition of a word.
 * @param {string} word - a single word to define.
 * @param {object} deps - dependencies to inject.
 * @returns {Promise<string | null>} - the definition of the word, or null if no definition is found.
 * 
 * the 'word' parameter need not be trimmed and may be passed in any case.
 */
export async function define(word, deps) {
    const { sanitizeFn, fetchDefinitionFn, formatDefinitionFn } = deps || DEFAULT_DEPS;
    const sanitizedWord = sanitizeFn(word);
    const definition = await fetchDefinitionFn(sanitizedWord);

    if (!definition || definition.length === 0) {
        return null;
    }

    const formattedDefinition = formatDefinitionFn(definition);

    return formattedDefinition;
}
