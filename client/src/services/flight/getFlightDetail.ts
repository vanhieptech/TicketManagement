import { NuxtAppOptions } from "@nuxt/types/app"

export default function (app: NuxtAppOptions, id) {

  return app.$apiCall({
    url: `/api/flight/${id}`,
    method: 'get'
  })
}
