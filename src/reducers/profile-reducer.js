import { 
  POST_NAME_SUCCESS, 
  POST_NAME_ERROR,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_ERROR
} from '../actions/name-action';
import {
  UPDATE_IMAGE_STATE,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_ERROR
} from '../actions/image-action';

const initState = {
    id: '1', 
    name: "Please enter your nickname", 
    image: {
      imageId: "",
      imageUrl: ""
    },
    error: null
}

const profileReducer = (state=initState, action) => {

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
    console.log('update image state', action)
    return Object.assign({}, state, { 
      image: { 
        imageId: action.imageData.imageId,
        imageUrl: action.imageData.imageUrl
      } 
    })
  }

  if (action.type === UPDATE_IMAGE_SUCCESS) {
    console.log('update image success')
    return Object.assign({}, state, {
      image: { 
        imageId: action.imageData.imageId,
        imageUrl: action.imageData.imageUrl
      }, 
      id: action.user._id,
    })
  }
  if (action.type === UPDATE_IMAGE_ERROR) {
    return Object.assign({}, state, {
      error: action.error 
    })
  }

  return state;
}

export default profileReducer;

