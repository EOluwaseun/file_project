// import React from 'react';

import { Link } from 'react-router-dom';
import Registerform from '../../../component/authComponet/Registerform';

function Register() {
  return (
    <div className="flex justify-center items-center flex-col  mx-auto gap-4">
      <h1 className="mx-auto text-3xl">Register Here</h1>

      <Registerform />
      <Link to="/login" className="text-end">
        Already a member? Login
      </Link>
    </div>
  );
}

export default Register;
