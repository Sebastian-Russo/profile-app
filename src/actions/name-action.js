import axios from "axios";
import { API_BASE_URL } from '../config';



// ******* POST NAME ******** 

export const EDIT_NAME = "EDIT_NAME";
export const editName = name => {
  console.log(name)
  return {
    type: EDIT_NAME,
    name
  }
}

export const POST_NAME_SUCCESS = "POST_NAME_SUCCESS";
export const postNameSuccess = user => {
  return {
    type: POST_NAME_SUCCESS,
    user
  }
}

export const POST_NAME_ERROR = "POST_NAME_ERROR";
export const postNameError = error => {
  return {
    type: POST_NAME_ERROR,
    error
  }
}

export const postNameRequest = user => {
  console.log('post name req', user)
  return dispatch => {
    return axios.post(`${API_BASE_URL}/user`, user)
      .then((res) => {
        console.log(res.data)
        dispatch(postNameSuccess(res.data));
      })
      .catch(err => {
        dispatch(postNameError(err))
      });
  }
}



// ******* UPDATE NAME ******** 

export const UPDATE_NAME_SUCCESS = "UPDATE_NAME_SUCCESS";
export const updateNameSuccess = user => {
  return {
    type: UPDATE_NAME_SUCCESS,
    user
  }
}

export const UPDATE_NAME_ERROR = "UPDATE_NAME_ERROR";
export const updateNameError = error => {
  return {
    type: UPDATE_NAME_ERROR,
    error
  }
}

export const updateNameRequest = user => {
  console.log('update user', user)
  return(dispatch) => {
    return axios.put(`${API_BASE_URL}/user/${user.id}`, user)
      .then((res) => {
        console.log('UPDATE REQ', res)
        dispatch(updateNameSuccess(res.data));
      })
      .catch(err => {
        dispatch(updateNameError(err))
      });
  }
}


// ******* GET NAME ******** 

// export const FETCH_NAME_SUCCESS = "FETCH_NAME_SUCCESS";
// export const fetchNameSuccess = user => {
//   return {
//     type: FETCH_NAME_SUCCESS,
//     user
//   }
// }

// export const FETCH_NAME_ERROR = "FETCH_NAME_ERROR";
// export const fetchNameError = error => {
//   return {
//     type: FETCH_NAME_ERROR,
//     error
//   }
// }

// export const fetchNameRequest = user => {
//   return(dispatch) => {
//     return axios.get(`${API_BASE_URL}/user/${user.id}`)
//       .then(res => res.json())
//       .then((res) => {
//         dispatch(fetchNameSuccess(res.data));
//       })
//       .catch(err => {
//         dispatch(fetchNameError(err))
//       });
//   }
// }

