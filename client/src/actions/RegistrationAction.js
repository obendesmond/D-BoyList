import { OPEN_REG_FORM, CLOSE_REG_FORM } from "../actions/types";

export const openRegForm = () => dispatch => {
  dispatch({
    type: OPEN_REG_FORM
  });
};

export const closeRegForm = () => dispatch => {
  dispatch({
    type: CLOSE_REG_FORM
  });
};
