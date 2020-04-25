import { AppAction } from './types';

export const login = () => {
  return { type: "login", user: { name: "Kevin" } }
}
