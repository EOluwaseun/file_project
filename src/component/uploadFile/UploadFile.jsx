// import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../Redux/actionCreator/filesFolderActionCreator';
import { toast } from 'react-toastify';

// import { createFile } from '../../Redux/actionCreator/filesFolderActionCreator';

// eslint-disable-next-line react/prop-types
function UploadFile({ setIsFileUploadModalFileOpen }) {
  // state for file name
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.fileFolders.userFiles,
      user: state.auth.user,
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFile(''), setSuccess(false);
      setIsFileUploadModalFileOpen(false);
    }
  }, [setIsFileUploadModalFileOpen, success]);

  // check if folder already present
  const checkFileAlreadyExist = (name) => {
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((fldr) => fldr.data.name === name);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check file if exist
    if (file) {
      console.log(file);
      if (!checkFileAlreadyExist(file.name)) {
        // alert('folder created ' + folderName);
        const data = {
          createdAt: new Date(),
          name: file.name,
          userId: user.uid,
          createdBy: user.displayName,
          path:
            currentFolder === 'root'
              ? []
              : // eslint-disable-next-line no-unsafe-optional-chaining
                [...currentFolderData?.data.path, currentFolder],
          parent: currentFolder,
          lastAccessed: null,
          updatedAt: new Date(),
          extension: file.name.split('.')[1],
          data: null,
          url: '',
        };
        dispatch(uploadFile(file, data, setSuccess));
        console.log(data);
      } else {
        toast.error('File Already present');
      }
    } else {
      toast.error('folder name cannot be empty');
    }
  };

  return (
    <div className=" h-screen w-full top-0 fixed left-0 bottom-0 right-0 bg-black/40 z-50">
      <div className="mx-auto flex flex-col gap-y-12 max-w-[30rem] h-[250px] bg-white mt-12 p-[20px]">
        <div className="flex justify-between">
          <h2 className="font-bold">Upload File</h2>
          <button
            onClick={() => setIsFileUploadModalFileOpen(false)}
            className="text-red-500 cursor-pointer"
          >
            <ImCancelCircle />
          </button>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-y-12 justify-between"
          >
            <input
              type="file"
              id="file"
              // value={file}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-3"
            />
            <div>
              <button className="bg-blue-700 w-full p-3">Upload File</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
