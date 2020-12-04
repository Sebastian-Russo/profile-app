// import {
//   POST_IMAGE_SUCCESS,
//   POST_IMAGE_ERROR,
//   UPDATE_IMAGE_STATE,
//   UPDATE_IMAGE_SUCCESS,
//   UPDATE_IMAGE_ERROR
// } from '../actions/image-action';

// const initState = {
//   imageId: "",
//   imageUrl: "",
//   id: "",
//   error: null
// }

// const imageReducer = (state=initState, action) => {

//   if (action.type === UPDATE_IMAGE_STATE) {
//     console.log(action)
//     return Object.assign({}, state, { 
//       imageId: action.imageData.imageProfile.imageId,
//       imageUrl: action.imageData.imageProfile.imageUrl,
//       id: action.imageData.imageProfile._id
//     })
//   }

//   if (action.type === POST_IMAGE_SUCCESS) {
//     console.log(action)
//     return Object.assign({}, state, {
//       imageId: action.imageData.imageProfile.imageId,
//       imageUrl: action.imageData.imageProfile.imageUrl,
//       id: action.imageData.imageProfile._id
//     })
//   }
//   if (action.type === POST_IMAGE_ERROR) {
//     return Object.assign({}, state, {
//       error: action.error 
//     })
//   }

//   if (action.type === UPDATE_IMAGE_SUCCESS) {
//     console.log(action)
//     return Object.assign({}, state, {
//       imageId: action.imageData.imageProfile.imageId,
//       imageUrl: action.imageData.imageProfile.imageUrl,
//       id: action.imageData.imageProfile._id
//     })
//   }
//   if (action.type === UPDATE_IMAGE_ERROR) {
//     return Object.assign({}, state, {
//       error: action.error 
//     })
//   }

//   return state;
// }

// export default imageReducer; 
