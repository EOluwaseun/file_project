// import React from 'react';
import { AiFillFolder, AiFillFile } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
import { changeFolder } from '../../../Redux/actionCreator/filesFolderActionCreator';
function ShowItems({ items, title, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDblClick = (itemId) => {
    if (type === 'folder') {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      // alert('file clicked');
      navigate(`/dashboard/file/${itemId}`);
    }
  };
  return (
    <div className="w-[80%] h-auto flex justify-between  flex-col mt-6">
      <div className=" flex-1">
        <h4 className="text-2xl font-bold mx-2 ">{title}</h4>
      </div>
      <div className="flex-1 ml-4 flex flex-wrap  py-4 px-5 gap-x-6">
        {items.map((item, index) => {
          // console.log(item.data.name);

          return (
            <p
              key={index * 55}
              className=" p-0 py-3 text-center flex flex-col justify-center items-center gap-4"
              onDoubleClick={() => handleDblClick(item.docId)}
            >
              {type == 'folder' ? (
                <AiFillFolder size={40} className="cursor-pointer" />
              ) : (
                <AiFillFile size={40} className="cursor-pointer" />
              )}
              {item.data?.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default ShowItems;
