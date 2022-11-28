// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD0357829V8Pb4SiBuBD1B-cEqFGbf_EM",
  authDomain: "doreact-8581e.firebaseapp.com",
  projectId: "doreact-8581e",
  storageBucket: "doreact-8581e.appspot.com",
  messagingSenderId: "332273501741",
  appId: "1:332273501741:web:d5d323bc40fd9bf1c71aa4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };