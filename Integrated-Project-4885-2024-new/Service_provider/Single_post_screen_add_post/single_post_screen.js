// to add post of user to discover card folder
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,updateProfile, GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
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

// WORKINGSSSSSSSSSSSS===================
var firestore = firebase.firestore();
var collectionRef = firestore.collection("addPost");
var profileDataArray = [];
var count=0;


//----------------------------Counting number of addpost----------------------//

// document.addEventListener('DOMContentLoaded', function() {
//     const storedCount = localStorage.getItem('count');
//     const storedDataArray = localStorage.getItem('dataArray');

//     if (storedCount !== null && storedDataArray !== null) {
//         const count = parseInt(storedCount, 10);
//         const dataArray = JSON.parse(storedDataArray);

//         displaySinglePost(count, dataArray);
//     } else {
//         console.error('No post data found in localStorage');
//     }
// });

// function displaySinglePost(count, dataArray) {
//     const post = dataArray[count];

//     if (post) {
//         let add_single_post = document.getElementById('single-post-screen');
//         add_single_post.innerHTML = `
//             <h1>${post.data.title || 'Post Title'}</h1>
//             <div class="frame"><div class="div">${post.data.service}</div></div>
//             <div class="project" style="margin: auto;">
//                 <div class="project-pic" style='background: url(https://picsum.photos/300) lightgray 50% / cover no-repeat;'></div>
//             </div>
//             <div class="Category-1">
//                 <div class="text-wrapper">Category</div>
//                 <div class="text-wrapper">Condition</div>
//                 <div class="text-wrapper">Size</div>
//             </div>
//             <div class="Category-2">
//                 <div class="text-wrapper-Bold">${post.data.category}</div>
//                 <div class="text-wrapper-Bold">${post.data.condition}</div>
//                 <div class="text-wrapper-Bold">${post.data.medium}</div>
//             </div>
//             <p>${post.data.description || 'No description available'}</p>
//             <h4>Posted by</h4>
//             <div class="User_detail">
//                 <div class="ellipse"></div>
//                 <div class="Name">
//                     <div class="text-wrapper-Bold">Mudit Dhangar</div>
//                     <div class="text-wrapper">Richmond, Vancouver</div>
//                 </div>
//             </div>
//             <div class="group-7">
//                 <a href="../DiscoverPage_ServiceProvider/discover_serviceprovider.html"><div class="arrow-down-wrapper"><i class="fa-solid fa-arrow-left fa-xl"></i></div></a>
//                 <div class="group-wrapper">
//                     <div class="div-wrapper">
//                         <a href="../Chat page/chat.html">
//                             <div class="arrow-down-wrapper"><i class="fa-regular fa-message fa-xl"></i></div>
//                         </a>
//                     </div>
//                 </div>
//                 <div class="offer">
//                     <div class="offer_detail">
//                         <div class="text-wrapper-offer offer-1">Offer ${post.data.price}</div>
//                         <div class="text-wrapper-offer">accept this price</div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     } else {
//         console.error('Post not found');
//     }
// }




document.addEventListener('DOMContentLoaded', function() {
    
    
    const storedCount = localStorage.getItem('count');
    const storedDataArray = localStorage.getItem('dataArray');

    if (storedCount !== null && storedDataArray !== null) {
        const count = parseInt(storedCount, 10);
        const dataArray = JSON.parse(storedDataArray);

        if (dataArray && Array.isArray(dataArray) && count >= 0 && count < dataArray.length) {
            displaySinglePost(count, dataArray);
        } else {
            console.error('Invalid data or count in localStorage');
        }
    } else {
        console.error('No post data found in localStorage');
    }
});

function displaySinglePost(count, dataArray) {
    const post = dataArray[count];

    if (post && post.data) {
        const title = post.data.title || 'Post Title';
        const service = post.data.service || 'Service';
        const category = post.data.category || 'Category';
        const condition = post.data.condition || 'Condition';
        const medium = post.data.medium || 'Medium';
        const description = post.data.description || 'No description available';
        const price = post.data.price || 'N/A';

        let add_single_post = document.getElementById('single-post-screen');
        if (add_single_post) {
            add_single_post.innerHTML = `
                <h1>${title}</h1>
                <div class="frame"><div class="div">${service}</div></div>
                <div class="project" style="margin: auto;">
                    <div class="project-pic" style='background: url(https://picsum.photos/300) lightgray 50% / cover no-repeat;'></div>
                </div>
                <div class="Category-1">
                    <div class="text-wrapper">Category</div>
                    <div class="text-wrapper">Condition</div>
                    <div class="text-wrapper">Size</div>
                </div>
                <div class="Category-2">
                    <div class="text-wrapper-Bold">${category}</div>
                    <div class="text-wrapper-Bold">${condition}</div>
                    <div class="text-wrapper-Bold">${medium}</div>
                </div>
                <p>${description}</p>
                <h4>Posted by</h4>
                <div class="User_detail">
                    <div class="ellipse"></div>
                    <div class="Name">
                        <div class="text-wrapper-Bold">Mudit Dhangar</div>
                        <div class="text-wrapper">Richmond, Vancouver</div>
                    </div>
                </div>
                <div class="group-7">
                    <a href="../DiscoverPage_ServiceProvider/discover_serviceprovider.html"><div class="arrow-down-wrapper"><i class="fa-solid fa-arrow-left fa-xl"></i></div></a>
                    <div class="group-wrapper">
                        <div class="div-wrapper">
                            <a href="../Chat page/chat.html">
                                <div class="arrow-down-wrapper"><i class="fa-regular fa-message fa-xl"></i></div>
                            </a>
                        </div>
                    </div>
                    <div class="offer">
                        <div class="offer_detail">
                            <div class="text-wrapper-offer offer-1">Offer ${price}</div>
                            <div class="text-wrapper-offer">accept this price</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            console.error('Element with id "single-post-screen" not found');
        }
    } else {
        console.error('Post not found or invalid post data');
    }
}
