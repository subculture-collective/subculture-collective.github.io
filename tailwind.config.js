/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Neon/Electric colors
        'neon-cyan': '#00FFFF',
        'electric-blue': '#0066FF',
        'neon-green': '#39FF14',
        
        // Secondary: Dark grays and blacks
        'cyber-black': '#0A0A0A',
        'deep-gray': '#1A1A1A',
        'mid-gray': '#2A2A2A',
        'light-gray': '#3A3A3A',
        
        // Accent: Glitch-inspired colors
        'glitch-magenta': '#FF00FF',
        'glitch-yellow': '#FFFF00',
        'glitch-red': '#FF0055',
        'glitch-green': '#00FF41',
        
        // Additional semantic colors
        'subcult-dark': '#0F0F0F',
        'subcult-darker': '#050505',
      },
      fontFamily: {
        // Headers: Industrial/geometric fonts with fallbacks
        'display': ['Space Grotesk', 'Rajdhani', 'Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'industrial': ['Rajdhani', 'Saira Condensed', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        
        // Body: Clean, readable mono or sans-serif
        'mono': ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'ui-monospace', 'monospace'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'glitch-slow': 'glitch 3s infinite',
        'glitch-fast': 'glitch 0.5s infinite',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { 
            transform: 'translate(0)',
            opacity: '1',
          },
          '20%': { 
            transform: 'translate(-2px, 2px)',
            opacity: '0.8',
          },
          '40%': { 
            transform: 'translate(-2px, -2px)',
            opacity: '0.9',
          },
          '60%': { 
            transform: 'translate(2px, 2px)',
            opacity: '0.8',
          },
          '80%': { 
            transform: 'translate(2px, -2px)',
            opacity: '0.9',
          },
        },
        scan: {
          '0%': { 
            transform: 'translateY(-100%)',
          },
          '100%': { 
            transform: 'translateY(100%)',
          },
        },
        flicker: {
          '0%, 100%': { 
            opacity: '1',
          },
          '41.99%': { 
            opacity: '1',
          },
          '42%': { 
            opacity: '0',
          },
          '43%': { 
            opacity: '0',
          },
          '43.01%': { 
            opacity: '1',
          },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor',
          },
          '50%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      backgroundImage: {
        'glitch-gradient': 'linear-gradient(45deg, #00FFFF 0%, #FF00FF 50%, #00FF41 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'neon-strong': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor',
        'cyber': '0 4px 20px rgba(0, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
