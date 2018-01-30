import SyncanoClient from 'syncano-client';
import actionTypes from '../actions/actionTypes';


const s = new SyncanoClient(process.env.SYNCANO_INSTANCE);

const { GET_TOKEN_SUCCESSFUL, GET_TOKEN_FAILED } = actionTypes;

/**
 *
 * @param {*} tokenID
 * @returns {object} - action
 */
const getTokenSuccessful = (tokenID) => {
  return {
    type: GET_TOKEN_SUCCESSFUL,
    payload: { source: tokenID }
  };
};

/**
 *
 * @param {*} error
 * @returns {object} - action
 */
const getTokenFailed = (error) => {
  return {
    type: GET_TOKEN_FAILED,
    error
  };
};

/**
 *
 * @param {*} card
 * @returns {function} - dispatch
 */
const generateToken = (card) => {
  return (dispatch) => {
    const args = {
      tokenParams: {
        card
      }
    };
    return s
      .post('stripe-payments/tokens/token', args)
      .then((response) => {
        console.log(response, 'Im Token');
        if (response.statusCode === 200) {
          dispatch(getTokenSuccessful(response.data.id));
        }
      })
      .catch((error) => {
        dispatch(getTokenFailed(error));
      });
  };
};

export default generateToken;
