import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './reducers/user-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer
})

export const store = createStore(rootReducer);