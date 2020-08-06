import { Plugin, Context } from '@nuxt/types/app'
import { IResp } from '../models/api'
import apiCall, { IApiCallOptions } from './api'
import { flight } from '../services'
declare module 'vue/types/vue' {
  interface Vue {
    $apiClient: {
      getListFlights(data: any): Promise<IResp>
    }
    $user: {
      set(user: any): any
      get(): any
      get(field: string): any
      remove(): any
      setToken(token: string): any
      redirect(token: string): any
    }
    $apiCall(options: IApiCallOptions, cb?: any): Promise<IResp>
  }
}

declare module '@nuxt/types/app' {
  interface NuxtAppOptions {
    $apiClient: {
      getListFlights(data: any): Promise<IResp>
    }
    $user: {
      set(user: any): any
      get(): any
      get(field: string): any
      remove(): any
      setToken(token: string): any
      redirect(token: string): any
    }

    $apiCall(options: IApiCallOptions, cb?: any): Promise<IResp>
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $apiClient: {
      getListFlights(data: any): Promise<IResp>
    }
    $user: {
      set(user: any): any
      get(): any,
      get(field: string): any
      remove(): any
      setToken(token: string): any
      redirect(token: string): any
    }
    $apiCall(options: IApiCallOptions, cb?: any): Promise<IResp>

  }
}

const pluginServices: Plugin = ({ app, $config }: Context, inject) => {
  inject('apiClient', {
    getListFlights: (data: any) => flight.getListFlights(app, data),
  })
  inject('user', {
    // set: (_user: any) => authen.setUser(_user),
    // get: (field: string) => authen.getUser(field),
    // remove: () => authen.removeUser(),
    // setToken: (token: string) => authen.setToken(token),
    // redirect: (token: string) => authen.redirect(token)
  })
  inject('apiCall', (options: IApiCallOptions, cb?: any) => apiCall(app, $config, options, cb))
}

export default pluginServices
