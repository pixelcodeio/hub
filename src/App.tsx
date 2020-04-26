import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from './redux/reducer';
import thunk from 'redux-thunk';

import { ProfileView, HomeView, TeamsView, ResourcesView, CalendarView, SearchView, SignInView, SignUpView } from "views"
import { theme } from "theme/theme"
import { ThemeProvider as SCThemeProvider } from "styled-components"
import { ThemeProvider } from "@material-ui/core"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { NavBar, ScrollToTop } from "components"

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window { }
}

class App extends React.Component {
  store = createStore(reducer, applyMiddleware(thunk))

  componentDidMount() {
    document.title = "Hub";
  }

  render() {
    return (
      <Provider store={this.store}>
        <SCThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router>
              <NavBar />
              <Switch>
                <Route path="/signin">
                  <SignInView />
                </Route>
                <Route path="/signup">
                  <SignUpView />
                </Route>
                <Route path="/(home|)">
                  <HomeView />
                </Route>
                <Route path="/profile/:profileID">
                  <ProfileView />
                </Route>
                <Route path="/teams">
                  <TeamsView />
                </Route>
                <Route path="/search">
                  <SearchView />
                </Route>
                <Route path="/Resources">
                  <ResourcesView />
                </Route>
                <Route path="/Calendar">
                  <CalendarView />
                </Route>
              </Switch>
            </Router>
          </ThemeProvider>
        </SCThemeProvider>
      </Provider>
    )
  }
}

export default App;
