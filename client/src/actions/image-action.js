import axios from "axios";
import { API_BASE_URL } from '../config';

// ********* UPATE STATE ********** 
export const UPDATE_IMAGE_STATE = "UPDATE_IMAGE_STATE";
export const updateImageState = imageData => {
  console.log('update image state action', imageData)
  return {
    type: UPDATE_IMAGE_STATE,
    imageData
  }
}

// ******* POST IMAGE ******** 

export const POST_IMAGE_SUCCESS = "POST_IMAGE_SUCCESS";
export const postImageSuccess = imageData => {
  return {
    type: POST_IMAGE_SUCCESS,
    imageData
  }
}

export const POST_IMAGE_ERROR = "POST_IMAGE_ERROR";
export const postImageError = error => {
  return {
    type: POST_IMAGE_ERROR,
    error
  }
}

export const postImageRequest = imageData => {
  console.log('post image request', imageData)
  return(dispatch) => {
    return axios.post(`${API_BASE_URL}/user/image`, imageData)
      .then((res) => {
        dispatch(postImageSuccess(res.data));
      })
      .catch(err => {
        dispatch(postImageError(err))
      });
  }
}

// ******* UPDATE IMAGE ******** 

export const UPDATE_IMAGE_SUCCESS = "UPDATE_IMAGE_SUCCESS";
export const updateImageSuccess = imageData => {
  return {
    type: UPDATE_IMAGE_SUCCESS,
    imageData
  }
}

export const UPDATE_IMAGE_ERROR = "UPDATE_IMAGE_ERROR";
export const updateImageError = error => {
  return {
    type: UPDATE_IMAGE_ERROR,
    error
  }
}

export const updateImageRequest = imageData => {
  return(dispatch) => {
    return axios.put(`${API_BASE_URL}/user/image/${imageData.id}`, imageData)
      .then((res) => {
        dispatch(updateImageSuccess(res.data));
      })
      .catch(err => {
        dispatch(updateImageError(err))
      });
  }
}

// Plan to expand and create user sign in, would need GET req
// ******* GET IMAGE ******** 

// export const FETCH_IMAGE_SUCCESS = "FETCH_IMAGE_SUCCESS";
// export const fetchImageSuccess = user => {
//   return {
//     type: FETCH_IMAGE_SUCCESS,
//     user
//   }
// }

// export const FETCH_IMAGE_ERROR = "FETCH_IMAGE_ERROR";
// export const fetchImageError = error => {
//   return {
//     type: FETCH_IMAGE_ERROR,
//     error
//   }
// }

// export const fetchImageRequest = user => {
//   return(dispatch) => {
//     return axios.get(`${API_BASE_URL}/user/${user.id}`)
//       .then((res) => {
//         dispatch(fetchImageSuccess(res.data));
//       })
//       .catch(err => {
//         dispatch(fetchImageError(err))
//       });
//   }
// }




