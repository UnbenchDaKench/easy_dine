/* import axios from 'axios';
import firebase from "firebase/app";
import vueFire from "vuefire"; */
import {intializeApp, initializeApp} from 'firebase';

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyD82kgPUw-d9jiw0cUquhJU0lR05PtEIbI",
    authDomain: "easy-dine-a0581.firebaseapp.com",
    databaseURL: "https://easy-dine-a0581.firebaseio.com",
    projectId: "easy-dine-a0581",
    storageBucket: "easy-dine-a0581.appspot.com",
    messagingSenderId: "460232871233",
    appId: "1:460232871233:web:977a3dbe51addf6cd8e5c0",
    measurementId: "G-0MSBBLV7VZ"
  });

  export const db = firebaseConfig.firestore();
  export const users = db.collection('users');
  export const restaurants = db.collection('restaurants');
  export const restaurantAMenu = db.collection('restaurants').doc('Restaurant A').collection('menu');

