import 'whatwg-fetch'

const STATUS_CODES = {
  multipleChoices: 300,
  noContent: 204,
  ok: 200,
  resetContent: 205
}

const defaultOptions = {
  mode: 'cors'
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
const parseJSON = response => response.json().catch(() => null)

/**
 * Reads the text returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {string}          The USVString object (text) from the request
 */
const getText = response => response.text().catch(() => null)

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = async response => {
  if (
    response.status >= STATUS_CODES.ok &&
    response.status < STATUS_CODES.multipleChoices
  ) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  error.body = await parseJSON(response)
  throw error
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {string}           The USVString object (text) from the request
 */
const requestText = (url, options) =>
  fetch(url, {...defaultOptions, ...options})
    .then(checkStatus)
    .then(getText)

export {getText, requestText}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, {...defaultOptions, ...options})
    .then(checkStatus)
    .then(parseJSON)
}
