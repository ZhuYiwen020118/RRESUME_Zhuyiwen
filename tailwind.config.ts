import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./static-preview/**/*.html"
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
        },
        accent: {
          gold: "#fbbf24",
          amber: "#f59e0b",
          coral: "#fb7185",
          violet: "#a78bfa"
        }
      },
      fontFamily: {
        sans: ["'Outfit'", "'Noto Sans SC'", "system-ui", "sans-serif"],
        display: ["'Syne'", "'Noto Sans SC'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(31,155,255,0.35)",
        floating: "0 25px 70px rgba(5, 14, 40, 0.55)",
        glow: "0 0 40px rgba(31, 155, 255, 0.25)",
        "glow-lg": "0 0 80px rgba(31, 155, 255, 0.35)",
        "inner-glow": "inset 0 0 30px rgba(31, 155, 255, 0.1)"
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      backgroundSize: {
        "grid": "40px 40px"
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(31, 155, 255, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(31, 155, 255, 0.4)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        }
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth-out": "cubic-bezier(0.4, 0, 0.2, 1)"
      }
    }
  },
  plugins: [typography]
};

export default config;
