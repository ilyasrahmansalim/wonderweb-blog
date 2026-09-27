/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      typography: (theme) => ({
        wonderweb: {
          css: {
            '--tw-prose-body': theme('colors.onyx / 85%'),
            '--tw-prose-headings': theme('colors.onyx'),
            '--tw-prose-links': theme('colors.ocean'),
            '--tw-prose-bold': theme('colors.onyx'),
            '--tw-prose-quotes': theme('colors.ocean'),
            '--tw-prose-code': theme('colors.ocean'),
            maxWidth: '75ch',
            a: {
              fontWeight: '600',
              textDecoration: 'none',
              borderBottom: `2px solid ${theme('colors.sky')}`,
              transition: 'opacity .15s ease',
            },
            'a:hover': { opacity: '0.75' },
            'h2,h3': { scrollMarginTop: '6rem' },
            code: {
              backgroundColor: theme('colors.ghost'),
              padding: '0.15rem 0.4rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      }),
      colors: {
        onyx: '#0A0A0A',
        ghost: '#F8FAFF',
        ocean: '#0047CC',
        sky: '#00A6FB',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        wonderweb: {
          primary: '#0047CC',       // Ocean Twilight
          'primary-content': '#F8FAFF',
          secondary: '#00A6FB',     // Fresh Sky
          'secondary-content': '#0A0A0A',
          accent: '#00A6FB',
          'accent-content': '#0A0A0A',
          neutral: '#0A0A0A',       // Onyx
          'neutral-content': '#F8FAFF',
          'base-100': '#F8FAFF',    // Ghost White (60% dominant surface)
          'base-200': '#EEF3FC',
          'base-300': '#E2E9F7',
          'base-content': '#0A0A0A',
          info: '#00A6FB',
          success: '#12B76A',
          warning: '#F5A524',
          error: '#E5484D',

          '--rounded-box': '1.25rem',
          '--rounded-btn': '0.75rem',
          '--rounded-badge': '999px',
          '--tab-radius': '0.75rem',
        },
      },
    ],
    darkTheme: 'wonderweb',
    base: true,
    styled: true,
    utils: true,
  },
};
