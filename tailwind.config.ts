import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: "rgb(14 18 28)",
        panel2: "rgb(12 15 23)",
        ink: "rgb(235 238 245)"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,.35)",
        line: "0 0 0 1px rgba(255,255,255,.10)"
      }
    }
  },
  plugins: []
} satisfies Config;
