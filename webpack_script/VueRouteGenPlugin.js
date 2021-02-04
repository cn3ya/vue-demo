const util = require('util')
const fs = require('fs')
const ejs = require('ejs')
const _ = require('lodash')

// A JavaScript class.
class VueRouteGenPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // for(var hook of Object.keys(compiler.hooks)){            
    //     console.log(hook);
    // }
    const pages = fs.readdirSync('./src/pages')
    let pageObjs = []
    pages.forEach((page)=> pageObjs.push({
      page: page,
      path: _.kebabCase(page.replace('.vue','')),
      pageName: page.replace('.vue','')
    }))
    const result = ejs.render(`/* eslint-disable */
export default [
  <% pages.forEach(function(page){ %>{
    path: "/<%= page.path %>",
    name: "<%= page.pageName %>",
    component: () => import("../src/pages/<%= page.page %>")
  }<% }); %>
];
`,{pages:pageObjs})
    fs.writeFileSync('./generated_src/router.js', result);
    // // Specify the event hook to attach to
    // compiler.hooks.beforeRun.tap(
    //   'VueRouteGenPlugin',
    //   (compilation, callback) => {
    //     console.log('This is an example plugin!');
    //     // fs.writeFileSync('./build_config.txt', util.inspect(compiler.options,{depth:5}));
    //     console.log('Here’s the `compilation` object which represents a single build of assets:');

    //     // Manipulate the build using the plugin API provided by webpack
    //     // compilation.addModule(/* ... */);

    //     // callback();
    //   }
    // );
  }
}

module.exports = VueRouteGenPlugin;
