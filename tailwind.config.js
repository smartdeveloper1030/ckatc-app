/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aptos', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        },
        slideDown: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '1000px', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        pulse: 'pulse 2s infinite',
        shimmer: 'shimmer 2s infinite linear'
      }
    },
  },
  plugins: [],
};