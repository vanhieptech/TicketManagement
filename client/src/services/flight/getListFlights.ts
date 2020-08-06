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
  console.log(`query`, query)
  return app.$apiCall({
    url: `/api/flight`,
    // query,
    method: 'get'
  })
}
