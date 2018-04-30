import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const { CREATE_CUSTOMER_SUCCESSFUL, CREATE_CUSTOMER_FAILED } = actionTypes;

/**
   *
   * @param {*} state
   * @param {*} action
   * @return {state} object
   */
export default function customerReducer(state = initialState.customer, action) {
  switch (action.type) {
    case CREATE_CUSTOMER_SUCCESSFUL:
      return { ...state,
        customerId: action.payload.customerId,
        successFlag: true
      };
    case CREATE_CUSTOMER_FAILED:
      return { ...state,
        error: action.error,
        successFlag: false
      };
    default:
      return state;
  }
}
