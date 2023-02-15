import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBkEbSiPqx1lTpDO939lOwb2VV414U9NN4",
    authDomain: "vehicle-f9f9a.firebaseapp.com",
    databaseURL: "https://vehicle-f9f9a.firebasedatabase.app",
    projectId: "vehicle-f9f9a",
    storageBucket: "vehicle-f9f9a.appspot.com",
    messagingSenderId: "1042370436586",
    appId: "1:1042370436586:web:cd085a5f0426cf60f9a693"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);