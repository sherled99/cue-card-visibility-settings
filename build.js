const fs = require('fs-extra');
const concat = require('concat');
const componentPath = './dist/cue-card-trigger-synonyms/angular-trigger-synonyms-component.js';
 
(async function build() {
   const files = [
      './dist/cue-card-trigger-synonyms/runtime.js',
      './dist/cue-card-trigger-synonyms/polyfills.js',
      './dist/cue-card-trigger-synonyms/main.js',
   ].filter((x) => fs.pathExistsSync(x));
   await fs.ensureFile(componentPath);
   await concat(files, componentPath);
})();