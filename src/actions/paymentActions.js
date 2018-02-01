import SyncanoClient from 'syncano-client';
import actionTypes from '../actions/actionTypes';

const s = new SyncanoClient(process.env.SYNCANO_INSTANCE);

const {
  MAKE_PAYMENT_SUCCESSFUL,
  MAKE_PAYMENT_FAILED,
  CLEAR_PAYMENT_SUCCESS_FLAG
} = actionTypes;

/**
 *
 * @param {*} paymentResponse
 * @returns {object} - action
 */
const makePaymentSuccessful = (paymentResponse) => {
  return {
    type: MAKE_PAYMENT_SUCCESSFUL,
    payload: { message: paymentResponse }
  };
};

/**
 *
 * @param {*} error
 * @returns {object} - action
 */
const makePaymentFailed = (error) => {
  return {
    type: MAKE_PAYMENT_FAILED,
    error
  };
};

/**
 *
 * @param {*} cardDetails
 * @returns {function} - dispatch
 */
const makePayment = (cardDetails) => {
  return (dispatch) => {
    const args = { chargeParameter: cardDetails };
    return s
      .post('stripe-payments/charge/charges', args)
      .then((response) => {
        if (response.statusCode === 200) {
          dispatch(makePaymentSuccessful(response.message));
        }
      })
      .catch((error) => {
        dispatch(makePaymentFailed(error));
      });
  };
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

