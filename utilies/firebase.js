import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBf30rs-aYsANpxMssbN9tf9jFnCZKrDgw",
  authDomain: "first-native-app-c60e6.firebaseapp.com",
  databaseURL: "https://first-native-app-c60e6.firebaseio.com",
  projectId: "first-native-app-c60e6",
  storageBucket: "first-native-app-c60e6.appspot.com",
  messagingSenderId: "953271574544"
};
export default firebase.initializeApp(firebaseConfig);
export const dataBase = firebase.database();