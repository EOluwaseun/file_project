import React, { useState } from 'react';
import { signInUser } from '../../Redux/actionCreator/authActionCeator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { Dashboard } from '../../pages';

function Loginform() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sign = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('please fill in all fields');

      return;
    }
    // console.log('hy');
    dispatch(signInUser(email, password, setSuccess));
  };
  React.useEffect(() => {
    if (success) {
      navigate('/Dashboard');
    }
  }, [navigate, success]);

  return (
    <div className="h-[80%] flex justify-center items-start">
      <form onSubmit={sign} className="flex-col p-2 w-[32rem]">
        <div className="w-full border border-black text-center mb-4">
          <input
            className="w-full h-full p-2"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" w-full border border-black mb-4">
          <input
            className="w-full h-full p-2"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={sign}
          type="submit"
          className="w-full p-2 bg-blue-600 text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Loginform;
