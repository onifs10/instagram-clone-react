import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDFvE4nFIHH1z4o7DWYhRsOZaPmlGMcbC4',
  authDomain: 'insta-clone-d39aa.firebaseapp.com',
  projectId: 'insta-clone-d39aa',
  storageBucket: 'insta-clone-d39aa.appspot.com',
  messagingSenderId: '100461491079',
  appId: '1:100461491079:web:867d35584c9797baff5922'
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
