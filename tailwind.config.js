/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    './core/theme/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  important: "#__next",
  theme: {
    extend: {},
  },
  plugins: [],
}
