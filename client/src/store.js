import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import imageReducer from './reducers/image-reducer';
import profileReducer from './reducers/profile-reducer';

const rootReducer = combineReducers({
  user: profileReducer,
  image: imageReducer,
  form: formReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk));