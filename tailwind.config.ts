// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { tahoePreset } from '@tahoe-ui/tailwind-preset';

const config: Config = {
  // Use the Tahoe UI preset for theme CSS variable integration
  presets: [tahoePreset()],

  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Include packages for component scanning
    './packages/*/src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Legacy color references (for backwards compatibility during migration)
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // Legacy hardcoded colors (to be migrated to theme tokens)
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
          400: '#FACC15',
        },
        green: {
          500: '#10B981',
        },
        purple: {
          500: '#8B5CF6',
        },
        'apple-gray': {
          50: '#F5F5F5',
          100: '#E5E7EB',
        },
        'apple-green': {
          100: '#E6FFFA',
          500: '#34D399',
        },
      },

      dropShadow: {
        md: '0 4px 6px rgba(0, 0, 0, 0.05)',
      },

      fontFamily: {
        inter: ['Inter', ...fontFamily.sans],
        'roboto-mono': ['Roboto Mono', ...fontFamily.mono],
        'source-serif-pro': ['Source Serif Pro', ...fontFamily.serif],
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        serif: [...fontFamily.serif],
      },

      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scroll: {
          from: { transform: 'translateX(0);' },
          to: { transform: 'translateX(calc(-100% - 1rem));' },
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
        'loader-dash': {
          '0%': {
            strokeDasharray: '-129',
            strokeWidth: '2.5',
            fill: 'transparent',
          },
          '33%': {
            strokeDasharray: '129',
            strokeWidth: '2.5',
            fill: 'transparent',
          },
          '66%': {
            strokeDasharray: '129',
            strokeWidth: '0',
            fill: '#000000',
          },
        },
        'loader-grow': {
          '0%, 50%': { transform: 'translate3d(-50%, -50%, -1px) scale(1)' },
          '85%, 100%': {
            transform: 'translate3d(-50%, -50%, -1px) scale(100)',
          },
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
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        stripes: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 0' },
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
        'loader-dash':
          'loader-dash 2.5s cubic-bezier(.8, 0, .3, 1) alternate infinite',
        'loader-grow':
          'loader-grow 2.5s cubic-bezier(.8, 0, .3, 1) alternate infinite',
        'loader-slide': 'loader-slide 0.8s ease-in-out forwards',
        rotation: 'rotation 3s linear infinite',
        shake: 'shake 0.5s ease-in-out',
        bounce: 'bounce 1s infinite',
        shimmer: 'shimmer 2s linear infinite',
        stripes: 'stripes 1s linear infinite',
      },

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
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^border-/ },
    { pattern: /^shadow-/ },
    { pattern: /^rounded-/ },
    { pattern: /^flex-/ },
    { pattern: /^grid-/ },
    { pattern: /^gap-/ },
    { pattern: /^p-/ },
    { pattern: /^m-/ },
    { pattern: /^justify-/ },
    { pattern: /^items-/ },
    { pattern: /^flex-wrap-/ },
    { pattern: /^text-(blue|red|green|yellow|purple|pink|cyan|indigo)-500$/ },
    { pattern: /^bg-gradient-to-r$/ },
    { pattern: /^from-(blue|red|green|yellow|purple|pink|cyan|indigo)-400$/ },
    { pattern: /^to-(blue|red|green|yellow|purple|pink|cyan|indigo)-600$/ },
    { pattern: /^text-transparent$/ },
    { pattern: /^bg-clip-text$/ },
    { pattern: /^opacity-(10|20|30|40|50|60|70|80|90|100)$/ },
    // Safelist theme colors for dynamic usage
    { pattern: /^bg-brand-/ },
    { pattern: /^text-brand-/ },
    { pattern: /^border-brand-/ },
  ],
};

export default config;
