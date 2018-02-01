import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import { API, createAsyncAction } from './util';


const {
  CREATE_CARD_SUCCESSFUL,
  CREATE_CARD_FAILED,
  DELETE_CARD_SUCCESSFUL,
  DELETE_CARD_FAILED
} = actionTypes;

/**
 *
 * @param {*} customerID - for creating card
 * @param {*} source - for creating card
 * @returns {function} - dispatch
 */
export const createCard = (customerID, source) => {
  return createAsyncAction(
    CREATE_CARD_SUCCESSFUL,
    CREATE_CARD_FAILED,
    () => API.post(
      'stripe-payments/cards/card',
      {
        customerID,
        cardParams: { source }
      },
      (response) => {
        return {
          cardID: response.data.id,
          brand: response.data.brand,
          last4: response.data.last4,
          exp_month: response.data.exp_month,
          exp_year: response.data.exp_year
        };
      }
    )
  );
};

// export const deleteCard = (customerID, cardID) => {
//   return createAsyncAction(
//     DELETE_CARD_SUCCESSFUL,
//     DELETE_CARD_FAILED,
//     () => API.delete(
//       'stripe-payments/cards/card',
//       { customerID, cardID },
//       (response) => {
//         return { data: { cardID: response.data.id } };
//       }
//     )
//   );
// };
export const deleteCard = (customerID, cardID) => {
  return (dispatch) => {
    const args = { customerID, cardID };
    return axios({
      data: args,
      method: 'DELETE',
      url: `${process.env.TESTDELETE}/stripe-payments/cards/card/`,
    })
      .then((response) => {
        if (response.data.message === 'Card Deleted') {
          dispatch({
            type: DELETE_CARD_SUCCESSFUL,
            payload: {
              data: { cardID: response.data.id } }
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: DELETE_CARD_FAILED,
          error,
        });
      });
  };
};
