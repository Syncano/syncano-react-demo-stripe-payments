import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const { MAKE_PAYMENT_SUCCESSFUL, MAKE_PAYMENT_FAILED, CLEAR_PAYMENT_SUCCESS_FLAG } = actionTypes;

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
        successFlag: true
      };
    case MAKE_PAYMENT_FAILED:
      return { ...state,
        error: action.error,
        successFlag: false
      };
    case CLEAR_PAYMENT_SUCCESS_FLAG:
      return { ...state,
        successFlag: null
      };
    default:
      return state;
  }
}
