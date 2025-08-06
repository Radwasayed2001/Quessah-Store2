/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // هنا يمكنك إضافة أي ألوان مخصَّصة
        bgLight: '#ffffff',
        textLight: '#333333',
        bgDark:  '#121212',
        textDark:'#eeeeee',
      }
    }
  },
  plugins: [],
}

