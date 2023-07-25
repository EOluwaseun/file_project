// import React from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFileData } from '../../Redux/actionCreator/filesFolderActionCreator';
// eslint-disable-next-line react/prop-types
function Header({ fileName, fileData, prevFileData, fileId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav className="bg-white shadow-sm py-0 flex justify-between items-center w-full p-4">
      <p className="font-bold">{fileName}</p>
      {fileData !== prevFileData && <h5>*[modified]</h5>}
      <ul className="flex gap-6">
        <li>
          <button
            className="bg-green-600 text-white px-6 py-2 flex items-center gap-2"
            disabled={fileData === prevFileData}
            onClick={() => dispatch(updateFileData(fileId, fileData))}
          >
            <AiOutlineSave />
            Save
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate(-1)}
            className="order-1 flex justify-between w-[fit-container] bg-blue-400  items-center gap-2 px-6 py-2"
          >
            <HiOutlineArrowLeft />
            Go Back
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
