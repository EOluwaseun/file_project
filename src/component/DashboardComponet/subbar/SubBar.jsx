import { AiFillFileAdd, AiFillFolderAdd } from 'react-icons/ai';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeFolder } from '../../../Redux/actionCreator/filesFolderActionCreator';

// eslint-disable-next-line react/prop-types
const SubBar = ({
  // eslint-disable-next-line react/prop-types
  setIsCreateModalFolderOpen,
  // eslint-disable-next-line react/prop-types
  setIsCreateModalFileOpen,
  // eslint-disable-next-line react/prop-types
  setIsFileUploadModalFileOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currentFolder: state.fileFolders.currentFolder,
      currentFolderData: state.fileFolders.userFolders.find(
        (folder) => folder.docId === state.fileFolders.currentFolder
      ),
      userFolders: state.fileFolders.userFolders,
    }),
    shallowEqual
  );
  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };

  return (
    <nav className="py-2  mt-[9rem] px-4 flex justify-between">
      <nav className="m-5">
        <ol className="flex">
          {/* <li>
            <Link to="/dashboard" className="p-4 underline text-blue-500">
              Root/
            </Link>
          </li> */}
          {currentFolder !== 'root' ? (
            <>
              <button
                onClick={() => handleNavigate('/dashboard', 'root')}
                className="text-blue-500 mx-2"
              >
                Root
              </button>
              {/* <li>
                <Link to="/dashboard" className="p-4 underline text-blue-500">
                  Root/
                </Link>
              </li> */}
              {currentFolderData?.data.path.map((folder, index) => (
                <button
                  key={index}
                  className=" "
                  onClick={() =>
                    handleNavigate(
                      `/dashboard/folder/${
                        userFolders.find((fldr) => folder === fldr.docId).docId
                      }`,
                      userFolders.find((fldr) => folder === fldr.docId).docId
                    )
                  }
                >
                  {userFolders.find((fldr) => folder === fldr.docId).data.name}
                </button>
              ))}
              <li>{currentFolderData?.data.name}</li>
            </>
          ) : (
            <li className="text-blue-600 mx-2">
              {/* <Link to="/dashboard" className="p-4 underline text-blue-500">
                Root
              </Link> */}
              Root
            </li>
          )}
        </ol>
      </nav>

      <ul className="flex gap-x-4 justify-between  items-center ">
        <li>
          <button
            onClick={() => setIsFileUploadModalFileOpen(true)}
            className="flex justify-center items-center p-2 gap-x-2
           border-2 border-black hover:border-transparent hover:bg-gray-900 hover:text-white"
          >
            <AiFillFileAdd /> Upload File
          </button>
        </li>
        <li>
          <button
            onClick={() => setIsCreateModalFileOpen(true)}
            className="flex justify-center items-center gap-x-2 p-2
           border-2 border-black hover:border-transparent hover:bg-gray-900 hover:text-white"
          >
            <AiFillFileAdd /> Create File
          </button>
        </li>
        <li>
          <button
            onClick={() => setIsCreateModalFolderOpen(true)}
            className="flex justify-center items-center gap-x-2 p-2
           border-2 border-black hover:border-transparent hover:bg-gray-900 hover:text-white"
          >
            <AiFillFolderAdd /> Create Folder
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubBar;
