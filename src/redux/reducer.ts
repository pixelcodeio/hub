import {
  User
} from './types';

export interface AppState {
  user?: User;
}

export type AppAction =
  | { type: "type", value: "value" }
  | { type: "login", user: User }

export const initialState: AppState = {
  user: undefined
};

export default function reducer(state: AppState = initialState, action: AppAction) {
  switch (action.type) {
    case "login":
      return initialState
    default:
      return initialState;
  }
};