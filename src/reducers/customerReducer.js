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
      return Object.assign({}, state, {
        ...action.payload
      });
    case CREATE_CUSTOMER_FAILED:
      return Object.assign({}, state, {
        ...action.error
      });
    default:
      return state;
  }
}
