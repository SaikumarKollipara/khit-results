import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import store from './redux/store.js';
import App from './App.jsx'
import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPVadXFoHIw-2TLg13DikEfFdZ24boAOU",
  authDomain: "khitresults.firebaseapp.com",
  projectId: "khitresults",
  storageBucket: "khitresults.appspot.com",
  messagingSenderId: "606533629982",
  appId: "1:606533629982:web:6ab1158f260ee4e982560f",
  measurementId: "G-7NZE2FNP4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App /> 
    </Provider>
  </>,
)
