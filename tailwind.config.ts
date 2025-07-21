import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4299e1",
          dark: "#3182ce",
        },
        secondary: {
          DEFAULT: "#48bb78",
        },
        accent: {
          DEFAULT: "#ed8936",
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 47% 33%, hsl(162, 77%, 40%) 0, transparent 59%), radial-gradient(at 82% 65%, hsl(198, 100%, 50%) 0, transparent 55%)",
      },
    },
  },
  plugins: [],
};

export default config;
