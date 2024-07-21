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
let imgURL;
// ----------make collection-------------

//   const period = {
//         first: 'games',
//         second:'science',
//         third: 'maths'
//     };
    
//     const docRefPromise = addDoc( collection (db, 'Images'), period);

//---------------------to create an collection, add and retrieve in firebase----------------------


// document.getElementById('uploadBtn').addEventListener('click', upImg )

// window.AddAProject = AddAProject;

async function upImg(){
  console.log('upload called');
  const selectedFile = document.getElementById('capture').files[0];
  console.log(selectedFile.name);

  try{
    const storage = getStorage(app);
    const fileRef = ref(storage, '/myImages/' + selectedFile.name);
    const snapshot = await uploadBytesResumable(fileRef, selectedFile);
    console.log('***Uploaded a blob or file! :' +snapshot.metadata.name);

    console.log(snapshot.metadata);
    const URL = await getDownloadURL(fileRef);
    imgURL= '';
    imgURL=URL;
    console.log('***Uploaded a blob or file! :' +URL)
    document.getElementById('img-preview').src = URL;
  } catch (err) {
    console.log('failed to upload blob or file!', err)
  }
}

function toggleText() {
  const element = document.getElementById('upc');
  if (element.value === ''|| element.value === 'Tailor') {
      element.value = 'Upcycle';
  } 

  // window.location.replace('./Profile_SP.html');
}

function toggleTextTailor() {
  const elementTail = document.getElementById('upc');
  if (elementTail.value === ''|| elementTail.value === 'Upcycle') {
      elementTail.value = 'Tailor';
  } 
}

window.toggleText = toggleText;
window.toggleTextTailor = toggleTextTailor;


document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = './profile_upload.html';
});


document.getElementById("uploadBtn").onclick = async function addProfile(){

    event.preventDefault();

    await upImg();

    const service = document.querySelector('#upc').value;
    console.log(service);

    // const service = document.querySelector('#service').value;
    // console.log(service);

    const projectTitle = document.querySelector('#projectTitle').value;
    console.log(projectTitle);

    const description = document.querySelector('#description').value;
    console.log(description);

    let projectImage = document.querySelector('#img-preview').src;
    // projectImage =imgURL;
    console.log(projectImage+"--------------------------------------");
    
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
                // service: `${upc}`,
                service: `${service}`,
                title: `${projectTitle}`,
                description:`${description}`,
                latitude: user_location_lat,
                longitude: user_location_long,
                projectImage:`${projectImage}`
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


