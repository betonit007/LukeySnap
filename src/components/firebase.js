import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_DEV_FIREBASE_APIKEY,
    authDomain: "test12-a3c12.firebaseapp.com",
    databaseURL: "https://test12-a3c12.firebaseio.com",
    projectId: "test12-a3c12",
    storageBucket: "test12-a3c12.appspot.com",
    messagingSenderId: "873854533728",
    appId: process.env.REACT_APP_DEV_FIREBASE_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;