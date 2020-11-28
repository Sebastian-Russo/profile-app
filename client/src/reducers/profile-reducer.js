import { 
  POST_NAME_SUCCESS, 
  POST_NAME_ERROR,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_ERROR
} from '../actions/name-action';
// import {
//   UPDATE_IMAGE_STATE,
//   UPDATE_IMAGE_SUCCESS,
//   UPDATE_IMAGE_ERROR
// } from '../actions/image-action';

const initState = {
    id: null, 
    name: "Please enter your nickname", 
    // imageProfile: {
    //   imageId: "",
    //   imageUrl: "",
    //   id: ''
    // },
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

  // if (action.type === UPDATE_IMAGE_STATE) {
  //   return Object.assign({}, state, { 
  //     imageProfile: { 
  //       imageId: action.imageData.imageProfile.imageId,
  //       imageUrl: action.imageData.imageProfile.imageUrl,
  //       id: action.imageData.imageProfile._id
  //     } 
  //   })
  // }

  // if (action.type === UPDATE_IMAGE_SUCCESS) {
  //   return Object.assign({}, state, {
  //     imageProfile: { 
  //       imageId: action.imageData.imageProfile.imageId,
  //       imageUrl: action.imageData.imageProfile.imageUrl,
  //       id: action.imageData.imageProfile._id
  //     }
  //   })
  // }
  // if (action.type === UPDATE_IMAGE_ERROR) {
  //   return Object.assign({}, state, {
  //     error: action.error 
  //   })
  // }

  return state;
}

export default profileReducer;

