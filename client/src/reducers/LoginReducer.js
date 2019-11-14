import { OPEN_LOGIN_FORM, CLOSE_LOGIN_FORM } from "../actions/types";

const initialState = {
  showLoginForm: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_FORM:
      return {
        showLoginForm: true
      };
    case CLOSE_LOGIN_FORM:
      return {
        showLoginForm: false
      };
    default:
      return state;
  }
}
