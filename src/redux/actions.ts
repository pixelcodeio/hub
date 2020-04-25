import { AppAction } from './reducer';

export const login = () => {
  return { type: "login", user: { name: "Kevin" } }
}
