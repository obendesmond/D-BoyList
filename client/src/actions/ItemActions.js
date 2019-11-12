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
    .catch(err => console.log(err));
};

// add item
export const addItem = item => dispatch => {
  axios
    .post("/api/items", item)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// delete item
export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ITEM,
        id
      });
    })
    .catch(err => console.error(err));
};
// remove item
export const removeItem = id => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    id
  });
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
