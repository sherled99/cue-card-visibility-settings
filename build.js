const fs = require('fs-extra');
const concat = require('concat');
const componentPath = './dist/angular-chat-ui/angular-chat-component.js';
 
(async function build() {
   const files = [
      './dist/angular-chat-ui/runtime.js',
      './dist/angular-chat-ui/polyfills.js',
      './dist/angular-chat-ui/main.js',
   ].filter((x) => fs.pathExistsSync(x));
   await fs.ensureFile(componentPath);
   await concat(files, componentPath);
})();