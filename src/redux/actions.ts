import { AppAction } from './types';
import { API } from "API"

const sharedAPI = API.getInstance()

export const login = () => {
  return async (dispatch: any) => {
    const response = await sharedAPI.signup()
    console.log("RESPONSE", response)
    dispatch({ type: "login" })
  }
}
