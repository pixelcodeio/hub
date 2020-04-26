import {
  AppAction,
  Employee,
  Homepage,
  Page
} from './types';

export interface AppState {
  user?: Employee
  allEmployees: Employee[]
  homepage?: Homepage
  selectedFilters: string[]
  currentPage: Page,
}

export const initialState: AppState = {
  currentPage: "Profile",
  selectedFilters: ["All"],
  user: undefined,
  homepage: undefined,
  allEmployees: [],
};

export default function reducer(state: AppState = initialState, action: AppAction): AppState {
  const { selectedFilters } = state
  switch (action.type) {
    case "login":
      return state
    case "fetchProfile":
      const { user } = action
      return { ...state, user }
    case "fetchAllProfiles":
      const { allEmployees } = action
      return { ...state, allEmployees }
    case "fetchHomepage":
      const { homepage } = action
      return { ...state, homepage }
    case "selectFilter":
      const { filter } = action
      const allFilterPrevSelected = selectedFilters.includes("All")
      if (filter === "All") {
        if (allFilterPrevSelected) {
          return { ...state, selectedFilters }
        } else {
          return { ...state, selectedFilters: ["All"] }
        }
      }
      let filters = selectedFilters
      if (allFilterPrevSelected) {
        filters = filters.filter(f => f !== "All")
      }
      filters = filters.includes(filter)
        ? filters.filter(f => f !== filter)
        : [...filters, filter]
      return { ...state, selectedFilters: filters }
    case "setCurrentPage":
      return { ...state, currentPage: action.page }
    default:
      return state
  }
};