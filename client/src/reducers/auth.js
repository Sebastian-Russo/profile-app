import {
  AUTH_ERROR,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  SET_AUTH_TOKEN,
} from "../actions/auth";

const initialState = {
  id: null, 
  error: null,
  loading: false,
  username: "",
  authToken: null, 
  userProfile: null
};

export default function authReducer(state = initialState, action) {
  let answer;
  if (action.type === SET_AUTH_TOKEN) {
    answer = Object.assign({}, state, {
      authToken: action.authToken,
    });
    console.log("SET_AUTH_TOKEN");
    return answer;
  } else if (action.type === CLEAR_AUTH) {
    answer = Object.assign({}, state, {
      authToken: null,
      id: null,
    });
    console.log("CLEAR_AUTH");
    return answer;
  } else if (action.type === AUTH_REQUEST) {
    answer = Object.assign({}, state, {
      loading: true,
      error: null,
    });
    console.log("AUTH_REQUEST");
    return answer;
  } else if (action.type === AUTH_SUCCESS) {
    answer = Object.assign({}, state, {
      loading: false,
      id: action.currentUser.id,
      authToken: action.authToken,
      username: action.currentUser.username,
    });
    console.log("AUTH_SUCCESS");
    return answer;
  } else if (action.type === AUTH_ERROR) {
    answer = Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
    console.log("AUTH_ERROR");
    return answer;
  }

  return state;
}
