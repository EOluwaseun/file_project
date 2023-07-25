// import React from 'react';
import { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createFolder } from '../../Redux/actionCreator/filesFolderActionCreator';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
function FoldFile({ setIsCreateModalFolderOpen }) {
  // state for file name
  const [folderName, setFolderName] = useState('');

  const { userFolders, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFolders: state.fileFolders.userFolders,
      user: state.auth.user,
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // check if folder already present
  const checkFolderAlreadyExist = (name) => {
    const folderPresent = userFolders
      .filter((folder) => folder.data.parent === currentFolder)
      .find((folder) => folder.data.name === name);
    if (folderPresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check fileName if exist
    if (folderName) {
      // check if lenght is greater than 3
      if (folderName.length > 3) {
        if (!checkFolderAlreadyExist(folderName)) {
          // ('folder created ' + folderName);
          const data = {
            createdAt: new Date(),
            name: folderName,
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
          };
          dispatch(createFolder(data));
          console.log(data);
        } else {
          toast.error('folder already present');
        }
      } else {
        toast.error('folder name must be at least 3 characters');
      }
    } else {
      toast.error('folder name cannot be empty');
    }
  };

  return (
    <div className=" h-screen w-full top-0 fixed left-0 bottom-0 right-0 bg-black/40 z-50">
      <div className="mx-auto flex flex-col gap-y-12 max-w-[30rem] h-[250px] bg-white mt-12 p-[20px]">
        <div className="flex justify-between">
          <h2 className="font-bold">Create Folder</h2>
          <button
            onClick={() => setIsCreateModalFolderOpen(false)}
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
              id="folderName"
              placeholder="File Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full border p-3"
            />
            <div>
              <button className="bg-blue-700 w-full p-3">Create Folder</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoldFile;
