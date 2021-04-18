/**
 * @typedef {object} LambdaEvent
 * @property {object} queryStringParameters
 * @property {string} path
 */

/**
 *
 * @param {LambdaEvent} event
 * @param context
 * @returns {Promise<{headers: {contentType: string}, body: string, statusCode: number}>}
 */
module.exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body:JSON.stringify(event.queryStringParameters),
  };
}
