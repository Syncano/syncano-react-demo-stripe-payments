import actionTypes from '../actions/actionTypes';
import initialState from './initialState';
import helpers from '../components/utils/helpers';

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
      return { ...state,
        message: action.payload.message,
        responseType: helpers.MAKE_PAYMENT_SUCCESSFUL
      };
    case MAKE_PAYMENT_FAILED:
      return Object.assign({}, state, {
        ...action.error
      });
    default:
      return state;
  }
}
