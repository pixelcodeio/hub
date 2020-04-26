export interface DispatchProps {
  dispatch: (action: any) => any;
}

export interface Employee {
  birthday: string
  blurb: string
  email: string
  facebook: string
  featuredPosts: FeaturedPost[]
  id: string
  imageURL: string
  instagram: string
  interests: string[]
  joinDate: string
  linkedin: string
  manager?: Employee
  name: string
  office: string
  personalSite: PersonalSite
  pronouns: string
  team: string
  title: string
  twitter: string
}

export interface Celebration {
  type: CelebrationType
  employee: Employee
  numYears?: number
}

export type CelebrationType = "Birthday" | "Anniversary"

export interface PersonalSite {
  url: string
  description: string
}

export interface Anniversary extends Employee {
  numYears: number
}

export interface CalendarEvent {
  name: string
  time: string
}

export interface Announcement {
  title: string
  date: string
}

export interface FeaturedPost {
  body: string
  imageURL: string
  title: string
}

export interface Thanks {
  from: Employee
  to: Employee
  message: string
  date: string
}

export interface DailyUpdate {
  employee: Employee
  message: string
  date: string
}

export interface FeedPost {
  type: FeedPostType
  thanks?: Thanks
  dailyUpdate?: DailyUpdate
}

export type Page = "Home" | "Profile"

export type FeedPostType = "Thanks" | "DailyUpdate"

export type AppAction =
  | { type: "type", value: "value" }
  | { type: "login" }
  | { type: "fetchProfile", user: Employee }
  | { type: "selectFilter", filter: string }
  | { type: "setCurrentPage", page: Page }
  | { type: "fetchAllProfiles", allEmployees: Employee[] }
