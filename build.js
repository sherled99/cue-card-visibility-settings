const fs = require('fs-extra');
const concat = require('concat');
const componentPath = './dist/cue-card-visibility-settings/angular-visibility-settings-component.js';
 
(async function build() {
   const files = [
      './dist/cue-card-visibility-settings/runtime.js',
      './dist/cue-card-visibility-settings/polyfills.js',
      './dist/cue-card-visibility-settings/main.js',
   ].filter((x) => fs.pathExistsSync(x));
   await fs.ensureFile(componentPath);
   await concat(files, componentPath);
})();