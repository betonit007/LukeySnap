import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCrdzUFXrHYJH511CIcNZ9uioGQhegQ9bk",
    authDomain: "test12-a3c12.firebaseapp.com",
    databaseURL: "https://test12-a3c12.firebaseio.com",
    projectId: "test12-a3c12",
    storageBucket: "test12-a3c12.appspot.com",
    messagingSenderId: "873854533728",
    appId: "1:873854533728:web:01dbea952583b185"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;