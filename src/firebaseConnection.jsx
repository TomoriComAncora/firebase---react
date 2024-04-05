import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_qX3LwvsOnlghP40zSHM0AJ3s5mDKEKc",
  authDomain: "fir-646a6.firebaseapp.com",
  projectId: "fir-646a6",
  storageBucket: "fir-646a6.appspot.com",
  messagingSenderId: "118036029398",
  appId: "1:118036029398:web:09df9f0305beeaa4f18e77",
  measurementId: "G-ZK0F34NP6B",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
