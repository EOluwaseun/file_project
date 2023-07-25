// import React from 'react'
import * as types from './actionTypes/filesFolderActionType';
import fire from '../../config/firebase';

// function filesFolderActionCreator() {
//   return <div></div>;
// }

// export default filesFolderActionCreator;
// action
const addFolder = (payload) => {
  return {
    type: types.CREATE_FOLDER,
    payload,
  };
};

const addFolders = (payload) => {
  return {
    type: types.ADD_FOLDERS,
    payload,
  };
};

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});
const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// files
const addFiles = (payload) => {
  return {
    type: types.ADD_FILES,
    payload,
  };
};
const addFile = (payload) => {
  return {
    type: types.CREATE_FILE,
    payload,
  };
};

const setFileData = (payload) => {
  return {
    type: types.SET_FILE_DATA,
    payload,
  };
};

export const createFolder = (data) => (dispatch) => {
  //   console.log(data);
  fire
    .firestore()
    .collection('folders')
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
      alert('folder created succesfully');
    });
};
//  get all folders
export const getFolders = (userId) => (dispatch) => {
  // firsly set loading as true
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection('folders')
    .where('userId', '==', userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      // set loading back to false after d action
      dispatch(setLoading(false));
      dispatch(addFolders(foldersData));
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};
// for loading

// files
export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .where('userId', '==', userId)
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));
      // set loading back to false after d action
      // dispatch(setLoading(false));
      dispatch(addFiles(filesData));
    });
};

export const createFile = (data, setSuccess) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      alert('File created succefully');
      dispatch(addFile({ data: fileData, docId: fileId }));
      setSuccess(true);
    })
    .catch(() => {
      setSuccess(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      alert('file saved succefully');
    })
    .catch(() => {
      alert('something went wrong');
    });
};
export const uploadFile = (file, data, setSuccess) => (dispatch) => {
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);
  uploadFileRef.put(file).on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log('uploading' + progress + '%');
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = { ...data, url: fileUrl };
      fire
        .firestore()
        .collection('files')
        .add(fullData)
        .then(async (file) => {
          const fileData = await (await file.get()).data();
          const fileId = file.id;
          dispatch(addFile({ data: fileData, docId: fileId }));
          alert('File uploaded succesfully');
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  );
};
