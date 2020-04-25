
export class API {
  public baseURL: string
  private static __instance: API

  constructor() {
    this.baseURL = "https://snappy-flash-275303.ue.r.appspot.com"
  }

  public static getInstance() {
    return this.__instance || (this.__instance = new API())
  }

  private async fetchPath(path: string) {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/${path}`)
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          resolve(json)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public async signup() {
    return this.fetchPath("signin")
  }

}