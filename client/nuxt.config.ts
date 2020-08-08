import { NuxtConfig } from '@nuxt/types'
import HeadConfig from './src/configs/head.config.json'
// import AppConfig from './src/configs/app.config.json'

const dev = process.env.NODE_ENV === 'development'
const env = process.env

const config: NuxtConfig = {
  mode: 'spa',
  dev,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
  // privateRuntimeConfig: {
  //   "port": env.PORT,
  //   "host": env.HOST,
  //   "app": AppConfig
  // },
  publicRuntimeConfig: {
    // "cdnHost": env.CDN_HOST,
    // "accountBaseUrl": env.ACCOUNT_BASE_URL,
    // "apiGatewayEndpoint": env.API_GATEWAY_ENDPOINT,
    "endpoint": env.API_ENDPOINT,
    // "socketEndpoint": env.SOCKET_ENDPOINT,
    // "jwt": {
    //   "appId": env.APP_ID,
    //   "appSecret": env.APP_SECRET
    // }
  },
  head: HeadConfig,
  loading: false, // using 'false' if you dont want using default loading
  css: [],
  styleResources: {
    scss: [],
  },
  plugins: [
    '~/plugins/services.ts',
    '~/plugins/utils.ts'
  ],
  modules: [
    ['@nuxtjs/robots', { UserAgent: '*', Disallow: '*' }],
    'cookie-universal-nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
  ],
  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        ignoreNotFoundWarnings: true,
      },
    ],
    '@nuxtjs/vuetify',
  ],
  build: {
    extractCSS: true,
    cssSourceMap: false,
    optimization: {
      splitChunks: {
        name: true,
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient && config.module) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      if (config.module) {
        config.module.rules.push({
          test: /\.s(c|a)ss$/,
          exclude: /(node_modules)/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                fiber: require('fibers'),
                indentedSyntax: true, // optional
              },
            },
          ],
        })
      }
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  },
  router: {
    middleware: [],
    base: '/',
  },
  srcDir: process.cwd() + '/src/',
  dir: {
    assets: 'assets',
    layouts: 'layouts',
    middleware: 'middleware',
    pages: 'pages',
    static: 'static',
    store: 'store'
  },
  // buildDir: '.nuxt/',
  server: {
    port: env.PORT,
    host: env.HOST,
  },
  vuetify: {
    optionsPath: '~/static/theme/index.ts',
  },
  // axios: {
  //   debug: false
  // }
}

export default config
