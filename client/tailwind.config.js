/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        surface: "#f8f9fb",
        ink: "#1c1f26",
        accent: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          light: "#eef2ff",
        },
        line: "#e2e4ea",
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(28,31,38,0.04), 0 4px 12px rgba(28,31,38,0.06)",
      },
    },
  },
  plugins: [],
};
