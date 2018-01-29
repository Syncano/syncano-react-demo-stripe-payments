import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const { GET_TOKEN_SUCCESSFUL, GET_TOKEN_FAILED } = actionTypes;

/**
   *
   * @param {*} state
   * @param {*} action
   * @return {state} object
   */
export default function generateTokenReducer(state = initialState.getToken, action) {
    switch (action.type) {
        case GET_TOKEN_SUCCESSFUL:
        console.log(state, 'im here state')
      return Object.assign({}, state, {
        ...action.payload
      });
    case GET_TOKEN_FAILED:
      return Object.assign({}, state, {
        ...action.error
      });
    default:
      return state;
  }
}

