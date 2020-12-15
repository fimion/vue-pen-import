/**
 * @typedef {object} LambdaEvent
 * @property {object} queryStringParameters
 */

/**
 *
 * @param {LambdaEvent} event
 * @param context
 * @returns {Promise<{headers: {contentType: string}, body: string, statusCode: number}>}
 */
module.exports.handler = async function(event, context) {
  const script = event.queryStringParameters.script
  const pen = `https://codepen.io/${script}.js`;
  // your server-side functionality
  return {
    statusCode: 200,
    headers:{contentType:"application/javascript"},
    body:`window.self = window.self || {};
import '${pen}';
const component = self.CodePenVueComponent
export default component;`,
  };
}
