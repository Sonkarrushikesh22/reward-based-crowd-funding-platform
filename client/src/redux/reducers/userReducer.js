// Reducer related to user info, this is different from auth
// Because it does not concern itself with authentication, just describing the user

import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  info: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN_SUCCESS:
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        info: { ...action.payload.user },
      };
    case GOOGLE_SIGN_OUT:
    case GOOGLE_SIGN_IN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        info: null,
      };

    default:
      return state;
  }
};
