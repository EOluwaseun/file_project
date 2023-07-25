// import React from 'react';

import { Link } from 'react-router-dom';
import Loginform from '../../../component/authComponet/Loginform';

function Login() {
  return (
    <div className="flex justify-center items-center flex-col  mx-auto gap-4">
      <h1 className="mx-auto text-3xl">Login with your ID</h1>
      <Loginform />
      <Link to="/register none" className="text-end">
        Not a member? Register
      </Link>
    </div>
  );
}

export default Login;
