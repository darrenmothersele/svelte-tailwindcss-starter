const production = !process.env.ROLLUP_WATCH || process.env.PRODUCTION;

const tailwind = require('tailwindcss');
const cssNano = require('cssnano');
const autoprefixer = require('autoprefixer');
const purgeCSS = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.svelte',
    './src/**/*.html'
  ],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    tailwind,
    ...production ? [autoprefixer, purgeCSS, cssNano] : []
  ]
};
