import { current } from '@reduxjs/toolkit';
import * as types from '../Redux/actionCreator/actionTypes/filesFolderActionType';

const initialState = {
  isLoading: true,
  currentFolder: 'root',
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
};

const fileFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };
    case types.ADD_FOLDERS:
      return {
        ...state,
        userFolders: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };
    case types.ADD_FILES:
      return {
        ...state,
        userFiles: action.payload,
      };
    case types.CREATE_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };
    case types.SET_FILE_DATA:
      // eslint-disable-next-line no-case-declarations
      const { fileId, data } = action.payload;
      // eslint-disable-next-line no-case-declarations
      const allFiles = state.userFiles;
      // eslint-disable-next-line no-case-declarations
      const currentFile = allFiles.find((file) => file.docId === fileId);
      currentFile.data.data = data;
      return {
        ...state,
        userFiles: state.userFiles.map((file) =>
          file.docId === fileId ? currentFile : file
        ),
      };
    default:
      return state;
  }
};
export default fileFolderReducer;
