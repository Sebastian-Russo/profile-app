import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import {authSuccess} from './actions/auth';

import imageReducer from './reducers/image-reducer';
import profileReducer from './reducers/profile-reducer';
import authReducer from './reducers/auth';
import userReducer from './reducers/users';


const rootReducer = combineReducers({
  user: profileReducer,
  image: imageReducer,
  form: formReducer,
  auth: authReducer,
  users: userReducer
})

const user = loadAuthToken();
if (user) {
  console.log('user info', user);
  store.dispatch(authSuccess(user.authToken, user)); // authSuccess(authToken, user)
}

export const store = createStore(rootReducer,applyMiddleware(thunk));