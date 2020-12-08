import Axios from 'axios';
import { API_BASE_URL } from "../config";


export const EDIT_NAME = "EDIT_NAME";
export const editName = nickName => {
  return {
    type: EDIT_NAME,
    nickName
  }
}

export const EDIT_IMAGE = "EDIT_IMAGE";
export const editImage = ({imageFile}) => {
  console.log(imageFile)
  return {
    type: EDIT_IMAGE,
    imageFile
  }
}

// need jwt token 
export const singleFileUploadRequest = (selectedFile) => {
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
            dispatch(editImage(fileName))
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