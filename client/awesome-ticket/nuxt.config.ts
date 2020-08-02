import colors from "vuetify/es5/util/colors";
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/codemirror.min.css', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/theme/material.min.css', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/scroll/simplescrollbars.min.css', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/hint/show-hint.min.css', rel: 'stylesheet' },
      { href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900", rel: "stylesheet" },
      { href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css", rel: "stylesheet" }

    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/codemirror.min.js', body: true, type: 'text/javascript' },
      { src: 'https://cdn.jsdelivr.net/npm/vue-codemirror@4.0.6/dist/vue-codemirror.min.js', body: true, type: 'text/javascript' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/mode/javascript/javascript.min.js', body: true, type: 'text/javascript' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/display/autorefresh.min.js', body: true, type: 'text/javascript' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/selection/active-line.min.js', body: true, type: 'text/javascript' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/scroll/simplescrollbars.min.js', body: true, type: 'text/javascript' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.0/addon/hint/show-hint.min.js', body: true, type: 'text/javascript' },

			/**
			 * Excel XLSX
			 */
      // { src: "https://unpkg.com/xlsx/dist/shim.min.js" },
      { src: "https://unpkg.com/xlsx/dist/xlsx.full.min.js" }
    ]
  },
  /*
   ** Global CSS
   */
  css: ["vuesax/dist/vuesax.css"],
  styleResources: {
    scss: []
  },

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["@/plugins/vuesax"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  srcDir: process.cwd() + '/src/',
  dir: {
    assets: 'assets',
    layouts: 'layouts',
    middleware: 'middleware',
    pages: 'pages',
    static: 'static',
    store: 'store'
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxt/typescript-build"],

  /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
  }
};
