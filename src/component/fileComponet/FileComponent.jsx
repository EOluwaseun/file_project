// import React from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { shallowEqual, useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';
import { useEffect, useState } from 'react';

function FileComponent() {
  const navigate = useNavigate();
  const { fileId } = useParams();
  const [fileData, setFileData] = useState(null);
  const [prevFileData, setPrevFileData] = useState('');

  const { currentFile } = useSelector(
    (state) => ({
      currentFile: state.fileFolders.userFiles.find(
        (file) => file.docId === fileId
      ),
    }),
    shallowEqual
  );
  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile.data.data);
      setPrevFileData(currentFile.data.data);
    }
  }, [currentFile, currentFile.data.data]);

  const downloadFile = () => {
    const element = document.createElement('a');
    element.setAttribute('href', currentFile.data.url);
    element.setAttribute('download', currentFile.data.name);
    element.setAttribute('target', '_blank');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  };
  return (
    <div className="mt-[5rem]">
      {fileData != null ? (
        <>
          <Header
            fileName={currentFile.data.name}
            fileData={fileData}
            prevFileData={prevFileData}
            fileId={fileId}
          />
          <CodeEditor
            fileName={currentFile.data.name}
            data={fileData}
            setData={setFileData}
          ></CodeEditor>
        </>
      ) : (
        <>
          <div className="fixed w-full top-0 left-0 h-screen bg-black text-white">
            {/* Uploaded file */}
            <div className="flex justify-between flex-col gap-2 h-[30px]">
              <div className="bg-white">
                <p title={currentFile.data.name} className="my-0 text-2xl">
                  {currentFile.data.name.length > 40
                    ? currentFile.data.name.slice(0, 40) +
                      '...' +
                      currentFile.data.extension
                    : currentFile.name}
                </p>
                <div className="flex items-center z-10 w-[20%] border-white border-2">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-700 mx-auto p-3"
                  >
                    Go Back
                  </button>
                  <button
                    className=" m-2 p-3 bg-green-600"
                    onClick={() => downloadFile()}
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="">
                {currentFile.data.extension.includes('png') ||
                currentFile.data.extension.includes('jpg') ||
                currentFile.data.extension.includes('gif') ||
                currentFile.data.extension.includes('jpeg') ? (
                  <img
                    src={currentFile.data.url}
                    alt={currentFile.data.name}
                    className="h-screen w-full z-0"
                  />
                ) : (
                  <div className="">
                    <p>File not supported. please download the file</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FileComponent;
