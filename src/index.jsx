import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import store from './store/configureStore';
import App from './components/App';
import './styles/styles.css';


render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
