// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBM3MYB2aqKYsISp1fcBhXzvwIBfXi5U50",
    authDomain: "chatappbase-886e4.firebaseapp.com",
    databaseURL: "https://chatappbase-886e4-default-rtdb.firebaseio.com",
    projectId: "chatappbase-886e4",
    storageBucket: "chatappbase-886e4.appspot.com",
    messagingSenderId: "196334540327",
    appId: "1:196334540327:web:119f3f7a2330d23604e002",
    measurementId: "G-BBWZHFFTFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export { storage }