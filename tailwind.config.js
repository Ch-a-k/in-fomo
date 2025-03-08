/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5A00',
          light: '#FF7A30',
          dark: '#E05000',
        },
        dark: {
          bg: '#121212',
          surface: '#0f0f0f',
          border: '#2C2C2C',
        },
        light: {
          bg: '#FFFFFF',
          surface: '#F5F5F5',
          border: '#E0E0E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sofia Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
