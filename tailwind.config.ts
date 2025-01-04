import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
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
        'spin-slow': 'spin-slow 5s linear infinite',
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
    // Add more patterns as needed
  ],
} satisfies Config;
