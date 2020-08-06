// import jwt from 'jsonwebtoken'
import axios, { AxiosResponse, AxiosError, Method } from 'axios'
import base64url from 'base64url'
import serialize from '../utils/serialize';
import { NuxtAppOptions } from '@nuxt/types';
import { IResp } from '../models/api';
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime';

export interface IApiCallOptions {
  url: string
  apiEndPoint?: string
  headers?: any
  method?: string
  data?: any,
  query?: any
  external?: boolean
}

const api = function (app: NuxtAppOptions, $config: NuxtRuntimeConfig, { apiEndPoint = '', headers = null, url, method = 'get', data = null, query = null, external = false }: IApiCallOptions, cb?: any): Promise<IResp> {
  // get url
  if ($config && $config.endpoint) {
    apiEndPoint = $config.endpoint
  }
  console.log(`api call line 24`, $config)
  let fullUrl = external ? url : apiEndPoint + url
  // const locale = app.$cookies.get('locale') || 'vi'
  // add query locale
  if (query) {
    const queryObject = Object.assign({}, query)
    const queryString = serialize(queryObject)
    fullUrl += (queryString.split('?')[1] ? '&' : '?') + queryString
  }
  // get token
  // const token = app.$cookies.get('token') ? app.$cookies.get('token') : data ? data.token : null;
  // get user
  // const user = app.$user.get('_id')
  // get signature
  // const signature = jwt.sign(
  //   {
  //     iss: $config.jwt.appId,
  //     usr: user,
  //     tkn: token,
  //     url: fullUrl,
  //     med: method
  //   },
  //   $config.jwt.appSecret,
  //   {
  //     expiresIn: '24h',
  //     algorithm: 'HS256'
  //   }
  // )
  // let defaultHeader = {
  //   token: token || null,
  //   signature
  // }
  let defaultHeader = {}
  if (headers) defaultHeader = Object.assign(defaultHeader, headers)
  // if (!defaultHeader.token) delete defaultHeader.token
  if (cb) {
    axios(fullUrl, {
      method: method as Method,
      data,
      headers: defaultHeader
    })
      .then(function (response) {
        cb(response.data);
      })
      .catch(function (error) {
        let errResponse = {};
        if (error.code === 'ETIMEDOUT') {
          console.error(`[ERROR] ETIMEDOUT Request timeout`);
          errResponse = {
            error: 'timeout',
            message: "request timeout"
          };
        } else if (error.response && error.response.status === 503) {
          // dont care
        } else if (error.response) {
          console.log(error)
          if (error.response.status === 403 || error.response.status === 401) {
            console.error("Unauthorize : ", error.response.data.status)
            if (window) {
              const currentUrl = new URL(window.location.href)
              if (currentUrl.searchParams.get('query')) {
                currentUrl.searchParams.delete('query')
              }
              const redirectUrl = base64url(currentUrl.href)
              const url = new URL('/', $config.env.accountBaseUrl)
              url.searchParams.set('redirect', redirectUrl)
              // url.searchParams.set('token', token)
              window.location.href = url.toString()
            }
          } else {
            console.error(`[ERROR] ${error.response.status} ${error.response.statusText}`);
            errResponse = {
              error: error.response.status || '000',
              message: error.response.statusText || 'server error'
            };
          }
        } else {
          console.error(error);
          errResponse = {
            error: '000',
            message: error.toString()
          };
        }
        cb(errResponse);
      });
  } else
    // call axios
    return new Promise((resolve, reject) => {
      axios(fullUrl, {
        method: method as Method,
        data,
        headers: defaultHeader
      })
        .then((response: AxiosResponse) => { resolve(response.data) })
        .catch((error: AxiosError) => {
          let errResponse = null
          if (error.code === 'ETIMEDOUT') {
            console.error(`[ERROR] ETIMEDOUT Request timeout`);
            errResponse = {
              error: 'timeout',
              message: "request timeout"
            };
          } else if (error.response && error.response.status === 503) {
            // dont care
          } else if (error.response) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
              console.error("Unauthorize : ", error.response.data.status)
              if (window) {
                const currentUrl = new URL(window.location.href)
                if (currentUrl.searchParams.get('query')) {
                  currentUrl.searchParams.delete('query')
                }
                const redirectUrl = base64url(currentUrl.href)
                const url = new URL('/', $config.env.accountBaseUrl)
                url.searchParams.set('redirect', redirectUrl)
                // url.searchParams.set('token', token)
                url.searchParams.set('requestUser', encodeURIComponent(JSON.stringify(app.$user.get())))
                window.location.href = url.toString()
              }
            } else {
              console.error(`[ERROR] ${error.response.status} ${error.response.statusText}`);
              errResponse = {
                error: error.response.status || '000',
                message: error.response.statusText || 'server error'
              };
            }
            reject(errResponse)
          }
        })
    })
}

export default api
