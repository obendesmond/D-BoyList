import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGOUT_SUCCESS
} from "../actions/types";
import { returnErrors } from "./ErrorActions";

// load user
export const loadUser = () => (dispatch, getState) => {
  /*
        getState gives access to our states(reducers)
    */
  // set user loading to true
  dispatch({ type: USER_LOADING });

  //   fetch the user, add header configs too (config)
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// register user
export const register = ({ name, email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // stringify request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// login user
export const login = ({ email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // stringify request body
  const body = JSON.stringify({ email, password });

  // login axios
  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// set up config/header and token
export const tokenConfig = getState => {
  // get token from auth reducer which is from local storage
  const token = getState().AuthReducer.token;

  //   set headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //   if token, add to header
  if (token) {
    //   check headers name in server backend (x-auth-token)
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
