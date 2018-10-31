import Rebase from 're-base';
import * as firebase from 'firebase';
const apiKey = `${process.env.REACT_APP_API_KEY}`;

const firebaseApp = firebase.initializeApp({
  apiKey: apiKey,
  authDomain: 'cotd-457f9.firebaseapp.com',
  databaseURL: 'https://cotd-457f9.firebaseio.com',
  projectId: 'cotd-457f9',
  storageBucket: 'cotd-457f9.appspot.com',
  messagingSenderId: '470336821906'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
