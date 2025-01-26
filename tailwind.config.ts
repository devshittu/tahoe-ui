import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // './manual-safelist.html',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        primary: '#333333',
        secondary: '#666666',
        accent: '#FF5733',
        blue: {
          500: '#3B82F6',
          400: '#60A5FA',
          600: '#2563EB',
        },
        red: {
          500: '#EF4444',
        },
        yellow: {
          100: '#FEF3C7',
          200: '#FDE68A',
        },
        green: {
          500: '#10B981',
        },
        purple: {
          500: '#8B5CF6',
        },
      },
      fontFamily: {
        // 'work-sans': ['"Work Sans"', 'sans-serif'],
        inter: ['Inter', ...fontFamily.sans],
        'roboto-mono': ['Roboto Mono', ...fontFamily.mono],
        'source-serif-pro': ['Source Serif Pro', ...fontFamily.serif],

        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scroll: {
          from: {
            transform: 'translateX(0);',
          },
          to: {
            transform: 'translateX(calc(-100% - 1rem));',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        drop: {
          '0%': { transform: 'translateY(0px)', opacity: '0' },
          '50%': { transform: 'translateY(50px)', opacity: '1' },
          '100%': { transform: 'translateY(100px)', opacity: '0.3' },
        },

        // New dash animation
        'loader-dash': {
          '0%': {
            strokeDasharray: '-129', //-700
            strokeWidth: '2.5',
            fill: 'transparent',
          },
          '33%': {
            strokeDasharray: '129', //700
            strokeWidth: '2.5',
            fill: 'transparent',
          },
          '66%': {
            strokeDasharray: '129', //700
            strokeWidth: '0',
            fill: '#000000',
          },
        },
        // New grow/shrink animation

        'loader-grow': {
          '0%, 50%': {
            transform: 'translate3d(-50%, -50%, -1px) scale(1)',
          },
          '85%, 100%': {
            transform: 'translate3d(-50%, -50%, -1px) scale(100)',
          }, // Adjusted for a more reasonable scale
        },
        'loader-slide': {
          '0%': { transform: 'translateY(50%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        scroll: 'scroll 10s linear infinite',
        'fade-in': 'fade-in 10s',
        blink: 'blink 2s ease-in-out infinite',
        flake1: 'drop 2.5s infinite linear forwards',
        flake2: 'drop 2.7s infinite linear forwards 0.2s',
        flake3: 'drop 2.9s infinite linear forwards 0.4s',
        flake4: 'drop 2.4s infinite linear forwards',
        flake5: 'drop 2.4s infinite linear forwards 1s',
        flake6: 'drop 2.2s infinite linear forwards 1.2s',
        flake7: 'drop 2.7s infinite linear forwards 1.2s',
        flake8: 'drop 3s infinite linear forwards 1.4s',
        // New dash animation
        'loader-dash':
          'loader-dash 2.5s cubic-bezier(.8, 0, .3, 1) alternate infinite',
        // New grow/shrink animation
        'loader-grow':
          'loader-grow  2.5s cubic-bezier(.8, 0, .3, 1) alternate infinite',
        'loader-slide': 'loader-slide 0.8s ease-in-out forwards',
        rotation: 'rotation 3s linear infinite',
        shake: 'shake 0.5s ease-in-out',
        bounce: 'bounce 1s infinite',
      },

      // Ensure zIndex includes necessary values (Tailwind has z-0 to z-50 by default)
      zIndex: {
        '10': '10',
        '20': '20',
        '30': '30',
      },
      borderRadius: {
        '15px': '15px',
      },
    },
  },

  safelist: [
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^text-/,
    },
    {
      pattern: /^border-/,
    },
    {
      pattern: /^shadow-/,
    },
    {
      pattern: /^rounded-/,
    },
    {
      pattern: /^flex-/,
    },
    {
      pattern: /^grid-/,
    },
    {
      pattern: /^gap-/,
    },
    {
      pattern: /^p-/,
    },
    {
      pattern: /^m-/,
    },
    {
      pattern: /^justify-/,
    },
    {
      pattern: /^items-/,
    },
    {
      pattern: /^flex-wrap-/,
    },

    {
      pattern: /^language-/,
    },
    {
      pattern: /^line-numbers/,
    },
    {
      pattern: /^prism-/,
    },

    {
      pattern: /^text-(blue|red|green|yellow|purple|pink|cyan|indigo)-500$/,
    },
    {
      pattern: /^bg-gradient-to-r$/,
    },
    {
      pattern: /^from-(blue|red|green|yellow|purple|pink|cyan|indigo)-400$/,
    },
    {
      pattern: /^to-(blue|red|green|yellow|purple|pink|cyan|indigo)-600$/,
    },
    {
      pattern: /^text-transparent$/,
    },
    {
      pattern: /^bg-clip-text$/,
    },
    {
      pattern: /^opacity-(10|20|30|40|50|60|70|80|90|100)$/,
    },
    // Add more patterns as needed
  ],
} satisfies Config;

// tailwind.config.ts
