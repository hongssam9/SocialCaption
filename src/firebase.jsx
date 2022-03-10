import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyD4Hur7agl2ro6Y4_FAKTygSjxHZikEIWY",
    authDomain: "socialcaption-fb259.firebaseapp.com",
    projectId: "socialcaption-fb259",
    storageBucket: "socialcaption-fb259.appspot.com",
    messagingSenderId: "218136020508",
    appId: "1:218136020508:web:6d67ead4fe9d49ff86c1d9",
    measurementId: "G-B8VQQ7D4R6"
});


const db = firebaseApp.firestore(); /* to access databse */
const auth = firebase.auth(); /* to access authentication */
const storage = firebase.storage(); /* to access storage, on how we can upload images*/
/* no need to worry about aws s3 stuff because of firebase */

export { db, auth, storage };