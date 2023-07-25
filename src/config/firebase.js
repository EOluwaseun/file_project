// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA9ugj1jP31Ihtud4f_UaunAPMnp-PR7kk',
  authDomain: 'file-project-b7a7b.firebaseapp.com',
  projectId: 'file-project-b7a7b',
  storageBucket: 'file-project-b7a7b.appspot.com',
  messagingSenderId: '879658360352',
  appId: '1:879658360352:web:4e0a2dc67a86f3df972645',
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
