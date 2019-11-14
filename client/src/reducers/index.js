import { combineReducers } from "redux";
import ItemReducer from "./ItemReducer";
import ErrorReducer from "./ErrorReducer";
import AuthReducer from "./AuthReducer";
import RegistrationReducer from "./RegistrationReducer";
import LoginReducer from "./LoginReducer";

export default combineReducers({
  ItemReducer,
  ErrorReducer,
  AuthReducer,
  RegistrationReducer,
  LoginReducer
});
