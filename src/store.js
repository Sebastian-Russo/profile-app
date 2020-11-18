import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer
})

export const store = createStore(rootReducer);