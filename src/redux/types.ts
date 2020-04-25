export interface DispatchProps {
  dispatch: (action: any) => any;
}

export interface User {
  name: string
}

export interface Employee {
  name: string
  title: string
  team: string
  imageURL: string
  blurb: string
  interests: string[]
  manager?: Employee
  email: string
  office: string
  birthday: string
  pronouns: string
  joinDate: string
  twitter: string
  linkedin: string
  facebook: string
  instagram: string
  personalSite: PersonalSite
  featuredPosts: FeaturedPost[]
}

export interface PersonalSite {
  url: string
  description: string
}

export interface Anniversary extends Employee {
  numYears: number
}

export interface NewHire extends Employee {
  blurb: string
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
  title: string
  body: string
  imageURL: string
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
  | { type: "selectFilter", filter: string }
  | { type: "setCurrentPage", page: Page }
