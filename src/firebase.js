import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_SZea32gwMflmG1T2F_8IBJ6JSVQNNlE",
    authDomain: "maint-reports.firebaseapp.com",
    projectId: "maint-reports",
    storageBucket: "maint-reports.firebasestorage.app",
    messagingSenderId: "513253726886",
    appId: "1:513253726886:web:158ea71b40c1f6c5b13267",
    measurementId: "G-J5JCD29P26"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);