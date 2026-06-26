/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#0a0a0f',
          secondary: '#111118',
          tertiary: '#1a1a24',
        },
        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          danger: '#ef4444',
          warning: '#f59e0b',
          success: '#10b981',
          roast: '#f97316',
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up-fade': 'slideUpFade 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'spotlight': 'spotlight 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.6))' },
          '50%': { filter: 'drop-shadow(0 0 18px rgba(139,92,246,0.9))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        slideUpFade: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spotlight: {
          '0%, 100%': { transform: 'translate(-10%, -10%)' },
          '50%': { transform: 'translate(10%, 10%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
