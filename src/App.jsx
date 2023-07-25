// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, Homepage, Register, Dashboard } from './pages/index';
import { useEffect } from 'react';
import { checkIsLogIn } from './Redux/actionCreator/authActionCeator';

function App() {
  // const [count, setCount] = useState(0);
  // check if user is log in
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLogIn());
  }, []);

  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
