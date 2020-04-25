export interface DispatchProps {
  dispatch: (action: AppAction) => any;
}

export interface User {
  name: string
}

export interface Employee {
  name: string
  title: string
  team: string
  imageURL: string
}

export interface NewHire extends Employee {
  blurb: string
}

export interface Announcement {
  title: string
  date: string
}

export type AppAction =
  | { type: "type", value: "value" }
  | { type: "login", user: User }