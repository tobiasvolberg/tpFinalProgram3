import app from 'firebase/app'
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBDyoFziMyjD8JHBmn4yoosF5Lqw5RQgQ",
  authDomain: "tpfinalprogram.firebaseapp.com",
  projectId: "tpfinalprogram",
  storageBucket: "tpfinalprogram.appspot.com",
  messagingSenderId: "329747908874",
  appId: "1:329747908874:web:526529dc8c932d479112f3"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()