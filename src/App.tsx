import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import { Theme } from "components"
import { Home } from "views"

class App extends React.Component {
  store = createStore(reducer)

  render() {
    return (
      <Provider store={this.store}>
        <Theme>
          <Home />
        </Theme>
      </Provider>
    )
  }
}

export default App;
