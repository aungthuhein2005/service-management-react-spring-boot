/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Add the file extensions used in your project
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: '8px',
  			md: '6px',
  			sm: '4px'
  		},
  		colors: {
  			// Stratum Design System Colors
  			// Primary & Accents
  			primary: {
  				DEFAULT: '#4F46E5', // Deep Indigo
  				foreground: '#FFFFFF',
  				hover: '#4338CA'
  			},
  			secondary: {
  				DEFAULT: '#818CF8', // Soft Violet
  				foreground: '#FFFFFF'
  			},
  			// Backgrounds
  			background: '#F1F5F9', // Slate Grey
  			surface: '#FFFFFF', // Pure White
  			// Semantic/Status Colors
  			success: {
  				DEFAULT: '#10B981', // Emerald
  				bg: '#D1FAE5'
  			},
  			warning: {
  				DEFAULT: '#F59E0B', // Amber
  				bg: '#FEF3C7'
  			},
  			critical: {
  				DEFAULT: '#EF4444', // Red
  				bg: '#FEE2E2'
  			},
  			info: {
  				DEFAULT: '#3B82F6', // Blue
  				bg: '#DBEAFE'
  			},
  			neutral: {
  				DEFAULT: '#64748B', // Slate
  				bg: '#F1F5F9'
  			},
  			// Text Colors
  			text: {
  				primary: '#1E293B',
  				secondary: '#334155',
  				body: '#475569',
  				small: '#94A3B8',
  				muted: '#64748B'
  			},
  			// Dark Mode Colors
  			dark: {
  				background: '#0F172A',
  				surface: '#1E293B',
  				border: '#334155',
  				text: '#94A3B8'
  			},
  			// Legacy support
  			foreground: '#1E293B',
  			card: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#1E293B'
  			},
  			border: '#E2E8F0',
  			input: '#CBD5E1',
  			ring: '#4F46E5',
  			muted: {
  				DEFAULT: '#F1F5F9',
  				foreground: '#64748B'
  			},
  			accent: {
  				DEFAULT: '#818CF8',
  				foreground: '#FFFFFF'
  			},
  			destructive: {
  				DEFAULT: '#EF4444',
  				foreground: '#FFFFFF'
  			}
  		},
  		fontFamily: {
  			sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif']
  		},
  		fontSize: {
  			'h1': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
  			'h2': ['18px', { lineHeight: '1.3', fontWeight: '500' }],
  			'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
  			'small': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
  			'table': ['13px', { lineHeight: '1.4', fontWeight: '400' }]
  		},
  		boxShadow: {
  			'stratum': '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}