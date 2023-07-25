// import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo.jpeg';
// import {
//   signInUser,
//   signOutUser,
// } from '../../Redux/actionCreator/authActionCeator';
import { signOutUser } from '../../Redux/actionCreator/authActionCeator';

function Navigation() {
  const dispatch = useDispatch();

  // check if user is authenticated

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="fixed z-10 flex items-center justify-between w-full m-0 left-0 top-0 p-6 bg-black text-white">
      <Link to="/">
        <img src={logo} className="w-[60px] h-[60px] object-contain" />
      </Link>

      <ul className="flex gap-4">
        {isAuthenticated ? (
          <>
            <li>
              <p className="mx-2 my-0 mt-1 text-2xl">
                <span className="font-light ">Welcome,</span>
                <span className="text-yellow-500 mx-2">{user.displayName}</span>
              </p>
            </li>

            <li className="cursor-pointer py-2 px-8 rounded-md bg-blue-600">
              <Link to="/dashboard">Dashbord</Link>
            </li>
            <li className=" py-2 px-8 rounded-md bg-green-600">
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

export default Navigation;
