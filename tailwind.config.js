/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodoni_moda: ['Bodoni Moda', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        rowdies: ['Rowdies', 'serif'],
        workbench: ['Workbench', 'monospace'],
        jersey15: ['Jersey 15', 'sans-serif'],
        playwrite_australia: ['Playwrite AU SA', 'sans-serif'],
        caveat: ['Caveat', 'serif'],
        EB_Garamond: ['EB Garamond', 'serif'],
        arvo: ['Arvo', 'serif'],
      },
    },
  },
  plugins: [],
}