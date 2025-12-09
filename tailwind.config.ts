import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A365D",
        primaryDark: "#234E7B",
        secondary: "#C9A961",
        accent: "#2C5282",
        background: "#FFFFFF",
        backgroundAlt: "#F8F9FA",
        textMain: "#1A202C",
        textSecondary: "#4A5568",
        borderSoft: "#E2E8F0",
        whatsapp: "#25D366"
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.08)",
        card: "0 4px 12px rgba(0,0,0,0.10)",
        whatsapp: "0 4px 12px rgba(37,211,102,0.40)"
      },
      borderRadius: {
        md: "6px",
        lg: "8px"
      },
      keyframes: {
        "whatsapp-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        }
      },
      animation: {
        "whatsapp-pulse": "whatsapp-pulse 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

