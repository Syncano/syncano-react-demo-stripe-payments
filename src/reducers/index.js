import { combineReducers } from 'redux';
import paymentReducer from './paymentReducer';
import getTokenReducer from './generateTokenReducers';
import customerReducer from './customerReducer';

const rootReducer = combineReducers({
  customerReducer,
  paymentReducer,
  getTokenReducer,
});

export default rootReducer;
