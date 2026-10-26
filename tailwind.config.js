/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          wine: "#732F3B",
          "wine-dark": "#541F2A",
          cream: "#F1E4D8",
          beige: "#E3CDBD",
          "pink-muted": "#EBD3D6",
          "pink-dark": "#D8B0B2",
          "pink-light": "#E8CECE",
          gold: "#B58A5A",
          brown: "#82594C",
          black: "#2B2526"
        }
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"]
      }
    }
  },
  plugins: []
};
