const rollup = require('rollup');
const VuePlugin = require('rollup-plugin-vue');
const path = require('path')

/**
 * @typedef {object} LambdaEvent
 * @property {object} queryStringParameters
 * @property {string} path
 */

/**
 *
 * @param {LambdaEvent} event
 * @param context
 * @returns {Promise<{headers: {'Content-Type': string, 'Access-Control-Allow-Origin':string}, body: string, statusCode: number}>}
 */
module.exports.handler = async function(event, context) {

  const bundle = await rollup.rollup({
    input: path.resolve(__dirname, 'main.js'),
    plugins:[VuePlugin()],
  });

  const {output} = await bundle.generate({
    format:"esm",
    globals:{'vue':'Vue'},
    name:"Component"
  });

  let component = '';

  for(const chunk of output){
    const code = chunk.code
        .replace(/import ({.*}) from 'vue'/, (_, ...args)=> `const ${args[0]} = Vue`);

    if (chunk.type !== 'asset') {
      component += code + '\r\n';
    }

  }

  bundle.close();

  return {
    statusCode: 200,
    headers:{
      'Content-Type':"text/html",
      'Access-Control-Allow-Origin':'https://cdpn.io',
    },
    body:`<html lang="en">
<head>
<title>A Vue Component</title>
<script src="https://unpkg.com/vue@3/dist/vue.runtime.global.js"></script>
</head>
<body>
<div id="app">test</div>
<script type="module">
${component}
const {createApp} = Vue;
createApp(Component).mount('#app');
</script>
</body>
</html>`,
  }
}
