module.exports = {
  content: ["./index.html", "./docs.html", "./404.html", "./js/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fde8dc',
          100: '#fbd1bd',
          200: '#f8b99e',
          300: '#f5a27e',
          400: '#f0883e',
          500: '#e95420',
          600: '#c34113',
          700: '#9a330e',
          800: '#70250a',
          900: '#471706',
          950: '#2b0e03',
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
