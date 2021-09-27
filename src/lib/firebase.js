import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCBcj5dmxfHp80xZRDfG0USfFjMsD9F4oc',
  authDomain: 'instagram-clone-536f6.firebaseapp.com',
  projectId: 'instagram-clone-536f6',
  storageBucket: 'instagram-clone-536f6.appspot.com',
  messagingSenderId: '966764195621',
  appId: '1:966764195621:web:b657dde04b7fbf9a9fb4cc'
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
