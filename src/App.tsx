import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import { Home } from "views"
import { theme } from "theme/theme"
import { ThemeProvider as SCThemeProvider } from "styled-components"
import { ThemeProvider } from "@material-ui/core"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




class App extends React.Component {
  store = createStore(reducer)

  render() {
    return (
      <Provider store={this.store}>
        <SCThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route path="/">
                  <Home />
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
