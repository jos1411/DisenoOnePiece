/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        grandline: {
          950: '#060913',
          900: '#0c1222',
          850: '#101930',
          800: '#172342',
          700: '#233560',
          600: '#324a82',
        },
        pirate: {
          gold: '#e5a93b',
          'gold-light': '#fcd34d',
          'gold-dark': '#b47818',
          crimson: '#e63946',
          'crimson-dark': '#9b1c26',
          parchment: '#eed9b3',
          'parchment-dark': '#caa979',
          navy: '#0c1222',
          purple: '#7c3aed',
          rose: '#f43f5e',
        },
      },
      fontFamily: {
        display: ['"Russo One"', '"Cinzel"', 'sans-serif'],
        pirate: ['"Cinzel Decorative"', 'serif'],
        body: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        wanted: ['"Russo One"', 'Impact', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(229,169,59,0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(229,169,59,0.7))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'pirate-card': '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(229, 169, 59, 0.15)',
        'pirate-gold': '0 0 25px rgba(229, 169, 59, 0.4)',
        'pirate-crimson': '0 0 25px rgba(230, 57, 70, 0.4)',
      },
    },
  },
  plugins: [],
};
