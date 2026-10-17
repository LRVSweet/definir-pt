const DEFAULT_DEPS = {
    sanitizeFn: null,
    fetchDefinitionFn: null,
    parseDefinitionFn: null
};

/**
 * returns the definition of a word.
 * @param {string} word - a single word to define.
 * @param {object} deps - dependencies to inject.
 * @returns {string | null} - the definition of the word, or null if no definition is found.
 * 
 * the 'word' parameter need not be trimmed and may be passed in any case.
 */
export async function define(word, deps) {
    const { sanitizeFn, fetchDefinitionFn, parseDefinitionFn } = deps || DEFAULT_DEPS;
    const sanitizedWord = sanitizeFn(word);
    const rawDefinition = await fetchDefinitionFn(sanitizedWord);

    if (!rawDefinition || rawDefinition.length === 0) {
        return null;
    }

    const parsedDefinition = parseDefinitionFn(rawDefinition);

    return parsedDefinition;
}
