import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  REMOVE_ITEM,
  OPEN_ADD_ITEM_DIALOG,
  CLOSE_ADD_ITEM_DIALOG,
  ITEMS_LOADING
} from "../actions/types";

const initialState = {
  items: [],
  deletedItemId:'',
  addItemDialog: false,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.id)
      };
    case REMOVE_ITEM:
      return {
        ...state,
        deletedItemId: state.items.filter(item => item._id === action.id)[0]._id
      };
    case OPEN_ADD_ITEM_DIALOG:
      return {
        ...state,
        addItemDialog: true
      };
    case CLOSE_ADD_ITEM_DIALOG:
      return {
        ...state,
        addItemDialog: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
