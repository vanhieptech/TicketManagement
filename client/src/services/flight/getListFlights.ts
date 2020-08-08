import { NuxtAppOptions } from "@nuxt/types/app"

export default function (app: NuxtAppOptions, data) {
  console.log(data)
  return app.$apiCall({
    url: `/api/flight`,
    query: data,
    method: 'get'
  })
}
