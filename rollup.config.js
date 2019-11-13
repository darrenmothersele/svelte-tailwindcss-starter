import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH || process.env.PRODUCTION;

// Used by watch/dev
import * as child_process from 'child_process';
let running_dev_server = false;
function writeBundle() {
  if (!running_dev_server) {
    running_dev_server = true;
    child_process.spawn('npm', ['run', 'start:dev'], { stdio: ['ignore', 'inherit', 'inherit'], shell: true });
  }
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      dev: !production,
      emitCss: true
    }),

    copy({
      targets: [
        { src: 'src/assets', dest: 'public/' },
        { src: 'src/index.html', dest: 'public/' },
      ]
    }),

    postcss({
      extract: true
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),

    // In dev mode, call `npm run start:dev` once
    // the bundle has been generated
    !production && writeBundle(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
