/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      sm: '12px',
      base: '14px',
      xl: '16px',
      '1.5xl': '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '46px',
      '5xl': '52px',
    }
  },
  plugins: [],
}