/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
        mono: ['"Roboto Mono"', "monospace"],
        backgroundImage: {
          "radial-fade":
            "radial-gradient(circle, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 80%)",
        },
      },
    },
  },
  plugins: [],
};
