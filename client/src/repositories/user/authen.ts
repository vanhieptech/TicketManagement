import queryString from "query-string"
import base64url from "base64url";
import { NuxtAppOptions } from "@nuxt/types/app";

export default class AuthenUserRepo {

  private context: NuxtAppOptions
  private static instance: AuthenUserRepo;

  private constructor(_context: NuxtAppOptions) {
    this.context = _context
  }

  static getInstance(_context: NuxtAppOptions): AuthenUserRepo {
    if (!this.instance) {
      this.instance = new AuthenUserRepo(_context)
    }
    return this.instance
  }

  setUser(user: any) {
    if (user && user.token) {
      const newUserInfo = {
        _id: user._id,
        name: user.name,
        dob: user.dob,
        phone: user.phone,
        token: user.token,
      }
      this.context.$cookies.set('user', newUserInfo, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
      })
      this.context.$cookies.set('token', newUserInfo.token, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
      })
    } else {
      this.context.$cookies.remove('user')
      this.context.$cookies.remove('token')
    }
  }

  getUser(field: any): any {
    try {
      return field ? eval(`this.context.$cookies.get("user").${field}`) : this.context.$cookies.get('user')
    } catch (e) {
      return null
    }
  }

  removeUser() {
    this.context.$cookies.remove('user')
    this.context.$cookies.remove('token')
  }

  setToken(token: string) {
    if (token) {
      this.context.$cookies.set('token', token, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
      })
    } else {
      this.context.$cookies.remove('token')
    }
  }

  getToken() {
    return this.context.$cookies.get("token");
  }

  redirect(token: string) {
    const url = queryString.parseUrl(location.href)
    if (url.query.pageId) {
      delete url.query.pageId
    }
    const encodeUrl = queryString.stringifyUrl({ url: url.url, query: url.query })
    const accountRedirect = queryString.stringifyUrl({
      url: this.context.$config.accountBaseUrl + "/login",
      query: {
        redirect: base64url.encode(encodeUrl),
        token,
        app: process.env.APP_NAME
      }
    })
    setTimeout(() => {
      location.href = accountRedirect
    }, 1000);
  }

}
