/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF8F1",
          100: "#F7F1E5",
          200: "#EFE4CF",
        },
        temple: {
          50: "#EDF5EF",
          100: "#D8E9DC",
          200: "#B3D3BC",
          300: "#87B796",
          400: "#5C9A72",
          500: "#3E7C57",
          600: "#2F6345",
          700: "#275238",
          800: "#21422F",
          900: "#1B3627",
        },
        terracotta: {
          50: "#FBF0EA",
          100: "#F6DFD2",
          200: "#EDBFA6",
          300: "#E19A75",
          400: "#D27A4E",
          500: "#B95F38",
          600: "#A04A2A",
          700: "#843C24",
          800: "#6B3220",
          900: "#582B1D",
        },
        gold: {
          50: "#FBF6E9",
          100: "#F6EAC8",
          200: "#ECD28D",
          300: "#E2B95B",
          400: "#D5A238",
          500: "#C08A2B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(27, 54, 39, 0.08), 0 6px 16px -6px rgba(27, 54, 39, 0.12)",
        "card-lg":
          "0 2px 6px rgba(27, 54, 39, 0.08), 0 12px 28px -8px rgba(27, 54, 39, 0.18)",
      },
    },
  },
  plugins: [],
};
