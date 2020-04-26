
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

  public async fetchProfile(userID: string) {
    return this.fetchPath(`profile?user_id=${userID}`)
  }

  public async fetchAllProfiles() {
    return this.fetchPath("profiles")
  }

  public async signup() {
    return this.fetchPath("signup")
  }

  public async signin() {
    return this.fetchPath("signin")
  }

}