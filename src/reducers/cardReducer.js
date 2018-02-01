import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const {
  CREATE_CARD_SUCCESSFUL,
  CREATE_CARD_FAILED,
  DELETE_CARD_SUCCESSFUL,
  DELETE_CARD_FAILED } = actionTypes;

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {state} object
 */
export default function cardReducer(state = initialState.card, action) {
  switch (action.type) {
    case CREATE_CARD_SUCCESSFUL:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload
        ],
        successFlag: true
      };
    case CREATE_CARD_FAILED:
      return { ...state,
        error: action.error,
        successFlag: false
      };
    case DELETE_CARD_SUCCESSFUL:
      return {
        data: [...state.data]
          .filter(data => (
            data === action.payload.data.cardID
          )),
        successFlag: true
      };
    case DELETE_CARD_FAILED:
      return { ...state,
        error: action.error,
        successFlag: false
      };
    default:
      return state;
  }
}
