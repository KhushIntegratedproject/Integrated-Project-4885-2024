import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,updateProfile, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc,doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const google_provider = new GoogleAuthProvider();

const signUpForm = document.querySelector('#logIn');

 signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //get user info

    const email = signUpForm['LogIn-email'].value;
    const password = signUpForm['LogIn-password'].value;

    console.log(email,password);

    //sign up the user
    createUserWithEmailAndPassword(auth, email,password).then(cred =>{
        console.log(cred.user);

        const LogIn_close = document.querySelector('.LoginIn'); 
        // LogIn_close.getInstance(LogIn_close).close();

        signUpForm.reset();
    })

})

// ----------------------------------

// logout button code

// const logout = document.querySelector('#logout');
 
// logout.addEventListener('click', (e)=>{
//     e.preventDefault();
//     auth.signOut().then(()=>{
//         console.log('user signed out');
//     });
// })

// -----------------------------------

const Create_account = document.querySelector('#Create__account');

Create_account.addEventListener('click', (e) =>{

    e.preventDefault();
    
    var full_Name = document.getElementById('Full_Name').value;
    var New_passoword = document.getElementById('NewPassword').value;
    var Re_enter_password = document.getElementById('Re_enter_password').value;

})

 