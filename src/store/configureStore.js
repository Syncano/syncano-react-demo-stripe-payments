import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

const composeEnhancers = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  reduxImmutableStateInvariant()
));

const store = createStore(rootReducer, composeEnhancers);

export default store;
