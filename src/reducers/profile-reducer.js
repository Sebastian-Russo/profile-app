import { 
  POST_NAME_SUCCESS, 
  POST_NAME_ERROR,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_ERROR,
  EDIT_NAME
} from '../actions/name-action';
import {
  UPDATE_IMAGE_STATE
} from '../actions/image-action';

const initState = {
    id: '1', 
    name: "Please enter your nickname", 
    image: {
      image: "",
      imageUrl: ""
    },
    error: null
}

const profileReducer = (state=initState, action) => {
  console.log('fire off reducer')

  if (action.type === POST_NAME_SUCCESS) {
    console.log('success')
    return Object.assign({}, state, {
      name: action.user.name,
      id: action.user._id,
    })
  }
  if (action.type === POST_NAME_ERROR) {
    return Object.assign({}, state, {
      error: action.error 
    })
  }

  if (action.type === UPDATE_NAME_SUCCESS) {
    console.log('success')
    return Object.assign({}, state, {
      name: action.user.name,
      id: action.user._id,
    })
  }
  if (action.type === UPDATE_NAME_ERROR) {
    return Object.assign({}, state, {
      error: action.error 
    })
  }

  if (action.type === UPDATE_IMAGE_STATE) {
    console.log(action)
    return Object.assign({}, state, { 
      image: { 
        image: action.imageData.image,
        imageUrl: action.imageData.imageUrl
      } 
    })
  }

  if (action.type === EDIT_NAME) {
    console.log(action)
    return Object.assign({}, state, {
      name: action.name
    })
  }

  return state;
}

export default profileReducer;

