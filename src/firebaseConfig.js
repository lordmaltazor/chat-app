import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDUs5a4BikKnPy9W2C_Zxhe5jSb8icwez0",
    authDomain: "multi-language-chat-app-f8696.firebaseapp.com",
    projectId: "multi-language-chat-app-f8696",
    storageBucket: "multi-language-chat-app-f8696.appspot.com",
    messagingSenderId: "607018711041",
    appId: "1:607018711041:web:2050e05e3355c884eaa800"
})

const firestore = firebase.firestore();

export {firestore};