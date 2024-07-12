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

//----------------------------Counting number of addpost----------------------//

// Get a reference to the Firestore service
var firestore = firebase.firestore();

// Reference to your collection

var collectionRef = firestore.collection("addProfile");
var profileDataArray = [];
var count=0;
// console.log(count);

var i=0;



collectionRef.get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
       
        profileDataArray.push({
          id: doc.id,
          data: doc.data()
      });

        i++;
        // console.log(i);
       // Now `dataArray` contains all documents as an array
    });

    for(count;count<i;count++){

            let add_profile_article = document.getElementById('discover_post_cards');

            // Create a new div element
            const newDiv = document.createElement('div');

            // Set attributes, styles, or content to the new div element (optional)
            newDiv.innerHTML = 
                    `
                        <article class='margin_article'>
                            <div class="project">
                                <div class="project-profile">
                                    <img src="../icons/Project_pic.png" alt="" class="profile-img"></img>
                                    <div class="project-name">khushpreet kaur </div>
                                </div>
                                <div class="project-pic">
                                    <div class="project-chip">
                                        <div class="chip-text">${profileDataArray[count].data.service}</div>
                                    </div>
                                </div>
                                <p>${profileDataArray[count].data.title}</p>
                                <div class="hash-tag">
                                    <div class="hast-tag-text"># ${profileDataArray[count].data.description}}</div>
                                </div>
                            </div>
                        </article>
                    `;
                    

            // Append the new div element to the article
            add_profile_article .appendChild(newDiv);

            localStorage.setItem('savedHtml', newDiv);

            // Save 'myVariable' to local storage
            localStorage.setItem('count', count);

            // previous_count = i;
        //    console.log(count);

        }
        

    }
        
)

//------------ FILTER FOR SERVICE BUTTON -----------

function filterPosts(serviceType) {
    const filteredPosts = profileDataArray.filter(post => {
        const serviceMatches = post.data.service.toLowerCase() === serviceType.toLowerCase() || serviceType === "";
        return serviceMatches;
    });

    // Clear existing posts
    const postContainer = document.getElementById('discover_post_cards');
    postContainer.innerHTML = '';

    // Render filtered posts
    filteredPosts.forEach(post => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <article class='margin_article'>
                <div class="project">
                    <div class="project-profile">
                        <img src="../icons/Project_pic.png" alt="" class="profile-img"></img>
                        <div class="project-name">khushpreet kaur</div>
                    </div>
                    <div class="project-pic">
                        <div class="project-chip">
                            <div class="chip-text">${post.data.service}</div>
                        </div>
                    </div>
                    <p>${post.data.description || 'No description available'}</p>
                    <div class="hash-tag">
                        <div class="hast-tag-text"># ${post.data.category}, #${post.data.condition}</div>
                    </div>
                </div>
            </article>
        `;
        postContainer.appendChild(newDiv);
    });
}

// Function to handle service selection
function service_filter() {
    const service = document.getElementById("service").value.trim();
    console.log(`Service: ${service}`);

    filterPosts(service);
}

// Add event listener to the search button
document.getElementById('search').addEventListener('click', service_filter);

// Initial rendering of all posts
filterPosts('');



