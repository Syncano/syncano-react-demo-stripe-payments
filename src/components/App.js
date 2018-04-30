import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from './common/Header';
import Home from './Home';
import Payment from './Payment';
import Cards from './Cards';

/**
 * App component
 * Parent to other components
 * @class App
 * @extends {React.Component}
 * @render {render()}
 */
class App extends React.Component {
  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/payment" component={Payment} />
        <Route path="/cards" component={Cards} />
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired
};

export default App;
