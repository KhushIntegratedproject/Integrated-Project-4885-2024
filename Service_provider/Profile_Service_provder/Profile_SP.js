import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,updateProfile, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc,doc,getDocs, getDoc} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

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
const db = getFirestore(app);


firebase.initializeApp(firebaseConfig);

// ----------make collection-------------

//   const period = {
//         first: 'games',
//         second:'science',
//         third: 'maths'
//     };
    
//     const docRefPromise = addDoc( collection (db, 'Images'), period);

//---------------------to create an collection, add and retrieve in firebase----------------------

document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = './profile_upload.html';
});


document.getElementById("uploadBtn").onclick = function addProfile(){

    event.preventDefault();

    const service = document.querySelector('#service').value;
    console.log(service);

    const projectTitle = document.querySelector('#projectTitle').value;
    console.log(projectTitle);

    const description = document.querySelector('#description').value;
    console.log(description);

    let user_location_lat, user_location_long;

  function getLocation() {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  }

  getLocation().then(position => {
      user_location_lat = position.coords.latitude;
      user_location_long = position.coords.longitude;



    const addProfileData = {
                service: `${service}`,
                title: `${projectTitle}`,
                description:`${description}`,
                latitude: user_location_lat,
                longitude: user_location_long
            };

    console.log(addProfileData);


    // ------------uploading data---------

    const docRefPromise = addDoc( collection (db, 'addProfile'), addProfileData);

    const firebaseRef = firebase.database().ref('addProfile');

    // Adding data
    document.querySelector("#uploadBtn").addEventListener('click', () => {
      firebaseRef.push(addProfileData);
      firebaseRef.set({
        content: 'text',
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    });
  
  })

    // ------------RETRIEVEING DATA -------------

    // Get a reference to the Firestore service
    var firestore = firebase.firestore();

    // Reference to your collection
    var collectionRef = firestore.collection("addProfile");
    var profileDataArray = [];

    // Retrieve all documents in the collection
    collectionRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            profileDataArray.push({
              id: doc.id,
              data: doc.data()
          });
           // Now `dataArray` contains all documents as an array
        });
        console.log(profileDataArray);
    }).catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  }


