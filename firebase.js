// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
      apiKey: "AIzaSyDsMwiUXXs2uajPxHoT6azEBRFhLLi0Zy0",
      authDomain: "mytasmik-1e30c.firebaseapp.com",
      databaseURL:
        "https://mytasmik-1e30c-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "mytasmik-1e30c",
      storageBucket: "mytasmik-1e30c.appspot.com",
      messagingSenderId: "1042199778834",
      appId: "1:1042199778834:web:09e2500c3395924516eacb",
    };

    return initializeApp(firebaseConfig);
  }
}

// Initialize Firebase
const app = initializeAppIfNecessary();
export const auth = getAuth(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
