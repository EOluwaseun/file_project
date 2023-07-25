// import * as types from './actionTypes/authActionTypes';

import * as types from './actionTypes/authActionTypes';

import fire from '../../config/firebase';
import { toast } from 'react-toastify';

const LoginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

const LogOutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

// action ceator

export const signInUser = (email, password, setSucces) => (dispatch) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        LoginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      setSucces(true);

      console.log(user);
    })
    .catch((error) => {
      toast.error('invalid email or password');
    });
};
export const signUpUser = (email, password, name, setSucces) => (dispatch) => {
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      fire
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          const currentUser = fire.auth().currentUser;
          dispatch(
            LoginUser({
              uid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
            })
          );
          setSucces(true);
          console.log(currentUser.uid);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('email already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        toast.error('invalid email!');
      }
      if (error.code === 'auth/weak-password') {
        toast.error('weak password');
      }
    });
};
export const signOutUser = () => (dispatch) => {
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(LogOutUser());
    });
};

// creator to check log in

export const checkIsLogIn = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        LoginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    }
  });
};
