import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/performance';

const config = {
  apiKey: 'AIzaSyBaebsr4HHrMKTddWSy6S35NISq4NriwgE',
  authDomain: 'medchain-11c85.firebaseapp.com',
  databaseURL: 'https://medchain-11c85.firebaseio.com',
  projectId: 'medchain-11c85',
  storageBucket: 'medchain-11c85.appspot.com',
  messagingSenderId: '913307124915',
  appId: '1:913307124915:web:c8495c1806ad3755a4dcc6',
  measurementId: 'G-76PNKH5MWN',
};

firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const performance = firebase.performance();
