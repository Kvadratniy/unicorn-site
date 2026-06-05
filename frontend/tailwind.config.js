/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/composables/**/*.{js,ts}',
    './app/content/**/*.{json,js,ts}',
    './app/features/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/utils/**/*.{js,ts}',
    './app/widgets/**/*.vue',
    './app/app.vue',
    './app/error.vue',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
