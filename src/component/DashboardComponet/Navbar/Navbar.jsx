// import React from 'react'
// import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   signInUser,
//   signOutUser,
// } from '../../Redux/actionCreator/authActionCeator';
import { signOutUser } from '../../../Redux/actionCreator/authActionCeator';

function Navbar() {
  const dispatch = useDispatch();

  // check if user is authenticated

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="fixed flex items-center justify-between w-full p-3 m-0 left-0 top-0  bg-white text-blue shadow-lg">
      <Link to="/dashboard">File Management System</Link>

      <ul className="flex gap-4 text-white">
        {isAuthenticated ? (
          <>
            <li>
              <p className="my-0 mt-1 mx-2 text-2xl">
                <span className=" text-gray-500">Welcome,</span>
                <span className="font-bold text-black mx-2">
                  {user.displayName}
                </span>
              </p>
            </li>

            <li className="cursor-pointer py-2 px-4 rounded-md bg-blue-600">
              <Link to="/">Home</Link>
            </li>
            <li className=" py-2 px-4 rounded-md bg-green-600">
              <button onClick={() => dispatch(signOutUser())}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="cursor-pointer py-2 px-8 rounded-md bg-blue-600">
              <Link to="/login">Login</Link>
            </li>
            <li className=" py-2 px-8 rounded-md bg-green-600">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
