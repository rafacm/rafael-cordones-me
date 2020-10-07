/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        mono: ['DM Mono', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        primary: {
          100: '#E6FAF2',
          200: '#BFF3E0',
          300: '#99EBCD',
          400: '#4DDCA7',
          500: '#00CD81',
          600: '#00B974',
          700: '#007B4D',
          800: '#005C3A',
          900: '#003E27'
        }
      },
      maxHeight: {
        '(screen-16)': 'calc(100vh - 4rem)'
      },
      inset: {
        16: '4rem'
      },
      transitionProperty: {
        padding: 'padding'
      }
    },
    typography: (theme) => ({
      default: {
        css: {
          a: {
            color: theme('colors.primary.500')
          },
          h2: {
            paddingBottom: theme('padding.2'),
            borderBottomWidth: '1px',
            borderBottomColor: theme('colors.gray.200')
          },
          h3: {
            paddingBottom: theme('padding.2'),
            borderBottomWidth: '1px',
            borderBottomColor: theme('colors.gray.200')
          },
          blockquote: {
            fontWeight: '400',
            color: theme('colors.gray.600'),
            fontStyle: 'normal',
            quotes: '"\\201C""\\201D""\\2018""\\2019"'
          },
          'blockquote p:first-of-type::before': {
            content: ''
          },
          'blockquote p:last-of-type::after': {
            content: ''
          },
          code: {
            fontWeight: '400',
            backgroundColor: theme('colors.gray.100'),
            padding: theme('padding.1'),
            borderWidth: 1,
            borderColor: theme('colors.gray.200'),
            borderRadius: theme('borderRadius.default')
          },
          'code::before': {
            content: ''
          },
          'code::after': {
            content: ''
          },
          'h3 code': {
            fontWeight: '600'
          },
          'pre code': {
            fontFamily: 'DM Mono'
          }
        }
      }
    })
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    // See also https://tailwindcss.nuxtjs.org/tailwind-config
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'content/**/*.md',
      path.join(__dirname, 'components/**/*.vue'),
      path.join(__dirname, 'layouts/**/*.vue'),
      path.join(__dirname, 'pages/**/*.vue'),
      path.join(__dirname, 'plugins/**/*.js'),
      'nuxt.config.js'
    ],
    options: {
      whitelist: []
    }
  }
}
