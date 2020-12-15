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
  console.log(event.path, script);
  const pen = `https://codepen.io/${script}.js`;
  // your server-side functionality
  return {
    statusCode: 200,
    headers:{
      'Content-Type':"application/javascript",
      'Access-Control-Allow-Origin':'*.cdpn.io',
    },
    body:`window.self = window.self || {};
import '${pen}';
const component = self.CodePenVueComponent
delete window.self;
export default component;`,
  };
}
