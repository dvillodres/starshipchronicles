import animations from '@midudev/tailwind-animations'

module.exports = {
    content: ["./src/**/*.{html,js}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'nebula-black': '#0a0a12',
                'deep-space': '#1a1a2e',
                'crt-green': '#39ff14',
                'neon-cyan': '#51e6ff',
                'cosmic-purple': '#9d4edd',
                'warning-amber': '#ffbf00'
            },
            fontFamily: {
                'retro': ['"Press Start 2P"', 'monospace'],
                'doto': ['"doto"', 'monospace']
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 1.5s ease-in-out infinite alternate',
                'scanline': 'scanline 8s linear infinite',
                'blink': 'blink 1.2s infinite',
                'rotate-text': 'rotateText 12s linear infinite',
                'starfield': 'starfield 60s linear infinite',
                'grow': 'grow 1s ease-in-out forwards',
            },
            keyframes: {
                glow: {
                    '0%': { 'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00ffff, 0 0 20px #00ffff' },
                    '100%': { 'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00ffff, 0 0 40px #00ffff' }
                },
                scanline: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100vh)' }
                },
                blink: {
                    '0%, 49%': { opacity: '1' },
                    '50%, 100%': { opacity: '0' }
                },
                rotateText: {
                    '0%, 33%': { opacity: '1', transform: 'translateY(0)' },
                    '33.1%, 33.9%': { opacity: '0', transform: 'translateY(20px)' },
                    '34%, 66%': { opacity: '1', transform: 'translateY(0)' },
                    '66.1%, 66.9%': { opacity: '0', transform: 'translateY(20px)' },
                    '67%, 99.9%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(20px)' }
                },
                starfield: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(1000px)' }
                },
                grow: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '15%': { opacity: '.1' },
                    '30%': { transform: 'scale(4) translateY(30px)', opacity: '0',},
                },
            }
        }
    },
    plugins: [
        animations
    ],
}
