import tailwindConfig from './tailwind.config'

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'rafael cordones',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: 'text-gray-800 antialiased'
    }
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // See https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // See https://github.com/nuxt-community/analytics-module
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // See https://github.com/geeogi/nuxt-responsive-loader
    'nuxt-responsive-loader'
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },
  fontawesome: {
    icons: {
      solid: ['faInfoCircle', 'faTimesCircle', 'faExclamationCircle', 'faCheckCircle'],
      brands: ['faTwitter', 'faGithub', 'faLinkedin']
    }
  },
  googleFonts: {
    families: {
      'Open+Sans': true,
      'DM+Mono': true
    },
    download: true
  },
  googleAnalytics: {
    id: 'UA-55232459-1'
  },
  responsiveLoader: {
    adapter: require('responsive-loader/sharp')
  },
  tailwindcss: {
    config: tailwindConfig
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // See https://github.com/nuxt/content/issues/106#issuecomment-666283547
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.md$/i,
        loader: 'ignore-loader'
      })
    }
  }
}
