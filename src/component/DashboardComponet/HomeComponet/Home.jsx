// import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import ShowItems from '../showItems/ShowItems';

function Home() {
  // const folders = ['New Folder', 'New Folder 2'];
  // const files = [{ name: 'New File' }, { name: 'New File 2' }];
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.fileFolders.isLoading,
      userFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === 'root'
      ),
      userFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === 'root'
      ),
    }),
    shallowEqual
  );
  return (
    <div>
      {isLoading ? (
        <h1 className="my-5 text-center">Loading...</h1>
      ) : (
        <>
          <ShowItems title={'Folders'} type={'folder'} items={userFolders} />
          <ShowItems
            title={'Files'}
            type={'file'}
            items={userFiles.filter((file) => file.data.url === null)}
          />

          <ShowItems
            title={'Uploaded Files'}
            type={'file'}
            items={userFiles.filter((file) => file.data.data === null)}
          />
        </>
      )}
    </div>
  );
}

export default Home;
