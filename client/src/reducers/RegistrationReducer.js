import { OPEN_REG_FORM, CLOSE_REG_FORM } from "../actions/types";

const initialState = {
  showRegForm: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_REG_FORM:
      return {
        showRegForm: true
      };
    case CLOSE_REG_FORM:
      return {
        showRegForm: false
      };
    default:
      return state;
  }
}
