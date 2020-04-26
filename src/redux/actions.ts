import { AppAction, Page } from './types';
import { API } from "API"

const sharedAPI = API.getInstance()

export const signup = () => {
  return async (dispatch: any) => {
    const response = await sharedAPI.signup()
    dispatch({ type: "signup" })
  }
}

export const login = () => {
  return async (dispatch: any) => {
    const response = await sharedAPI.signin()
    dispatch({ type: "login" })
  }
}

export const fetchAllProfiles = () => {
  return async (dispatch: any) => {
    const response: any = await sharedAPI.fetchAllProfiles()
    console.log("ALL PROFILES", response)
    dispatch({ type: "fetchAllProfiles", allEmployees: response.data })
  }
}

export const fetchProfile = (userID: string) => {
  return async (dispatch: any) => {
    const response: any = await sharedAPI.fetchProfile(userID)
    console.log("USER", response.data)
    dispatch({ type: "fetchProfile", user: response.data })
  }
}

export const selectFilter = (filter: string) => {
  return { type: "selectFilter", filter }
}

export const setCurrentPage = (page: Page) => {
  return { type: "setCurrentPage", page }
}