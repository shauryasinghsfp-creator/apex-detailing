/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#09090B',
        slateDark: '#121214',
        panel: '#17171A',
        gold: '#D4AF37',
        goldSoft: '#E6C96E',
        guards: '#D1121D',
        glass: 'rgba(255, 255, 255, 0.08)',
        muted: '#8A8A93',
        bone: '#EDEDEF',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        heading: ['Syne', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glowGold: '0 0 40px rgba(212, 175, 55, 0.18)',
        card: '0 20px 60px rgba(0, 0, 0, 0.55)',
        hairline: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      transitionTimingFunction: {
        mechanical: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        snappy: '180ms',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite',
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
