// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

import { getAuth, CreateUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, set, ref} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { Database } from "firebase/database";

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
      first: "khushi",
      last: "kaur",
      born: 2002
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

addUser();


//Setting up Sign In butto

// function SignIn(){

//   //get all input fields

//   email = document.getElementById('email').value;
//   password = document.getElementById('password').value;
//   full_name = document.getElementById('Full_Name').value;
//   New_passoword = document.getElementById('NewPassword').value;
//   Re_enter_password = document.getElementById('Re_enter_password').value;
// }

// // validate input fields 

// if (validate_email(email) == false || validate_password(password) == false){
//   alert('Email or Password is incorrect')
//   return
// }

// if( validate_field(full_name) == false || validate_field(New_passoword) == false || validate_field(Re_enter_password) == false){

//   alert('One of field is incorrect')
//   return
// }

// //Move with Auth
// auth.CreateUserWithEmailAndPassword(email,password)
// .then(function(){

//   //Declare User variable
//   var user = auth.currentUser;

//   //Add this user to firebase data
//   var database_ref = Database.ref();

//   //Creating user data
//   var user_data = {
//     email : email,
//     full_name : full_name,
//     last_login: Date.now(),
//   }

//   database_ref.child('users' + user.uid).set(user_data)

//   alert('User created');

// })


// .catch(function(error){
//   //firebase will use this to alert

//   var error_code = error.code;
//   var error_message = error.message;

//   alert(error_message);
// })


// function validate_email(email){
//   expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
//   if(expression.test(email) == true){

//     // email is good
//     return true;
//   }
//   else{
//     return false;
//   }
// }

// function validate_password(password){
// //Firebase will accept length greater than 6 

//   if(password<6){
//     return false;
//   }
//   else{
//     return true;
//   }
// }

// function validate_field(field)
// {
//   if(field == null){
//     return false;
//   }

//   if(field.length <= 0){
//     return false
//   }else {
//     return true;
//   }

// }

// -----------------------------------------------

// 2nd method

const SignIn = document.getElementById('SignIn');

SignIn.addEventListener('click',(e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var full_Name = document.getElementById('Full_Name').value;
  var New_passoword = document.getElementById('NewPassword').value;
  var Re_enter_password = document.getElementById('Re_enter_password').value;

  CreateUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    set(ref(Database, 'users' + user.uid),{
      'Username' : full_Name,
      'Password' : password,
      'Email': email,
    })
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
    // ..
  });

  

})