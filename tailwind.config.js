/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          var: '#F2DC5D'
        }
      } 
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

