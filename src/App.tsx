import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import { Home } from "views"
import { theme } from "theme/theme"
import { ThemeProvider as SCThemeProvider } from "styled-components"
import { ThemeProvider } from "@material-ui/core"



class App extends React.Component {
  store = createStore(reducer)

  render() {
    return (
      <Provider store={this.store}>
        <SCThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Home />
          </ThemeProvider>
        </SCThemeProvider>
      </Provider>
    )
  }
}

export default App;
