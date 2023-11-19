/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './views/**/*.{ejs,html}',
        "./node_modules/flowbite/**/*.js"
    ],
    darkMode: 'class',
    theme: {
        extend: {
       
    }
    },
    plugins: [
          require('flowbite/plugin')
    ],
};
