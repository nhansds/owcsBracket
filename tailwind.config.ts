import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './app/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#ff5470',
          100: '#ffd3dd',
          200: '#ff99b3',
          300: '#ff6f95',
          400: '#ff5470',
          500: '#fe3760'
        },
        secondary: {
          DEFAULT: '#6dd6ff',
          100: '#e5f9ff',
          200: '#c2f0ff',
          300: '#8de1ff',
          400: '#6dd6ff',
          500: '#38c5ff'
        },
        panel: '#111320',
        stroke: '#1f2333'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: [forms]
} satisfies Config

