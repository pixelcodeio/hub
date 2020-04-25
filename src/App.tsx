import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import { HomeView, TeamsView, ResourcesView, CalendarView } from "views"
import { theme } from "theme/theme"
import { ThemeProvider as SCThemeProvider } from "styled-components"
import { ThemeProvider } from "@material-ui/core"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { NavBar } from "components"

class App extends React.Component {
  store = createStore(reducer)

  render() {
    return (
      <Provider store={this.store}>
        <SCThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router>
              <NavBar />
              <Switch>
                <Route path="/(home|)">
                  <HomeView />
                </Route>
                <Route path="/teams">
                  <TeamsView />
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
