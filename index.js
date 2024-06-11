import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyALrqZzCRKFwwlJ1jB1ir1k8oTZz1DOLTA",
  authDomain: "upzy-9530b.firebaseapp.com",
  databaseURL: "https://upzy-9530b-default-rtdb.firebaseio.com",
  projectId: "upzy-9530b",
  storageBucket: "upzy-9530b.appspot.com",
  messagingSenderId: "448313198620",
  appId: "1:448313198620:web:6f150df0165df9e8cff7d9",
  measurementId: "G-MS8KL2ZZ2H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


async function addUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

addUser();