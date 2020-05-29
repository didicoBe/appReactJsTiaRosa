import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9uQYZt9p5wNcVncq2GoVAhg2349EEZb0",
    authDomain: "tiarosa-6f561.firebaseapp.com",
    databaseURL: "https://tiarosa-6f561.firebaseio.com",
    projectId: "tiarosa-6f561",
    storageBucket: "tiarosa-6f561.appspot.com",
    messagingSenderId: "543855024524",
    appId: "1:543855024524:web:249bae618bed15bf535ea9",
    measurementId: "G-JDM2PMF1PH"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

