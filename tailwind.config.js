/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
