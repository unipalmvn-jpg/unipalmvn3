import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#045433",
        primaryDark: "#033d25",
        primaryLight: "#056844",
        accent: "#f5ebce",
        accentGold: "#daae62",
        backgroundGray: "#fafafa",
        backgroundBeige: "#f5ebce",
        textGray: "#555",
        textLight: "#999",
        border: "#e5e5e5",
        star: "#daae62",
      },
    },
  },
  plugins: [],
};
export default config;