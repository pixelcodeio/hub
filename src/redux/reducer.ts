import {
  AppAction,
  Announcement,
  User,
} from './types';
import { Announcements } from 'views/Home/Components/Announcements';

export interface AppState {
  user?: User
  announcements: Announcement[]
}

export const initialState: AppState = {
  announcements: [
    {
      title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
      date: "Feburary 1, 2020",
    },
    {
      title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
      date: "Feburary 1, 2020",
    },
    {
      title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
      date: "Feburary 1, 2020",
    },
    {
      title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
      date: "Feburary 1, 2020",
    },
    {
      title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
      date: "Feburary 1, 2020",
    },
    {
      title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
      date: "Feburary 1, 2020",
    },
  ],
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