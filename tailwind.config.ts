import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171412",
        ember: "#DC2626",
        ash: "#6B7280",
        snow: "#FAFAFA",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(23, 20, 18, 0.13)",
        lift: "0 18px 40px rgba(23, 20, 18, 0.16)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
