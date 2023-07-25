// import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShowItems from '../../../component/DashboardComponet/showItems/ShowItems';

function FolderComponent() {
  const { folderId } = useParams();
  const { currentFolderData, childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === folderId
      )?.data,
      childFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data?.parent === folderId
      ),
      childFiles: state.fileFolders.userFiles.filter(
        (file) => file.data?.parent === folderId
      ),
    }),
    shallowEqual
  );

  const createFiles =
    childFiles && childFiles.filter((file) => file.data.url === null);
  const uploadedFiles =
    childFiles && childFiles.filter((file) => file.data.data === null);

  return (
    <div>
      {/* FolderComponent :{folderId} {JSON.stringify(currentFolderData)}{' '} */}
      {childFolders.length > 0 ? (
        // <p>{JSON.stringify(childFolders)}</p>
        <>
          {childFolders.length > 0 && (
            <ShowItems
              title={'Create Folders'}
              type={'folder'}
              items={childFolders}
            />
          )}

          {createFiles && createFiles.length > 0 && (
            <ShowItems
              title={'Create Files'}
              type={'file'}
              items={createFiles}
            />
          )}
          {uploadedFiles && (
            <ShowItems
              title={'Upload Files'}
              type={'file'}
              items={uploadedFiles}
            />
          )}
        </>
      ) : (
        <p>Empty Folder</p>
      )}
    </div>
  );
}

export default FolderComponent;
