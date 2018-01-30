import { combineReducers } from 'redux';
import paymentReducer from './paymentReducer';
import getTokenReducer from './generateTokenReducers';
import customerReducer from './customerReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  customerReducer,
  paymentReducer,
  getTokenReducer,
  cardReducer,
});

export default rootReducer;
