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
  privateRuntimeConfig: {
    "port": env.PORT,
  },
  publicRuntimeConfig: {
    "accountBaseUrl": env.ACCOUNT_BASE_URL,
    "endpoint": env.API_ENDPOINT,
  },
  head: HeadConfig,
  // loading: false, // using 'false' if you dont want using default loading
  css: ['~/static/styles.css'],
  styleResources: {
    scss: [],
  },
  plugins: [
    '~/plugins/services.ts',
    '~/plugins/utils.ts',
  ],
  modules: [
    ['@nuxtjs/robots', { UserAgent: '*', Disallow: '*' }],
    'cookie-universal-nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674'
      }
    ]
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
    middleware: ['auth'],
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
  axios: {
    baseURL: process.env.API_ENDPOINT || 'http://localhost:4000',
    proxyHeaders: false,
    credentials: false,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/user/login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: '/api/user/auth',
            method: 'get',
            propertyName: 'user'
          },
          logout: false,
        },
        tokenRequired: true,
        // tokenType: 'Bearer'
      },
      facebook: {
        client_id: 'your facebook app id',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email',
        scope: ['public_profile', 'email']
      },
      google: {
        client_id: '440116093203-rrj9fbav2k4ig4ee5mgrmrkvj4i7dc4g.apps.googleusercontent.com'
      },
    },
    // redirect: {
    //   login: '/auth/login',
    //   // logout: '/',
    //   // callback: '/auth/login',
    //   // home: '/'
    // }
    redirect: {
      login: false,
      home: false,
      callback: false,
      logout: false
    }
  },
}

export default config
