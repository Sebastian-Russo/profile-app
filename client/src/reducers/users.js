import {
  EDIT_NAME,
  EDIT_IMAGE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from "../actions/users";

  const initialState = {
    error: null,
    loading: false,

    // saving user as string in local storage, stringify, parse to change back into obj
    // attempting to get user nickName from local storage, other wise, default to string "please..."
    // ?. 'optional chaining'     if this obj exisit, 'user', ?. look up nickName, if it doesn't return undefined. because ||, defaults to 'please...'
    nickName: JSON.parse(localStorage.getItem('user'))?.nickName || "Please add a nick name", 
    imageFile: JSON.parse(localStorage.getItem('user'))?.imageFile || 
      {
        imageName: "",
        imageKey: "",
        imageUrl: "",
        id: ''
      }
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_NAME: 
        return {
          ...state, // copy current state obj
          nickName: action.nickName // overwrite part of state
        };
      case EDIT_IMAGE:
        return {
          ...state,
          imageFile: {
            imageName: action.imageFile.imageName,
            imageKey: action.imageFile.imageKey,
            imageUrl: action.imageFile.imageUrl
          }
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          nickName: action.user.nickName,
          imageFile: {
            imageUrl: action.user.imageFile.imageUrl,
            imageKey: action.user.imageFile.imageKey
          }
        };
      case UPDATE_USER_ERROR: 
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  }
  
  export default userReducer;
