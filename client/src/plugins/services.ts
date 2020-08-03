// import { Plugin, Context } from '@nuxt/types/app'


declare module 'vue/types/vue' {
  interface Vue {
    $apiClient: {

    }
  }
}

declare module '@nuxt/types/app' {
  interface NuxtAppOptions {
    $apiClient: {

    }
  }
}

// const pluginServices: Plugin = ({ app }: Context, inject) => {
//   inject('apiClient', {

//   })
// }

export default pluginServices
