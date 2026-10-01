import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#111111', paper: '#F7F7F4', brand: '#6DBF41', muted: '#6B6B66', line: '#E6E6E0' },
      fontFamily: { display: ['Syne', 'system-ui', 'sans-serif'], sans: ['Outfit', 'system-ui', 'sans-serif'] },
      borderRadius: { xl2: '20px' },
    },
  },
  plugins: [],
};
export default config;
