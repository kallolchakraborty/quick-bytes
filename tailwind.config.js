module.exports = {
  content: ["./index.html", "./docs.html", "./404.html", "./js/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        }
      },
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Ubuntu Mono', 'Fira Code', 'SF Mono', 'Consolas', 'monospace'],
      },
    }
  },
  plugins: [],
};
