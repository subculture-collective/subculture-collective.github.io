/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'subcult-purple': '#3b0a45',
        'subcult-yellow': '#f4ff4a',
        'subcult-green': '#a5ff00',
        'subcult-black': '#0f0f0f',
        'subcult-orange': '#ff6600',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
