import { NuxtAppOptions } from "@nuxt/types/app";

export default class FlightRepo {

  private context: NuxtAppOptions
  private static instance: FlightRepo;

  private constructor(_context: NuxtAppOptions) {
    this.context = _context
  }

  static getInstance(_context: NuxtAppOptions): FlightRepo {
    if (!this.instance) {
      this.instance = new FlightRepo(_context)
    }
    return this.instance
  }

  public async getListFlights(data) {
    try {
      const res = await this.context.$apiClient.getListFlights(data)
      console.log(res)
      if (res && res.code === 200) {
        return res.results
      } else {
        console.log('Can not get list flights', res)
        return []
      }
    } catch (e) {
      console.error('Can not get list flights', e)
      return []
    }
  }



}
