export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A73E8',
          dark: '#1557B0',
          light: '#E8F0FE',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
        },
        line: '#E0E0E0',
        ink: '#1A1A1A',
        muted: '#5F6368',
        success: '#34A853',
        warning: '#FBBC04',
        error: '#EA4335',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(60,64,67,0.08), 0 1px 3px 1px rgba(60,64,67,0.06)',
        pop: '0 8px 24px rgba(60,64,67,0.16)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
