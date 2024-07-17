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
// const storage = getStorage(app);
// const storageRef = ref(storage);

firebase.initializeApp(firebaseConfig);

// ----------make collection-------------

//   const period = {
//         first: 'games',
//         second:'science',
//         third: 'maths'
//     };
    
//     const docRefPromise = addDoc( collection (db, 'Images'), period);
  //------------user location -------


        // document.addEventListener('DOMContentLoaded', function () {
        //     document.getElementById('add-post-1to2btn').addEventListener('click', function () {
        //         getLocation();
        //     });
        // });

        // function getLocation() {
        //     navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
        // }

        // function gotLocation(position) {
        //     console.log(user_location_lat, user_location_long);
        //     // Optionally, you can show an alert or handle the position data
        //     user_location_lat = position.coords.latitude;
        //     user_location_long = position.coords.longitude;
        //     alert(`Latitude: ${user_location_lat}, Longitude: ${user_location_long}`);
        //     // initMap();
        // }

        // function failedToGet() {
        //     console.log("There was some issue");
        //     alert("Failed to get location");
        // }




//---------------------to create an collection, add and retrieve in firebase----------------------


document.getElementById("add-post-2to3btn").onclick = function addPostOption(){

  const service = document.querySelector('.Service').value;
  const category = document.querySelector('.Category').value;
  const condition = document.querySelector('.condition').value;
  const medium = document.querySelector('.size').value;
  const price = document.querySelector('#price').value;
  const description = document.querySelector('#description').value;
  const title = document.querySelector('#Title').value;

  let user_location_lat, user_location_long;

  function getLocation() {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  }

  getLocation().then(position => {
      user_location_lat = position.coords.latitude;
      user_location_long = position.coords.longitude;

      const addPostData = {
          service: service,
          category: category,
          condition: condition,
          medium: medium,
          price: price,
          description: description,
          title: title,
          latitude: user_location_lat,
          longitude: user_location_long
  };


            

    // ------------uploading data---------

    const docRefPromise = addDoc( collection (db, 'addPost'), addPostData);

    const firebaseRef = firebase.database().ref('addPost');

    // Adding data
    document.querySelector("#add-post-2to3btn").addEventListener('click', () => {
      firebaseRef.push(addPostData);
      firebaseRef.set({
        content: text,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    });

  })

    // ------------RETRIEVEING DATA -------------

    // Get a reference to the Firestore service
    var firestore = firebase.firestore();

    // Reference to your collection
    var collectionRef = firestore.collection("addPost");
    var dataArray = [];

    // Retrieve all documents in the collection
    collectionRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            dataArray.push({
              id: doc.id,
              data: doc.data()
          });
           // Now `dataArray` contains all documents as an array
        });
    }).catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  
  }
    

// -------------Select an image--------------

// var ImgName, ImgUrl;
// var files = [];
// var reader = new FileReader();

// document.getElementsByClassName("select").onclick = function(e){
//     var input = document.createElement('input');
//     input.type = 'file';

//     input.onchange = e =>{
//         files = e.target.file;
//         reader = new FileReader();
//         reader.onload = function (){
//             document.getElementById("myimg").src = reader.result;

//         }
//         reader.readAsDataURL(files[0]); 
//         console.log(reader);
//     }
//     input.click();

// }

// const fileSelector = document.getElementById('file-selector');
// fileSelector.addEventListener('change', (event) => {
//   const fileList = event.target.files;
//   console.log(fileList);
// });

// const dropArea = document.getElementById('drop-area');

// dropArea.addEventListener('dragover', (event) => {
//   event.stopPropagation();
//   event.preventDefault();
//   // Style the drag-and-drop as a "copy file" operation.
//   event.dataTransfer.dropEffect = 'copy';
// });

// dropArea.addEventListener('drop', (event) => {
//   event.stopPropagation();
//   event.preventDefault();
//   const fileList = event.dataTransfer.files;
//   console.log(fileList);
// });

// ----------reading metadata------
// function getMetadataForFileList(fileList) {
//     for (const file of fileList) {
//       // Not supported in Safari for iOS.
//       const name = file.name ? file.name : 'NOT SUPPORTED';
//       // Not supported in Firefox for Android or Opera for Android.
//       const type = file.type ? file.type : 'NOT SUPPORTED';
//       // Unknown cross-browser support.
//       const size = file.size ? file.size : 'NOT SUPPORTED';
//       console.log({file, name, type, size});
//     }
//   }

//   function readImage(file) {
//     // Check if the file is an image.
//     if (file.type && !file.type.startsWith('image/')) {
//       console.log('File is not an image.', file.type, file);
//       return;
//     }
  
//     const reader = new FileReader();
//     reader.addEventListener('load', (event) => {
//       img.src = event.target.result;
//     });
//     reader.readAsDataURL(file);
//   }


//   const output = document.getElementById('output');
//   if (window.FileList && window.File) {
//     document.getElementById('file-selector').addEventListener('change', event => {
//       output.innerHTML = '';
    //   for (const file of event.target.files) {
    //     const li = document.createElement('li');
        // const name = file.name ? file.name : 'NOT SUPPORTED';
        // const type = file.type ? file.type : 'NOT SUPPORTED';
        // const size = file.size ? file.size : 'NOT SUPPORTED';
        // li.textContent = `name: ${name}, type: ${type}, size: ${size}`;
        // output.appendChild(li);
    //   }

    //   var input = document.createElement('input');
    //     input.type = 'file';
    
    //     input.onchange = e =>{
    //         files = e.target.file;
    //         const reader = new FileReader();
    //         reader.addEventListener('load', (event) => {
    //             img.src = event.target.result;
    //         });
    //         reader.readAsDataURL(files);
    //         console.log(reader);
    //          };
    //          input.click();
    //     }
       

    // var input = document.createElement('input');
    //     input.type = 'file';
    
    //     input.onchange = e =>{
    //         files = e.target.file;
    //         reader = new FileReader();
    //         reader.onload = function (){
    //             document.getElementById("myimg").src = reader.result;
    
    //         }
    //         reader.readAsDataURL(files[0]); 
    //         console.log(reader);
    //     }
    //     input.click();
//   )}










// ------------------upload an image--------------

// document.getElementById('upload').onclick = function(){

//         const metadata = {
//         contentType: 'image/jpeg'
//         }
//     const ImgName = document.getElementById('namebox').value;

//     console.log(ImgName);

//     const storageRef = ref(storage, 'images/' + ImgName);
//     const uploadTask = uploadBytesResumable(storageRef, ImgName, metadata);
//     // var uploadTask = storageRef.ref('Images/'+ ImgName + ".png").put(files[0]);

//     uploadTask.on('state_changed',
//         (snapshot) => {

//             var bytesTransferred = uploadTask.snapshot.bytesTransferred;
//             var totalBytes = uploadTask.snapshot.totalBytes;

          
//             const progress = ((bytesTransferred / totalBytes) * 100);

//         //   const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
//           switch (snapshot.state) {
//             case 'paused':
//               console.log('Upload is paused');
//               break;
//             case 'running':
//               console.log('Upload is running');
//               console.log(totalBytes);
//               break;
//           }
//           console.log('Upload is ' + progress + '% done');
//           console.log(bytesTransferred);
//           console.log(totalBytes);
//         }, 
//         (error) => {
//           switch (error.code) {
//             case 'storage/unauthorized':
//               // User doesn't have permission to access the object
//               break;
//             case 'storage/canceled':
//               // User canceled the upload
//               break;
      
//             // ...
      
//             case 'storage/unknown':
//               // Unknown error occurred, inspect error.serverResponse
//               break;
//           }
//         }, 
//             // ask.snapshot.ref.getDownloadURL(),
//           // Upload completed successfully, now we can get the download URL
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             console.log('File available at', downloadURL);
//           })
        
      
//     )}


// -----------------changing page of add post button--------------

document.querySelector('#add-post-1to2btn').addEventListener('click', () => {
    document.querySelector('.add-post-page2').classList.add('visible');
    document.querySelector('.add-post-page1').classList.add('hidden');
  });

document.querySelector('#add-post-2to3btn').addEventListener('click', () => {
    document.querySelector('.add-post-page2').classList.remove('visible');
    document.querySelector('.add-post-page3').classList.add('visible');
  });


 