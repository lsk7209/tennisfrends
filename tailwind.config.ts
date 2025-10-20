import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PRD에 정의된 컬러 시스템
        primary: {
          green: '#0BA360',
          'green-dark': '#19C37D',
          blue: '#2364AA',
          'blue-dark': '#3D8BFF',
        },
        accent: {
          lime: '#C7F000',
        },
        neutral: {
          ink: '#0F172A',
          sub: '#334155',
          border: '#E2E8F0',
          surface: '#F8FAFC',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Inter Variable', 'system-ui', 'sans-serif'],
        mono: ['Inter Variable', 'monospace'],
      },
      fontSize: {
        'display': ['36px', { lineHeight: '1.2' }],
        'h1': ['28px', { lineHeight: '1.2' }],
        'h2': ['22px', { lineHeight: '1.2' }],
        'h3': ['18px', { lineHeight: '1.2' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'sub': ['14px', { lineHeight: '1.6' }],
        'cap': ['12px', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'card': '16px',
      },
      animation: {
        'fade-up': 'fadeUp 0.2s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'pulse': 'pulse 0.2s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      maxWidth: {
        'container': '680px',
        'container-lg': '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
