import { AppAction, Page } from './types';
import { API } from "API"

const sharedAPI = API.getInstance()

export const signup = () => {
  return async (dispatch: any) => {
    const response = await sharedAPI.signup()
    console.log("RESPONSE", response)
    dispatch({ type: "signup" })
  }
}

export const login = () => {
  return async (dispatch: any) => {
    const response = await sharedAPI.signin()
    console.log("RESPONSE", response)
    dispatch({ type: "login" })
  }
}

export const fetchProfile = (userID: string) => {
  return async (dispatch: any) => {
    console.log("HERE???")
    const response = await sharedAPI.fetchProfile(userID)
    console.log("RESPONSE", response)
    dispatch({ type: "fetchProfile", data: response })
  }
}

export const selectFilter = (filter: string) => {
  return { type: "selectFilter", filter }
}

export const setCurrentPage = (page: Page) => {
  return { type: "setCurrentPage", page }
}