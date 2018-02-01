import actionTypes from '../actions/actionTypes';
import { createAsyncAction, API } from './util';

const {
  MAKE_PAYMENT_SUCCESSFUL,
  MAKE_PAYMENT_FAILED,
  CLEAR_PAYMENT_SUCCESS_FLAG
} = actionTypes;

/**
 *
 * @param {*} cardDetails
 * @returns {function} - dispatch
 */
const makePayment = (cardDetails) => {
  return createAsyncAction(
    MAKE_PAYMENT_SUCCESSFUL,
    MAKE_PAYMENT_FAILED,
    () => API.post(
      'stripe-payments/charge/charges',
      { chargeParameter: cardDetails },
      (response) => {
        return { message: response.message };
      }
    )
  );
};

const clearPaymentSuccessFlag = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PAYMENT_SUCCESS_FLAG
    });
  };
};

export {
  makePayment,
  clearPaymentSuccessFlag
};

