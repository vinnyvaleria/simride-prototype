import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkRw3HDKHsLemsSX_Lt7yg7nrKbyHinYw",
  authDomain: "carpool-world-5uck5.firebaseapp.com",
  databaseURL: "https://carpool-world-5uck5.firebaseio.com",
  projectId: "carpool-world-5uck5",
  storageBucket: "carpool-world-5uck5.appspot.com",
  messagingSenderId: "815758834423",
  appId: "1:815758834423:web:7bf9f61620100c7b89f1f2",
  measurementId: "G-D8C4XSD1H9",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);