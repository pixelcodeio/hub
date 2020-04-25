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

export type AppAction =
  | { type: "type", value: "value" }
  | { type: "login" }