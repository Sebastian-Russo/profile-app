import Axios from 'axios';
import {SubmissionError} from 'redux-form';
import { login } from './auth';
import { normalizeResponseErrors } from './utils';
import { API_BASE_URL } from "../config";
import { updateUser } from '../local-storage';

// EDIT STATE update nickName 
export const EDIT_NAME = "EDIT_NAME";
export const editName = nickName => {
  return {
    type: EDIT_NAME,
    nickName
  }
}

// EDIT STATE update image 
export const EDIT_IMAGE = "EDIT_IMAGE";
export const editImage = ({imageFile}) => {
  return {
    type: EDIT_IMAGE,
    imageFile
  }
}

// API request to S3 storage && to mongoDB 
export const singleFileUploadRequest = (selectedFile, getState) => {
    const data = new FormData();
    data.append('image', selectedFile, selectedFile.name);
    return (dispatch, getState) => {
      const {auth} = getState();
      return  Axios.post( `${API_BASE_URL}/user/image`, data, {
            headers: {
              'Authorization': `Bearer ${auth.authToken}`,
              'Accept': 'application/json',
              'Accept-Language': 'en-US, en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
      })
        .then((res) => {
          if (200 === res.status) {
            if ( res.data.error ) {
              if ('LIMIT_FILE_SIZE' === res.data.errer.code) {
                alert('Max size: 2MB')
              } else {
                console.log(res.data);
                alert(res.data.error)
              }
            } else {
              // Success
              let fileName = res.data;
              // UPDATE STORE 
              console.log(fileName)
              dispatch(editImage(fileName)) // update redux store
              dispatch(updateUserSuccess(fileName))
              updateUser({imageFile: fileName.imageFile}) // update local storage
              alert('File Uploaded');
            }
          }
        })
          .catch((err) => {
            alert(err)
            console.error(err)
          });
    }
  }


export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = user => ({
    type: UPDATE_USER_SUCCESS,
    user
})

export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const updateUserError = error => ({
    type: UPDATE_USER_ERROR,
    error
})

// "SAVE BUTTON" API call to mongoDB 
export const updateUserRequest = user => (dispatch, getState) => {
    const { auth } = getState();
    let data = {
      id: auth.id,
      nickName: user.nickName,
      imageFile: {
        imageKey: user.imageFile.imageKey,
        imageUrl: user.imageFile.imageUrl
      }
    }
    fetch(`${API_BASE_URL}/users/${auth.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${auth.authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })  
    .then(res => res.json())
    .then (data => {
        dispatch(updateUserSuccess(data)) // redux store
        updateUser(data) // local storage
    })
    .catch(err => {
        console.log(err)
        dispatch(updateUserError(err))
    });
};

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => dispatch(login(user.username, user.password)))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};
