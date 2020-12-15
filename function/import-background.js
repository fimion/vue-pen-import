module.exports.handler = async function(event, context) {
  // your server-side functionality
  return {
    statusCode: 200,
    headers:{contentType:"application/javascript"},
    body:`
      export default {};
    `,
  };
}
