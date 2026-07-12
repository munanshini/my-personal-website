import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3f0e9',
        ink: '#111111',
        signal: '#e44832',
      },
      maxWidth: {
        canvas: '1700px',
      },
    },
  },
  plugins: [],
} satisfies Config
