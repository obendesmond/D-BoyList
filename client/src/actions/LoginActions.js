import { OPEN_LOGIN_FORM, CLOSE_LOGIN_FORM } from "../actions/types";

export const openLoginForm = () => dispatch => {
  dispatch({
    type: OPEN_LOGIN_FORM
  });
};

export const closeLoginForm = () => dispatch => {
  dispatch({
    type: CLOSE_LOGIN_FORM
  });
};
