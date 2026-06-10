import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: '#FAFCFA',
          100: '#EAF6EE',
          200: '#CFEAD6',
          300: '#A8D5BA',
          700: '#5E7465',
          900: '#24332A',
        },
      },
      boxShadow: {
        soft: '0 18px 50px rgba(36, 51, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
