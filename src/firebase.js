import firebase from "firebase/app"
import "firebase/database";

// Configure Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAkSHQyuR6FQ8FkN9atRMvF9Nhbba0B1os",
    authDomain: "reacttictactoe-69083.firebaseapp.com",
    databaseURL: "https://reacttictactoe-69083-default-rtdb.firebaseio.com",
    projectId: "reacttictactoe-69083",
    storageBucket: "reacttictactoe-69083.appspot.com",
    messagingSenderId: "705467616619",
    appId: "1:705467616619:web:d996b0ba5efecc294e102e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;