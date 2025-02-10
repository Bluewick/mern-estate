/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        '600': '600px',
      },
      backdropBlur: {
        '2xl': '40px',
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ['responsive'],
    },
  },
  plugins: [],
};
