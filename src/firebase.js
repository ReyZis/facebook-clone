import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDgqxLSHlawS9LIyzOS_Pqh5PluNqkAprs",
    authDomain: "facebook-clone-59d5e.firebaseapp.com",
    projectId: "facebook-clone-59d5e",
    storageBucket: "facebook-clone-59d5e.appspot.com",
    messagingSenderId: "79941609648",
    appId: "1:79941609648:web:3b9f80eba74d145bfe7375",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage().ref();

export { auth, provider, storage };
export default db;
