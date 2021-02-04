import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import {authSuccess} from './actions/auth';

import authReducer from './reducers/auth';
import userReducer from './reducers/users';


const store = createStore(
      combineReducers({
          form: formReducer,
          auth: authReducer,
          user: userReducer
    }),
    applyMiddleware(thunk)
);

const user = loadAuthToken();
if (user) {
  // console.log('user info', user);
  store.dispatch(authSuccess(user.authToken, user)); 
}

export default store;