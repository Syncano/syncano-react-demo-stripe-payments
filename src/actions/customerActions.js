import SyncanoClient from 'syncano-client';
import actionTypes from '../actions/actionTypes';


const s = new SyncanoClient(process.env.SYNCANO_INSTANCE);

const { CREATE_CUSTOMER_SUCCESSFUL, CREATE_CUSTOMER_FAILED } = actionTypes;

/**
 *
 * @param {*} customerParameterId
 * @returns {object} - action
 */
const createCustomerSuccessful = (customerParameterId) => {
  return {
    type: CREATE_CUSTOMER_SUCCESSFUL,
    payload: { customerId: customerParameterId }
  };
};

/**
 *
 * @param {*} error
 * @returns {object} - action
 */
const createCustomerFailed = (error) => {
  return {
    type: CREATE_CUSTOMER_FAILED,
    error
  };
};

/**
 *
 * @param {*} accountBalance
 * @returns {function} - dispatch
 */
const createCustomer = (accountBalance) => {
  return (dispatch) => {
    const args = { customerParameter: accountBalance };
    return s
      .post('stripe-payments/customers/customer', args)
      .then((response) => {
        if (response.statusCode === 200) {
          dispatch(createCustomerSuccessful(response.data.id));
        }
      })
      .catch((error) => {
        dispatch(createCustomerFailed(error));
      });
  };
};

export default createCustomer;
