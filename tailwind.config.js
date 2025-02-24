/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    main: '#A5252C',
                    dark: '#83151B',
                    light: '#C2434A',
                },
            },
        },
    },
    plugins: [],
};
