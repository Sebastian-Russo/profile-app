import {
  EDIT_NAME,
  EDIT_IMAGE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from "../actions/users";


  const initialState = {
    error: null,
    loading: false,

    id: null, 
    username: "",
    email: null,
    authToken: null, 

    nickName: "Please add a nick name", 
    imageFile: {
      imageName: "",
      imageKey: "",
      imageUrl: "",
      id: ''
    }
  };
  
  const userReducer = (state = initialState, action) => {
    if (action.type === EDIT_NAME) {
      console.log('USER REDUCER', action.type, action.nickName)
      return Object.assign({}, state, {
          nickName: action.nickName
      })
    }
    if (action.type === EDIT_IMAGE) {
      return Object.assign({}, state, {
          imageFile: {
            imageName: action.imageFile.imageName,
            imageKey: action.imageFile.imageKey,
            imageUrl: action.imageFile.imageUrl
          }
      })
    }

    if (action.type === UPDATE_USER_SUCCESS) {
      console.log('UPDATE USER SUCCESS', action)
      return Object.assign({}, state, {
        nickName: action.nickName,
        imageFile: {
          imageUrl: action.user.imageFile.imageUrl,
          imageName: action.user.imageFile.name,
          imageKey: action.user.imageFile.imageKey
        }
      })
    }
    if (action.type === UPDATE_USER_ERROR) {
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    }

    return state;
  }
  
  export default userReducer;
