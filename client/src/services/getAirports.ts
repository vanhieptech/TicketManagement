import { NuxtAppOptions } from "@nuxt/types/app"

export default function (app: NuxtAppOptions) {
  return app.$apiCall({
    url: `/api/airport`,
    method: 'get'
  })
}
