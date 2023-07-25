// import { conbineReducers, applyMiddleware } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from '../reducer/reducer';
import fileFolderReducer from '../reducer/FileFolderReducer';
// import rootReducer from '../reducer';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';

const store = createStore(
  combineReducers({ auth: authReducer, fileFolders: fileFolderReducer }),
  // rootReducer
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
