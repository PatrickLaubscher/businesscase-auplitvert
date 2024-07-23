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
        },
        brown1: {
          var: '#2C0014'
        }
      } 
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

