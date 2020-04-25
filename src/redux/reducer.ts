import {
  AppAction,
  Anniversary,
  Announcement,
  CalendarEvent,
  Employee,
  Filter,
  NewHire,
  User,
} from './types';
import { Announcements } from 'views/Home/Components/Announcements';

export interface AppState {
  companyName: string
  user?: User
  announcements: Announcement[]
  newHires: NewHire[]
  calendarEvents: CalendarEvent[]
  birthdays: Employee[]
  anniversaries: Anniversary[]
  selectedFilter: Filter
}

export const initialState: AppState = {
  companyName: "Figma",
  calendarEvents: Array(5).fill({
    name: "Engineering Standup",
    time: "10:30AM - 11:30AM"
  }),
  selectedFilter: "All",
  birthdays: Array(4).fill({
    name: "Kevin Chan",
    title: "Software Engineer",
    team: "Growth",
    imageURL: "https://avatars3.githubusercontent.com/u/26048121?s=460&u=44d4282c153eb74566058f37df899e8e161c2044&v=4",
  }),
  anniversaries: Array(4).fill({
    name: "Kevin Chan",
    title: "Software Engineer",
    team: "Growth",
    imageURL: "https://avatars3.githubusercontent.com/u/26048121?s=460&u=44d4282c153eb74566058f37df899e8e161c2044&v=4",
    numYears: 5,
  }),
  announcements: Array(5).fill({
    title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
    date: "Feburary 1, 2020",
  }),
  newHires: Array(6).fill({
    name: "Kevin Chan",
    title: "Software Engineer",
    team: "Growth",
    imageURL: "https://avatars3.githubusercontent.com/u/26048121?s=460&u=44d4282c153eb74566058f37df899e8e161c2044&v=4",
    blurb: "Hi! My name is Kevin and I am very excited to join as a Software Engineer on the Growth team. Before Hub, I was a Software Engineer at Facebook. Feel free to grab time on my calendar and can’t wait to chat with y’all!",
  }),
  user: undefined
};

export default function reducer(state: AppState = initialState, action: AppAction) {
  switch (action.type) {
    case "login":
      return state
    case "selectFilter":
      const { filter } = action
      return { ...state, selectedFilter: filter }
    default:
      return state
  }
};