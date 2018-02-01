import actionTypes from '../actions/actionTypes';
import { createAsyncAction, API } from './util';

const {
  GET_TOKEN_SUCCESSFUL,
  GET_TOKEN_FAILED,
  CLEAR_TOKEN_SUCCESS_FLAG
} = actionTypes;

/**
 *
 * @param {*} card
 * @returns {function} - dispatch
 */
const generateToken = (card) => {
  return createAsyncAction(
    GET_TOKEN_SUCCESSFUL,
    GET_TOKEN_FAILED,
    () => API.post(
      'stripe-payments/tokens/token',
      {
        tokenParams: { card }
      },
      (response) => {
        return { source: response.data.id };
      }
    )
  );
};

const clearTokenSuccessFlag = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_TOKEN_SUCCESS_FLAG
    });
  };
};

export {
  generateToken,
  clearTokenSuccessFlag
};
