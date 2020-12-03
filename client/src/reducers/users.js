import {

} from "../actions/users";


  const initialState = {
    id: null, 
    error: null,
    loading: false,
    username: "",
    authToken: null, 
    userProfile: null
  };
  
  export default function userReducer(state = initialState, action) {
    

    return state;
  }
  

  // connect nickname and profile image objects to user 
  // make save button that saves both to user 
  // may not need separate api call for nick name and profile image
  // save nick name and profile image to state/store
  // save button with user data  is only api call

  // when sign in, needs to show user id and user data in state
  // should show auth reducer 
  // sign up form & login both need to set state/store with user data
  
