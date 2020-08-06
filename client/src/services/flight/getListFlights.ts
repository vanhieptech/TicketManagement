import { NuxtAppOptions } from "@nuxt/types/app"

export default function (app: NuxtAppOptions, { patientId = "", fields = "", pageIndex = 1, pageSize = 10 }) {
  const filters = {
    patient: patientId
  }
  const query = {
    filters: JSON.stringify(filters),
    fields,
    pageSize,
    pageIndex
  }
  return app.$apiCall({
    url: `/api/user/get-list-consultation`,
    query,
    method: 'get'
  })
}
