/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dhl: {
          red: '#D40511',
          'red-dark': '#b0040e',
          yellow: '#FFCC00',
          'yellow-dark': '#e6b800',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        in: 'in 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in-from-bottom-8': 'slideInFromBottom 0.5s ease-out',
        'slide-in-from-right-12': 'slideInFromRight 0.5s ease-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
      },
      keyframes: {
        in: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(48px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
