/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        muted: '#525252',
        subtle: '#737373',
        line: '#E5E5E5',
        surface: '#FAFAFA',
        burgundy: {
          DEFAULT: '#7A0C16',
          dark: '#5C0910',
          soft: '#FDF2F3',
        },
        gold: {
          DEFAULT: '#B58E2D',
          soft: '#FBF7EB',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
