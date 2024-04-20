/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
    animation: {
        'slide-right': 'slide-right 0.3s ease-out',
        'slide-left': 'slide-left 0.3s ease-out',
      },
    keyframes: {
        'slide-right': {
            '0%': {transform: 'translateX(100%)'},
            '100%': {transform: 'translateX(0)'},
        },
        'slide-left': {
            '0%': {transform: 'translateX(0)'},
            '100%': {transform: 'translateX(-100%)'},
        },
    },
  plugins: [
      require('@tailwindcss/forms'),
  ],
};
