import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import store from './store/configureStore';
import App from './components/App';
import './styles/styles.css';


// const history = createBrowserHistory();

render(
  <Provider store={store}>
    {/* <Router history={history}> */}
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
