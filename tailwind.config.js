/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: [
        './views/**/*.{ejs,html}',
    ],
    darkMode: 'class',
    theme : {
        extend : {
            colors : {
                whiteish: '#FFFFFF',
                limeGreen: '#BADC66',
                sun: '#FEE791',
                bloo: '#105157',
                peach: '#FFBBAC',
                darkerPeach: '#ff9a83'
            }
        }
    },
    plugins: [
    ],
};
