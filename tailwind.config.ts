import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./static-preview/**/*.{html}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f4f8ff",
          100: "#e1ecff",
          200: "#bfd3ff",
          300: "#94b3ff",
          400: "#6f92fb",
          500: "#4d75e6",
          600: "#2d57c7",
          700: "#1b3f9e",
          800: "#0f2b6d",
          900: "#08183f",
          950: "#030b20"
        },
        neon: {
          100: "#dbf5ff",
          200: "#b0e5ff",
          300: "#7ccfff",
          400: "#4bb4ff",
          500: "#1f9bff",
          600: "#0a7bdd"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(31,155,255,0.35)",
        floating: "0 25px 70px rgba(5, 14, 40, 0.55)"
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: [typography]
};

export default config;

