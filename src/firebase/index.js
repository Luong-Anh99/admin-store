import firebase from 'firebase/compat/app';

import "firebase/compat/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB91h52cWkISy5Kx59XMir6PRg9n0RlVPw",
  authDomain: "shoe-shop-8b958.firebaseapp.com",
  projectId: "shoe-shop-8b958",
  storageBucket: "shoe-shop-8b958.appspot.com",
  messagingSenderId: "376630725017",
  appId: "1:376630725017:web:dcc5446e274d4c7f076b08",
  measurementId: "G-5L4TD8Q3WF",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
