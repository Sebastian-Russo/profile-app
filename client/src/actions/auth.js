import jwtDecode from "jwt-decode";
import { SubmissionError } from "redux-form";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";
import { saveAuthToken, clearAuthToken } from "../local-storage";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const setAuthToken = (authToken) => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const CLEAR_AUTH = "CLEAR_AUTH";
export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const AUTH_REQUEST = "AUTH_REQUEST";
export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const authSuccess = (authToken, currentUser) => ({
  type: AUTH_SUCCESS,
  authToken,
  currentUser,
});

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = (error) => ({
  type: AUTH_ERROR,
  error,
});

export const ADD_FROM_USER_PROFILE = "ADD_FROM_USER_PROFILE";
export const addFromUserProfile = (nickName, profileImage) => ({
  type: ADD_FROM_USER_PROFILE,
  nickName,
  profileImage
});

const storeAuthInfo = (authToken, dispatch) => {
  const { user } = jwtDecode(authToken);
  dispatch(authSuccess(authToken, user)); // authSuccess(authToken, decodedToken.user)
  dispatch(addFromUserProfile(user.nickName, user.profileImage));
  saveAuthToken(authToken, user);
};

export const login = (username, password) => (dispatch) => {
  console.log("logging in with", username, password);
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => normalizeResponseErrors(res))
    .then((res) => res.json())
    .then(({ authToken }) => {
      return storeAuthInfo(authToken, dispatch);
    })
    .catch((err) => {
      console.log(err.code);
      const { code } = err;
      const message =
        code === 401
          ? "Incorrect username or password"
          : "Unable to login, please try again";
      dispatch(authError(err));
      return Promise.reject(
        new SubmissionError({
          _error: message,
        })
      );
    });
};

export const refreshAuthToken = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log("refreshing", authToken);
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => normalizeResponseErrors(res))
    .then((res) => res.json())
    .then(({ authToken }) => {
      return storeAuthInfo(authToken, dispatch);
    })
    .catch((err) => {
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken(authToken);
    });
};

export const logOut = () => async (dispatch) => {
  dispatch(
    // updateUserLists()
    );
  dispatch(clearAuth());
  clearAuthToken();
};
