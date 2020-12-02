import Axios from "axios"
import { API_BASE_URL } from '../config';

export const userSignupRequest = user => {
  return dispatch => {
    return Axios.post(`${API_BASE_URL}/users`, user)
  }
}

