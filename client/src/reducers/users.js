import {

} from "../actions/users";
  
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : {};
  
  const initialState = {

  };
  
  export default function userReducer(state = initialState, action) {
  
    return state;
  }
  