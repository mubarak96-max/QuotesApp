// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { collection, getFirestore, orderBy } from 'firebase/firestore';
// import { enableIndexedDbPersistence } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: 'AIzaSyCuDijeVAWDVJkehF0g9qNj2n6XAfRb0r0',
//   authDomain: 'quotes-28839.firebaseapp.com',
//   databaseURL: 'https://quotes-28839-default-rtdb.firebaseio.com',
//   projectId: 'quotes-28839',
//   storageBucket: 'quotes-28839.appspot.com',
//   messagingSenderId: '910806183313',
//   appId: '1:910806183313:web:1440518d71c61a93c17e30'
// };
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// const app = initializeApp(firebaseConfig);

// export const db = getDatabase(app);
// Initialize Firebase

// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/functions';
import '@react-native-firebase/firestore';
// import '@react-native-firebase/auth';
// import '@react-native-firebase/storage';
// import { getAnalytics, isSupported } from 'firebase/analytics';
// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_APP_ID,
//   FIREBASE_MESSAGINGSENDER_ID
//   // eslint-disable-next-line import/no-unresolved
// } from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyB5YOUcVf5MPzmFoxbsImQTqRrTTty63NI',
  authDomain: 'qurancms-ecf1e.firebaseapp.com',
  projectId: 'qurancms-ecf1e',
  storageBucket: 'qurancms-ecf1e.appspot.com',
  messagingSenderId: '338085357319',
  appId: '1:338085357319:web:9d2cbd9b22109fc7f807a2'
};

// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGINGSENDER_ID,
//   appId: FIREBASE_APP_ID,
// };
// eslint-disable-next-line import/no-mutable-exports
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
// const auth = firebase.auth();
const db = firebase.firestore();
// const functions = firebase.functions();
// const storage = firebase.storage();

// isSupported().then((yes) => (yes ? getAnalytics(app) : null));

// export const surahCol = collection(db, 'quotes');

export { db, app };
// export { auth, db };
