// import React from 'react';
import { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createFile } from '../../Redux/actionCreator/filesFolderActionCreator';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
function CreateFile({ setIsCreateModalFileOpen }) {
  // state for file name
  const [fileName, setFileName] = useState('');
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
      setFileName(''), setSuccess(false);
      setIsCreateModalFileOpen(false);
    }
  }, [setIsCreateModalFileOpen, success]);

  // check if folder already present
  const checkFileAlreadyExist = (name, ext) => {
    if (!ext) {
      name = name + '.txt';
    }
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
    // check fileName if exist
    if (fileName) {
      // check if lenght is greater than 3
      if (fileName.length > 3) {
        // check file extension
        let extension = false;
        if (fileName.split('.').length > 1) {
          extension = true;
        }
        if (!checkFileAlreadyExist(fileName, extension)) {
          // alert('folder created ' + folderName);
          const data = {
            createdAt: new Date(),
            name: extension ? fileName : `${fileName}.txt`,
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
            extension: extension ? fileName.split('.')[1] : 'txt',
            data: '',

            url: null,
          };
          dispatch(createFile(data, setSuccess));
          console.log(data);
        } else {
          alert('File Already present');
        }
      } else {
        alert('folder name must be at least 3 characters');
      }
    } else {
      alert('folder name cannot be empty');
    }
  };

  return (
    <div className=" h-screen w-full top-0 fixed left-0 bottom-0 right-0 bg-black/40 z-50">
      <div className="mx-auto flex flex-col gap-y-12 max-w-[30rem] h-[250px] bg-white mt-12 p-[20px]">
        <div className="flex justify-between">
          <h2 className="font-bold">Create File</h2>
          <button
            onClick={() => setIsCreateModalFileOpen(false)}
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
              type="text"
              id="fileName"
              placeholder="File Name e,g file.txt "
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full border p-3"
            />
            <div>
              <button className="bg-blue-700 w-full p-3">Create File</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateFile;
