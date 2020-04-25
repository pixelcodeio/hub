import {
  AppAction,
  Anniversary,
  Announcement,
  CalendarEvent,
  Employee,
  FeedPost,
  NewHire,
  Page,
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
  selectedFilters: string[]
  feed: FeedPost[]
  profile: Employee
  currentPage: Page,
}

const announcement = {
  title: "All of our offices will be shutting down and moving to remote effective 2/1/20",
  date: "Feburary 1, 2020",
}

const personalSite = {
  url: "omarrasheed.com",
  description: "I write essays on my personal site every week. Feel free to check it out :)",
}

const featuredPosts = [
  {
    title: "Summer in Seattle!",
    body: "Getting dinner with Young Kim and Kevin Chan",
    imageURL: "https://files.slack.com/files-pri/T012HSXD00J-F012BKJ9JJJ/cd1f8e21-64bc-40ef-bb28-59d5559b328c_1_105_c.jpeg",
  },
  {
    title: "Summer in Seattle!",
    body: "Getting dinner with Young Kim and Kevin Chan",
    imageURL: "https://files.slack.com/files-pri/T012HSXD00J-F012H0JTDE1/7eea3a82-2991-42e6-be2c-7141f1e07df8_1_105_c.jpeg",
  },
]

const kevin = {
  name: "Kevin Chan",
  title: "Software Engineer",
  team: "Growth",
  imageURL: "https://avatars3.githubusercontent.com/u/26048121?s=460&u=44d4282c153eb74566058f37df899e8e161c2044&v=4",
  blurb: "Hi 👋 I’m Omar and I joined Figma after I graduated from Cornell University. Previously, I interned 3 times in all of the Facebook offices (MPK, Seattle, NYC). I am a beast in code and I like to shoot soccer balls over the net. In my free time, I like to play League with Kevin Chan.",
  interests: ["soccer", "spikeball", "reading", "cooking", "hip-hop"],
  email: "omar@figma.com",
  office: "NYC",
  birthday: "February 7",
  pronouns: "he/him",
  joinDate: "August 18, 2018",
  twitter: "@omar",
  linkedin: "linkedin.com/in/omar",
  facebook: "facebook.com/omar",
  instagram: "@omar",
  personalSite,
  featuredPosts,
}

const omar = {
  name: "Omar Rasheed",
  title: "Software Engineer",
  team: "Core Product",
  imageURL: "https://ca.slack-edge.com/T012HSXD00J-U012HSXKLKC-6427b1cd736c-512",
  blurb: "Hi 👋 I’m Omar and I joined Figma after I graduated from Cornell University. Previously, I interned 3 times in all of the Facebook offices (MPK, Seattle, NYC). I am a beast in code and I like to shoot soccer balls over the net. In my free time, I like to play League with Kevin Chan.",
  interests: ["soccer", "spikeball", "reading", "cooking", "hip-hop"],
  manager: kevin,
  email: "omar@figma.com",
  office: "NYC",
  birthday: "February 7",
  pronouns: "he/him",
  joinDate: "August 18, 2018",
  twitter: "@omar",
  linkedin: "linkedin.com/in/omar",
  facebook: "facebook.com/omar",
  instagram: "@omar",
  personalSite,
  featuredPosts,
}

const tk = {
  name: "TK Kong",
  title: "Product Designer",
  team: "Growth",
  imageURL: "https://avatars3.githubusercontent.com/u/26048121?s=460&u=44d4282c153eb74566058f37df899e8e161c2044&v=4",
  blurb: "Hi 👋 I’m Omar and I joined Figma after I graduated from Cornell University. Previously, I interned 3 times in all of the Facebook offices (MPK, Seattle, NYC). I am a beast in code and I like to shoot soccer balls over the net. In my free time, I like to play League with Kevin Chan.",
  interests: ["soccer", "spikeball", "reading", "cooking", "hip-hop"],
  manager: kevin,
  email: "omar@figma.com",
  office: "NYC",
  birthday: "February 7",
  pronouns: "he/him",
  joinDate: "August 18, 2018",
  twitter: "@omar",
  linkedin: "linkedin.com/in/omar",
  facebook: "facebook.com/omar",
  instagram: "@omar",
  personalSite,
  featuredPosts,
}

const thanks = {
  from: tk,
  to: kevin,
  message: "Thank you sir.",
  date: "February 1, 2020"
}

const dailyUpdate = {
  employee: tk,
  message: "Today, I am working on squashing some bugs and tomorrow probably too. Going to be busy with some other things probably.",
  date: "February 1, 2020"
}

export const initialState: AppState = {
  currentPage: "Profile",
  companyName: "Figma",
  profile: omar,
  calendarEvents: Array(5).fill({
    name: "Engineering Standup",
    time: "10:30AM - 11:30AM"
  }),
  selectedFilters: ["All"],
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
  announcements: Array(5).fill(announcement),
  newHires: Array(6).fill({
    name: "Kevin Chan",
    title: "Software Engineer",
    team: "Growth",
    imageURL: "https://avatars3.githubusercontent.com/u/26048121?s=460&u=44d4282c153eb74566058f37df899e8e161c2044&v=4",
    blurb: "Hi! My name is Kevin and I am very excited to join as a Software Engineer on the Growth team. Before Hub, I was a Software Engineer at Facebook. Feel free to grab time on my calendar and can’t wait to chat with y’all!",
  }),
  user: undefined,
  feed: [
    {
      type: "Thanks",
      thanks,
    },
    {
      type: "DailyUpdate",
      dailyUpdate,
    },
    {
      type: "Thanks",
      thanks,
    },
    {
      type: "DailyUpdate",
      dailyUpdate,
    },
    {
      type: "Thanks",
      thanks,
    },
    {
      type: "DailyUpdate",
      dailyUpdate,
    },
  ]
};

export default function reducer(state: AppState = initialState, action: AppAction): AppState {
  const { selectedFilters } = state
  switch (action.type) {
    case "login":
      return state
    case "fetchProfile":
      const { data } = action
      return state
    case "selectFilter":
      const { filter } = action
      const allFilterPrevSelected = selectedFilters.includes("All")
      if (filter === "All") {
        if (allFilterPrevSelected) {
          return { ...state, selectedFilters }
        } else {
          return { ...state, selectedFilters: ["All"] }
        }
      }
      let filters = selectedFilters
      if (allFilterPrevSelected) {
        filters = filters.filter(f => f !== "All")
      }
      filters = filters.includes(filter)
        ? filters.filter(f => f !== filter)
        : [...filters, filter]
      return { ...state, selectedFilters: filters }
    case "setCurrentPage":
      return { ...state, currentPage: action.page }
    default:
      return state
  }
};