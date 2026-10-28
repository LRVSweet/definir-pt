/**
 * Coordinates actions to fetch the definition of a word.
 * @param {string} word - The word to define.
 * @param {Object} deps - Optional - Dependencies to inject for testing.
 * @returns {Promise<string>}
 * @async
 * @private
 */
export async function _fetchDefinition(word, deps = {}) {

}

//=============================================================================
//GET DEFINITION
//=============================================================================

/**
 * @typedef {Object} GetDefinitionDependencies
 * @property {typeof fetch} fetchFn - A fetch-compatible function for making HTTP requests.
 * @property {URL} targetUrl - The URL endpoint to fetch the definition from.
 */

/**
 * The default dependencies for _getDefinition.
 * @type {GetDefinitionDependencies}
 */
const DEFAULT_GET_DEFINITION_DEPS = {
    fetchFn: fetch,
    targetUrl: new URL('https://api.dicionario-aberto.net/')
};

/**
 * Fetches the definition of a word from the dicionario aberto API.
 * @param {string} word - The word to define.
 * @param {GetDefinitionDependencies} deps - Optional - Dependencies to inject for testing.
 * @returns {Promise<string>}
 * @async
 * @private
 */
export async function _getDefinition(word, deps = DEFAULT_GET_DEFINITION_DEPS) {
    const { fetchFn, targetUrl } = deps;
    const response = await _getDefinitionFromDictionary(word, targetUrl, fetchFn);
    _validateResponse(response, word);
    return await response.json();
}

//-----------------------------------------------------------------------------
//Get Definition Helpers
//-----------------------------------------------------------------------------

async function _getDefinitionFromDictionary(word, targetUrl, fetchFn) {
    const urlForDefinition = new URL(word, targetUrl);

    return await fetchFn(urlForDefinition);
}

function _validateResponse(response, word) {
    if (!response.ok) {
        throw new Error(`Failed to fetch definition for word ${word}`);
    }
}

//=============================================================================
//PARSE RESPONSE
//=============================================================================

/**
 * Parses the response from the dicionario aberto.
 * @param {Object} response - The response from the dicionario aberto API.
 * @param {Object} deps - Optional dependencies to inject for testing.
 * @returns {string} - The parsed definition.
 * @private
 */
export function _parseResponse(response) {

}


