import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  REMOVE_ITEM,
  OPEN_ADD_ITEM_DIALOG,
  CLOSE_ADD_ITEM_DIALOG,
  ITEMS_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./AuthActions";
import { returnErrors } from "./ErrorActions";
import { openLoginForm } from "./LoginActions";

// get all items
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// add item
export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// delete item
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_ITEM,
        id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// remove item
export const removeItem = id => (dispatch, getState) => {
  const isAuthenticated = getState().AuthReducer.isAuthenticated;

  if (isAuthenticated === true) {
    dispatch({
      type: REMOVE_ITEM,
      id
    });
  } else {
    dispatch(openLoginForm());
  }
};

// dialog
export const openItemDialog = () => dispatch => {
  dispatch({
    type: OPEN_ADD_ITEM_DIALOG
  });
};
export const closeItemDialog = () => dispatch => {
  dispatch({
    type: CLOSE_ADD_ITEM_DIALOG
  });
};

export const setItemsLoading = () => dispatch => {
  dispatch({
    type: ITEMS_LOADING
  });
};
