/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#eae6f2',
      'black-bg': '#131214',
      'black-fg': '#1d1c1f',
      'outline': '#3e3d40'

    },
    extend: {},
  },
  plugins: [],
}