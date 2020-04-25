export interface DispatchProps {
  dispatch: (action: AppAction) => any;
}

export interface User {
  name: string
}

export interface Announcement {
  title: string
  date: string
}

export type AppAction =
  | { type: "type", value: "value" }
  | { type: "login", user: User }