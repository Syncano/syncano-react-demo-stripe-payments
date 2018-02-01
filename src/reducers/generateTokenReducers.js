import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const { GET_TOKEN_SUCCESSFUL, GET_TOKEN_FAILED, CLEAR_TOKEN_SUCCESS_FLAG } = actionTypes;

/**
   *
   * @param {*} state
   * @param {*} action
   * @return {state} object
   */
export default function generateTokenReducer(state = initialState.getToken, action) {
  switch (action.type) {
    case GET_TOKEN_SUCCESSFUL:
      return { ...state,
        source: action.payload.source,
        successFlag: true
      };
    case GET_TOKEN_FAILED:
      return { ...state,
        error: action.error,
        successFlag: false
      };
    case CLEAR_TOKEN_SUCCESS_FLAG:
      return { ...state,
        successFlag: null
      };
    default:
      return state;
  }
}

