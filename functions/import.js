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
  const script = event.path.slice('/import/'.length,event.path.length);
  const pen = `https://codepen.io/${script}.js`;
  // your server-side functionality
  return {
    statusCode: 200,
    headers:{
      'Content-Type':"application/javascript",
      'Access-Control-Allow-Origin':'https://cdpn.io',
    },
    body:`const old = self.CodePenVueComponent;
import '${pen}';
const component = self.CodePenVueComponent
self.CodePenVueComponent = old;
export default component;`,
  };
}
