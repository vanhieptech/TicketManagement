import { NuxtAppOptions } from "@nuxt/types/app"

export default function (app: NuxtAppOptions, data: any) {
  console.log(`signUp`, data)
  return app.$apiCall({
    url: `/api/user/sign-up`,
    method: 'post',
    data
  })
}
