// import React from 'react';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { signUpUser } from '../../Redux/actionCreator/authActionCeator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { Dashboard } from '../../pages';

function Registerform() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !passwordConfirmation) {
      toast.error('please fill in all fields');

      return;
    }
    if (password != passwordConfirmation) {
      toast.error('password do not match');

      return;
    }
    dispatch(signUpUser(email, password, name, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate('/Dashboard');
    }
  }, [navigate, success]);
  return (
    <form onSubmit={register} className="w-[50%]">
      <div className="w-full border border-black text-center mb-4 p-2">
        <input
          type="name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full border border-black text-center mb-4 p-2">
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className=" w-full border border-black mb-4 p-2">
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className=" w-full border border-black mb-4 p-2">
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="retype-password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <button
        onClick={register}
        type="submit"
        className="w-full p-2 bg-blue-600 text-center"
      >
        Login
      </button>
    </form>
  );
}

export default Registerform;
