// import React from 'react';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// import Navigation from '../../component/Homepage/Navigation';
import Navbar from '../../component/DashboardComponet/Navbar/Navbar';
import SubBar from '../../component/DashboardComponet/subbar/SubBar';
import Home from '../../component/DashboardComponet/HomeComponet/Home';
import FoldFile from '../../component/createFolder/FoldFile';
import {
  getFiles,
  getFolders,
} from '../../Redux/actionCreator/filesFolderActionCreator';
import FolderComponent from './folderComponent/FolderComponent';
import CreateFile from '../../component/createFile/CreateFile';
import FileComponent from '../../component/fileComponet/FileComponent';
import UploadFile from '../../component/uploadFile/UploadFile';

function Dashboard() {
  const [isCreateFolderModalOpen, setIsCreateModalFolderOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateModalFileOpen] = useState(false);
  const [isFileUploadModalFileOpen, setIsFileUploadModalFileOpen] =
    useState(false);
  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();

  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.fileFolders.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // cheeks
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [dispatch, isLoading, userId]);

  // show and hide bar
  useEffect(() => {
    if (pathname.includes('/file/')) {
      setShowSubBar(false);
    }
  }, [pathname, showSubBar]);

  return (
    <>
      {/* {JSON.stringify(isCreateFolderModalOpen)} */}
      {isCreateFolderModalOpen && (
        <FoldFile setIsCreateModalFolderOpen={setIsCreateModalFolderOpen} />
      )}
      {isCreateFileModalOpen && (
        <CreateFile setIsCreateModalFileOpen={setIsCreateModalFileOpen} />
      )}
      {isFileUploadModalFileOpen && (
        <UploadFile
          setIsFileUploadModalFileOpen={setIsFileUploadModalFileOpen}
        />
      )}

      <Navbar />
      {showSubBar && (
        <SubBar
          setIsCreateModalFolderOpen={setIsCreateModalFolderOpen}
          setIsCreateModalFileOpen={setIsCreateModalFileOpen}
          setIsFileUploadModalFileOpen={setIsFileUploadModalFileOpen}
        />
      )}
      {/* <SubBar
        setIsCreateModalFolderOpen={setIsCreateModalFolderOpen}
        setIsCreateModalFileOpen={setIsCreateModalFileOpen}
      /> */}

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="folder/:folderId" element={<FolderComponent />} />
        <Route path="file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  );
}

export default Dashboard;
