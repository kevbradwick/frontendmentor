/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,pug}"],
  theme: {
    extend: {},
    colors: {
      "dark-cyan": "hsl(158, 36%, 37%)",
      cream: "hsl(30, 38%, 92%)",
      "very-dark-blue": "hsl(212, 21%, 14%)",
      "dark-grayish-blue": "hsl(228, 12%, 48%)",
      white: "hsl(0, 0%, 100%)",

      // aca - age calculator app
      "aca-off-black": "hsl(0, 0%, 8%)",
      "aca-smokey-gray": "hsl(0, 1%, 44%)",
      "aca-light-gray": "hsl(0, 0%, 86%)",
      "aca-off-white": "hsl(0, 0%, 94%)",
      "aca-white": "hsl(0, 0%, 100%)",
      "aca-light-red": "hsl(0, 100%, 67%)",
      "aca-purple": "hsl(259, 100%, 65%)",
    },
    fontFamily: {
      montserrat: ["Montserrat", "ui-sans-serif", "sans-serif"],
      fraunces: ["Fraunces", "ui-serif", "serif"],

      "aca-poppins": ["Poppins", "ui-sans-serif", "sans-serif"],
      "sans": ["ui-sans-serif", "system-ui"],
    },
  },
  plugins: [],
};

