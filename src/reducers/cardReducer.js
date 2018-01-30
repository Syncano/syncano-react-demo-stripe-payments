import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const { CREATE_CARD_SUCCESSFUL, CREATE_CARD_FAILED } = actionTypes;

/**
   *
   * @param {*} state
   * @param {*} action
   * @return {state} object
   */
export default function cardReducer(state = initialState.card, action) {
  switch (action.type) {
    case CREATE_CARD_SUCCESSFUL:
      return Object.assign({}, state, {
        ...action.payload
      });
    case CREATE_CARD_FAILED:
      return Object.assign({}, state, {
        ...action.error
      });
    default:
      return state;
  }
}
