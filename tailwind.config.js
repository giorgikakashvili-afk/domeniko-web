/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // აქ ვამატებთ ახალ სახელს "noto"
        noto: ['"Noto Sans Georgian"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}