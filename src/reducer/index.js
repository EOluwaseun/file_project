import authReducer from './reducer';
import fileFolderReducer from './FileFolderReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  fileFolders: fileFolderReducer,
});

export default rootReducer;
