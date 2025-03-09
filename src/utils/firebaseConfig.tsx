import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzQM9lu5onjmXh3egXGenn5FuBR_XCdj8",
  authDomain: "aitrip-41fe2.firebaseapp.com",
  projectId: "aitrip-41fe2",
  storageBucket: "aitrip-41fe2.firebasestorage.app",
  messagingSenderId: "317683712182",
  appId: "1:317683712182:web:8d3945d49db9ce5f3a6617"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);