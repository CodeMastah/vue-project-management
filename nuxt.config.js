export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'bib-pm-front-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/global.scss'
  ],
  /// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/vuelidate'],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [{ path: '~/components/', pathPrefix: false }, { path: '~/../bib-shared/components/', pathPrefix: false }],
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [

  ],
  styleResources: {
    scss: [
      '../bib-shared/css/colors.scss',
      '../bib-shared/css/variables.scss',
      '../bib-shared/css/mixins.scss',
      '../bib-shared/css/utilities.scss'
    ]
  },
  router: {
    middleware: ['auth']
  },
  axios: {
    proxy: true,
  },
  proxy: {
    '/auth': {
      target: 'http://api.proj-mgmt.biztree.com/auth',
      pathRewrite: { '^/auth': '' },
      changeOrigin: true
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { loaders }) {
      loaders.scss.additionalData = '@use "sass:math";'
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'POST', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'DELETE', propertyName: 'token' },
          user: { url: '/auth/me', method: 'GET', propertyName: 'data' }
        }
      }
    }
  }
}
