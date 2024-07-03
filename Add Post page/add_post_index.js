import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,updateProfile, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc,doc,getDocs, getDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);
const storageRef = ref(storage);

// ----------make collection-------------

//   const period = {
//         first: 'games',
//         second:'science',
//         third: 'maths'
//     };
    
//     const docRefPromise = addDoc( collection (db, 'Images'), period);

//---------------------to create an collection, add and retrieve in firebase----------------------


document.getElementById("add-post-3to4btn").onclick = function addPostOption(){
    const service = document.querySelector('.dropdown-content1').value;
    console.log(service);

    const category = document.querySelector('.dropdown-content2').value;
    console.log(category);

    const condition = document.querySelector('.dropdown-content3').value;
    console.log(condition);

    const medium = document.querySelector('.dropdown-content4').value;
    console.log(medium);

    const choose = document.querySelector('.dropdown-content5').value;
    console.log(choose);

    const Price_option = document.querySelector('.dropdown-content6').value;
    console.log(Price_option);

    const price = document.querySelector('#price').value;
    console.log(price);

    const price_amount = document.querySelector('#price_amount').value;
    console.log(price_amount);

    const addPostData = {
                service: `${service}`,
                category: `${category}`,
                condition: `${condition}`,
                medium: `${medium}`,
                choose: `${choose}`,
                Price_option: `${Price_option}`,
                price: `${price}`,
                Price_option:`${price_amount}`,
            };
            
    const docRefPromise = addDoc( collection (db, 'addPost'), addPostData);

    // ----------Retrieveing data----------------
            // --------method 1 ------
    // const docRef = collection(db, 'addPost')

    //get collection data 
    // getDocs(docRef)
    //     .then((snapshot) =>{
    //         let addPostD = [];
    //         snapshot.docs.forEach((doc) =>{
    //             addPostD.push({ ...doc.data(), id: doc.id})
    //         })

    //         console.log(addPostD);
    //     })

        // ----------method 2 ------------
    // const docRef = doc (db, 'addPost', 'ZHpQcBzcsM05wDxW0yIA');
    // const docSnap = async getDoc(docRef);

    //     if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    // }

}

// -------------Select an image--------------

var ImgName, ImgUrl;
var files = [];
var reader = new FileReader();

document.getElementsByClassName("select").onclick = function(e){
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e =>{
        files = e.target.file;
        reader = new FileReader();
        reader.onload = function (){
            document.getElementById("myimg").src = reader.result;

        }
        reader.readAsDataURL(files[0]); 
        console.log(reader);
    }
    input.click();

}

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

document.getElementById('upload').onclick = function(){

        const metadata = {
        contentType: 'image/jpeg'
        }
    const ImgName = document.getElementById('namebox').value;

    console.log(ImgName);

    const storageRef = ref(storage, 'images/' + ImgName);
    const uploadTask = uploadBytesResumable(storageRef, ImgName, metadata);
    // var uploadTask = storageRef.ref('Images/'+ ImgName + ".png").put(files[0]);

    uploadTask.on('state_changed',
        (snapshot) => {

            var bytesTransferred = uploadTask.snapshot.bytesTransferred;
            var totalBytes = uploadTask.snapshot.totalBytes;

          
            const progress = ((bytesTransferred / totalBytes) * 100);

        //   const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              console.log(totalBytes);
              break;
          }
          console.log('Upload is ' + progress + '% done');
          console.log(bytesTransferred);
          console.log(totalBytes);
        }, 
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
            // ask.snapshot.ref.getDownloadURL(),
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          })
        
      
    )}


// -----------------changing page of add post button--------------

document.querySelector('#add-post-1to2btn').addEventListener('click', () => {
    document.querySelector('.add-post-page2').classList.add('visible');
    document.querySelector('.add-post-page1').classList.add('hidden');
  });

document.querySelector('#add-post-2to3btn').addEventListener('click', () => {
    document.querySelector('.add-post-page2').classList.remove('visible');
    document.querySelector('.add-post-page3').classList.add('visible');
  });

document.querySelector('#add-post-3to4btn').addEventListener('click', () => {
    document.querySelector('.add-post-page3').classList.remove('visible');
    document.querySelector('.add-post-page4').classList.add('visible');
  });

