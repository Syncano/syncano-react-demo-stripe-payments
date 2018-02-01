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
    if (localStorage.getItem('customerId') === null) {
      return s
        .post('stripe-payments/customers/customer', args)
        .then((response) => {
          if (response.statusCode === 200) {
            localStorage.setItem('customerId', response.data.id);
            dispatch(createCustomerSuccessful(localStorage.customerId));
          }
        })
        .catch((error) => {
          dispatch(createCustomerFailed(error));
        });
    }
    dispatch(createCustomerSuccessful(localStorage.customerId));
  };
};

export default createCustomer;
