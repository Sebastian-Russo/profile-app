import jwtDecode from "jwt-decode";
import { SubmissionError } from "redux-form";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";
import { saveAuthToken, clearAuthToken, updateNickName, updateImage } from "../local-storage";

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
export const authSuccess = (authToken, user) => ({
  type: AUTH_SUCCESS,
  authToken,
  user,
});

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = (error) => ({
  type: AUTH_ERROR,
  error,
});

export const ADD_USER_PROFILE = "ADD_USER_PROFILE";
export const addUserProfile = (nickName, imageFIle) => ({
  type: ADD_USER_PROFILE,
  nickName,
  imageFIle
});

const storeAuthInfo = (authToken, dispatch) => {
  const { user } = jwtDecode(authToken);
  dispatch(authSuccess(authToken, user)); // authSuccess(authToken, decodedToken.user)
  /****** CAUSING LOGIN ERROR  "Unable to login, please try again" *******/
  // dispatch(addUserProfile(user.nickName, user.imageFIle));
  console.log(user)
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

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = ( user ) => ({
    type: UPDATE_USER_SUCCESS,
    user
})

export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const updateUserError = error => ({
    type: UPDATE_USER_ERROR,
    error
})

export const updateUserRequest = () => (dispatch, getState) => {
    const { auth, user } = getState();
    console.log('udateUserReq', user)
    fetch(`${API_BASE_URL}/users/${auth.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${auth.authToken}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            id: auth.id,
            nickName: user.nickName,
            imageFile: {
              imageKey: user.imageFile.imageKey,
              imageUrl: user.imageFile.imageUrl
            }
        })
    })  
    .then(res => res.json())  
    .then(json => {
      console.log('FIRE OFF UPDATE USER SUCCESS', json)
        // dispatch(updateUserSuccess(json))
        // dispatch(updateNickName(user.nickName))
        // dispatch(updateImage(user.imageFile))
    })
    .catch(err => {
        dispatch(updateUserError(err))
    });
};

export const logOut = () => async (dispatch) => {
  dispatch(clearAuth());
  clearAuthToken();
};
