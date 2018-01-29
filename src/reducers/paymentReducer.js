import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const { MAKE_PAYMENT_SUCCESSFUL, MAKE_PAYMENT_FAILED } = actionTypes;

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {state} object
 */
export default function paymentReducer(state = initialState.payment, action) {
  switch (action.type) {
    case MAKE_PAYMENT_SUCCESSFUL:
      return Object.assign({}, state, {
        ...action.payload
      });
    case MAKE_PAYMENT_FAILED:
      return Object.assign({}, state, {
        ...action.error
      });
    default:
      return state;
  }
}
