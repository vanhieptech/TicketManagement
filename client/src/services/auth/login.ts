import { NuxtAppOptions } from "@nuxt/types/app"

export default function (app: NuxtAppOptions, data: any) {
  console.log(`login`, data)
  return app.$apiCall({
    url: `/api/user/login`,
    method: 'post',
    data
  })
}
