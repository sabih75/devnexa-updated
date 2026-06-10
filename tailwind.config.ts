import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      colors: {
        brand: {
          orange:  '#f97316',
          'orange-light': '#fb923c',
          purple:  '#7c3aed',
          'purple-mid': '#a78bfa',
          deep:    '#190066',
          surface: '#080810',
        },
      },
      animation: {
        'spin-slow':   'spin 20s linear infinite',
        'spin-medium': 'spin 14s linear infinite reverse',
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulse-glow 2.2s ease-in-out infinite',
      },
      backgroundSize: {
        '300%': '300%',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
      },
    },
  },
  plugins: [],
}
export default config
