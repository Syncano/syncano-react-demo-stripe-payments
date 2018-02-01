import actionTypes from '../actions/actionTypes';
import { createAsyncAction, API } from './util';

const { CREATE_CUSTOMER_SUCCESSFUL, CREATE_CUSTOMER_FAILED } = actionTypes;
/**
 *
 * @param {*} accountBalance
 * @returns {function} - dispatch
 */
const createCustomer = (accountBalance) => {
  return createAsyncAction(
    CREATE_CUSTOMER_SUCCESSFUL,
    CREATE_CUSTOMER_FAILED,
    () => API.post(
      'stripe-payments/customers/customer',
      {
        customerParameter: accountBalance
      },
      (response) => {
        if (localStorage.getItem('customerId') === null) {
          localStorage.setItem('customerId', response.data.id);
          return {
            customerId: localStorage.customerId
          };
        } return {
          customerId: localStorage.customerId
        };
      }
    )
  );
};

export default createCustomer;
