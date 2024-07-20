import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,updateProfile, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {getDatabase, set, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getFirestore, collection, addDoc, setDoc,doc,getDocs, getDoc} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

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

  firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);
// const auth = firebase.auth(app);

// // Elements
// const messageInput = document.getElementById('messageInput');
// const sendButton = document.getElementById('sendButton');
// const messagesDiv = document.getElementById('messages');

// // Send a message
// sendButton.addEventListener('click', () => {
//   const message = messageInput.value;
//   if (message) {
//     database.ref('messages').push().set({
//       message: message,
//       timestamp: Date.now()
//     });
//     messageInput.value = '';
//   }
// });

// // Listen for new messages
// database.ref('messages').on('child_added', (snapshot) => {
//   const messageData = snapshot.val();
//   const messageElement = document.createElement('div');
//   messageElement.textContent = messageData.message;
//   messagesDiv.appendChild(messageElement);
// });


  // Sign in anonymously
//   auth.signInAnonymously()
//     .then(() => {
//       console.log('Signed in anonymously');
//     })
//     .catch((error) => {
//       console.error('Error signing in:', error);
//     });

//   // Elements
//   const messageInput = document.getElementById('messageInput');
//   const sendButton = document.getElementById('sendButton');
//   const messagesDiv = document.getElementById('messages');

//   // Send a message
//   sendButton.addEventListener('click', () => {
//     const message = messageInput.value;
//     const userId = auth.currentUser ? auth.currentUser.uid : 'unknown';
//     if (message) {
//       database.ref('messages

// ').push().set({
//         message: message,
//         userId: userId,
//         timestamp: Date.now()
//       });
//       messageInput.value = '';
//     }
//   });

//   // Listen for new messages
//   database.ref('messages').on('child_added', (snapshot) => {
//     const messageData = snapshot.val();
//     const messageElement = document.createElement('div');
//     messageElement.className = 'message';
//     messageElement.textContent = `${messageData.userId}: ${messageData.message}`;
//     messagesDiv.appendChild(messageElement);
//     messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Auto-scroll to the bottom
//   });


//variables

var msgTxt = document.getElementById('msgTxt');
var sender;

if(sessionStorage.getItem('sender')){
    sender = sessionStorage.getItem('sender');}
// }else{
//     sender = prompt('PLEASE ENTER YOUR NAME');
//     sessionStorage.setItem('sender');
// }

//to send messages 

document.getElementById('msgBtn').addEventListener('click', sendMsg);

function sendMsg(){
    var msg = msgTxt.value;
    var timestamp = new Date().getTime();
    set(ref(db,'messages/'+timestamp), {
        msg : msg,
        sender: sender
    })
}



// to receive a msg 

// onChildAdded(ref(db, 'messages'), (data) =>{
//     console.log(data.val().sender + ':' + data.val().msg);

//     if(data.val().sender == sender){
//         messages.innerHTML += '<div id= outer class='+data.key+'><div id = inner cass me>you </div>';
//     }
// })

