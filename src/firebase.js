// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB2JsG3fCgJ610EVFQ6jWEk-mqYW16cPHk',
  authDomain: 'book-store-10202.firebaseapp.com',
  projectId: 'book-store-10202',
  storageBucket: 'book-store-10202.appspot.com',
  messagingSenderId: '893858141278',
  appId: '1:893858141278:web:62aae80629b6db629310cf',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
