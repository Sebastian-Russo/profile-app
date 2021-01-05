import {
  EDIT_NAME,
  EDIT_IMAGE
} from "../actions/users";


  const initialState = {
    error: null,
    loading: false,

    id: null, 
    username: "",
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

    return state;
  }
  
  export default userReducer;
