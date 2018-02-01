import axios from 'axios';
import SyncanoClient from 'syncano-client';
import actionTypes from '../actions/actionTypes';


const s = new SyncanoClient(process.env.SYNCANO_INSTANCE);

const {
  CREATE_CARD_SUCCESSFUL,
  CREATE_CARD_FAILED,
  DELETE_CARD_SUCCESSFUL,
  DELETE_CARD_FAILED
} = actionTypes;

/**
 *
 * @param {*} cardResponse
 * @returns {object} - action
 */
const createCardSuccessful = (cardResponse) => {
  return {
    type: CREATE_CARD_SUCCESSFUL,
    payload: { data: cardResponse }
  };
};

/**
 *
 * @param {*} error
 * @returns {object} - action
 */
const createCardFailed = (error) => {
  return {
    error,
    type: CREATE_CARD_FAILED
  };
};

/**
 *
 * @param {*} cardResponse
 * @returns {object} - action
 */
const deleteCardSuccessful = (cardResponse) => {
  return {
    type: DELETE_CARD_SUCCESSFUL,
    payload: { data: cardResponse }
  };
};
  /**
   *
   * @param {*} error
   * @returns {object} - action
   */
const deleteCardFailed = (error) => {
  return {
    error,
    type: DELETE_CARD_FAILED
  };
};

/**
 *
 * @param {*} customerID - for creating card
 * @param {*} source - for creating card
 * @returns {function} - dispatch
 */
export const createCard = (customerID, source) => {
  return (dispatch) => {
    const args = {
      customerID,
      cardParams: { source }
    };
    return s
      .post('stripe-payments/cards/card', args)
      .then((response) => {
        if (response.statusCode === 200) {
          dispatch(createCardSuccessful({
            cardID: response.data.id,
            brand: response.data.brand,
            last4: response.data.last4,
            exp_month: response.data.exp_month,
            exp_year: response.data.exp_year }));
        }
      })
      .catch((error) => {
        dispatch(createCardFailed(error));
      });
  };
};

export const deleteCard = (customerID, cardID) => {
  return (dispatch) => {
    const args = { customerID, cardID };
    return axios({
      data: args,
      method: 'DELETE',
      url: 'https://api.syncano.io/v2/instances/dry-dream-7999/endpoints/sockets/stripe-payments/cards/card/',
    })
      .then((response) => {
        if (response.data.message === 'Card Deleted') {
          dispatch(deleteCardSuccessful({
            cardID: response.data.id,
          }));
        }
      })
      .catch((error) => {
        dispatch(deleteCardFailed(error));
      });
  };
};
