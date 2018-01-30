import SyncanoClient from 'syncano-client';
import actionTypes from '../actions/actionTypes';


const s = new SyncanoClient(process.env.SYNCANO_INSTANCE);

const { CREATE_CARD_SUCCESSFUL, CREATE_CARD_FAILED } = actionTypes;

/**
 *
 * @param {*} cardResponse
 * @returns {object} - action
 */
const createCardSuccessful = (cardResponse) => {
  return {
    type: CREATE_CARD_SUCCESSFUL,
    payload: cardResponse
  };
};

/**
 *
 * @param {*} error
 * @returns {object} - action
 */
const createCardFailed = (error) => {
  return {
    type: CREATE_CARD_FAILED,
    error
  };
};

/**
 *
 * @param {*} cardParams
 * @returns {function} - dispatch
 */
const createCard = (customerID, source) => {
    console.log(source, 'sauceActions')
  return (dispatch) => {
    //   console.log(cardParams, 'card parameter')
    const args = { customerID,
      cardParams: { source }
    };
    return s
      .post('stripe-payments/cards/card', args)
      .then((response) => {
        console.log('im card', response)
        if (response.statusCode === 200) {
          dispatch(createCardSuccessful(response));
        }
      })
      .catch((error) => {
        dispatch(createCardFailed(error));
      });
  };
};

export default createCard;
