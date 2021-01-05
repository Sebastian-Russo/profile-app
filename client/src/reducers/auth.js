import {
  AUTH_ERROR,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  SET_AUTH_TOKEN,
  // ADD_USER_PROFILE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from "../actions/auth";

const initialState = {
  id: null, 
  error: null,
  loading: false,
  username: "",
  email: null,
  authToken: null, 
  nickName: "Please add a nick name",
  imageFile: {
    imageUrl: "",
    imageKey: ""
  }
};

export default function authReducer(state = initialState, action) {
  let answer;
  if (action.type === SET_AUTH_TOKEN) {
    answer = Object.assign({}, state, {
      authToken: action.authToken,
    });
    return answer;
  } else if (action.type === CLEAR_AUTH) {
    answer = Object.assign({}, state, {
      authToken: null,
      id: null,
    });
    return answer;
  } else if (action.type === AUTH_REQUEST) {
    answer = Object.assign({}, state, {
      loading: true,
      error: null,
    });
    return answer;
  } else if (action.type === AUTH_SUCCESS) {
    answer = Object.assign({}, state, {
      loading: false,
      authToken: action.authToken,
      id: action.user.id,
      email: action.user.email, 
      username: action.user.username,
      nickName: action.user.nickName,
      imageFile: action.user.imageFile
    });
    return answer;
  } else if (action.type === AUTH_ERROR) {
    answer = Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
    return answer;
  }
  
  return state;
}
