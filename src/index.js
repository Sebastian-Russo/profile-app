import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {store} from './store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/user';

// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
