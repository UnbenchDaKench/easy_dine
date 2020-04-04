/* import axios from 'axios';
import firebase from "firebase/app";
import vueFire from "vuefire"; */
import {intializeApp, initializeApp} from 'firebase';

var date = new Date();

var today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();

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
  export const restaurantsRef = db.collection('restaurants');
  //restaurant A stuff
  export const restaurantABreakfast = db.collection('restaurants').doc('Restaurant A').collection('menu').doc('breakfast').collection('items');
  export const restaurantALunch = db.collection('restaurants').doc('Restaurant A').collection('menu').doc('lunch').collection('items');
  export const restaurantADinner = db.collection('restaurants').doc('Restaurant A').collection('menu').doc('dinner').collection('items');
  export const restaurantADrinks = db.collection('restaurants').doc('Restaurant A').collection('menu').doc('drinks').collection('items');
  //restaurant B stuff
  export const restaurantBBreakfast = db.collection('restaurants').doc('Restaurant B').collection('menu').doc('Breakfast').collection('items');
  export const restaurantBLunch = db.collection('restaurants').doc('Restaurant B').collection('menu').doc('lunch').collection('items');
  export const restaurantBDinner = db.collection('restaurants').doc('Restaurant B').collection('menu').doc('dinner').collection('items');
  export const restaurantBDrinks = db.collection('restaurants').doc('Restaurant B').collection('menu').doc('drinks').collection('items'); 
  //restaurant C stuff
  export const restaurantCBreakfast = db.collection('restaurants').doc('Restaurant C').collection('menu').doc('breakfast').collection('items');
  export const restaurantCLunch = db.collection('restaurants').doc('Restaurant C').collection('menu').doc('lunch').collection('items');
  export const restaurantCDinner = db.collection('restaurants').doc('Restaurant C').collection('menu').doc('dinner').collection('items');
  export const restaurantCDrinks = db.collection('restaurants').doc('Restaurant C').collection('menu').doc('drinks').collection('items');
  //orders by restaurant
  export const restAOrders = db.collection('restaurants').doc('Restaurant A').collection('orders').doc('days list').collection(today);
  export const restBOrders = db.collection('restaurants').doc('Restaurant B').collection('orders').doc('days list').collection(today);
  export const restCOrders = db.collection('restaurants').doc('Restaurant C').collection('orders').doc('days list').collection(today);
  
  //receipts
  

