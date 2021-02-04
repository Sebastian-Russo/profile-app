import {
  AUTH_ERROR,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  SET_AUTH_TOKEN
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
  switch (action.type) {
    case SET_AUTH_TOKEN: 
      return {
        ...state,
        authToken: action.authToken
      };
    case CLEAR_AUTH: 
      return {
        ...state,
        authToken: null,
        id: null
      };
    case AUTH_REQUEST:
      return {
        ...state,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.authToken,
        id: action.user.id,
        email: action.user.email, 
        username: action.user.username,
        nickName: action.user.nickName,
        imageFile: action.user.imageFile
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error 
      };
    default: 
      return state;
  }
}

