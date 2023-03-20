import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD47GN2-ghpWi2HU9Q89BEA6v-jpK0wwLs",
  authDomain: "clone-e343f.firebaseapp.com",
  projectId: "clone-e343f",
  storageBucket: "clone-e343f.appspot.com",
  messagingSenderId: "10390298627",
  appId: "1:10390298627:web:b510a70a10dcda1ab86e36",
  measurementId: "G-8C7DH0E0RZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
