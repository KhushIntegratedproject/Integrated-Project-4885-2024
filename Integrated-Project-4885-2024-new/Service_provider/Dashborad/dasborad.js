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


    let map;
    const dataArray = [];

    document.addEventListener('DOMContentLoaded', function() {
        // Get location on page load
        getLocation();

        var firestore = firebase.firestore();

        var collectionRef = firestore.collection("addPost");

        // Reference to your collection

        // Retrieve all documents in the collection
        collectionRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                dataArray.push({
                    id: doc.id,
                    data: doc.data()
                });

                console.log(dataArray);
            });

            // Add markers after data is fetched
            addMarkers();
            // addDiscover_cards();

        }).catch(error => {
            console.error("Error getting documents: ", error);
        });
    });

    function getLocation() {
        function gotLocation(position) { 
            console.log(position);
            const user_location_lat = position.coords.latitude;
            const user_location_long = position.coords.longitude;
            initMap(user_location_lat, user_location_long);
        }
        
        function failedToGet() { 
            console.log("There was some issue");
            alert("Failed to get location");
        }

        navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
    }

    function initMap(lat, lng) {
        const position = { lat: lat, lng: lng };
        map = new google.maps.Map(document.getElementById("map"), {
            center: position,
            zoom: 12,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false
        });

        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: "You are here",
            draggable: true,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: "You are here",
        });

        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }

    let addDiscoverCalled = false;
    let clickedMarkerIndex = -1;

    function addMarkers() {

        if (!dataArray || dataArray.length === 0) {
            console.error("dataArray is empty or not defined.");
            return;
        }
    
        dataArray.forEach((item, index) => {
            if (!item || !item.data) {
                console.error(`Item at index ${index} is undefined or missing data property.`);
                return;
            }
        })

        dataArray.forEach((item, index) => {
            const marker = new google.maps.Marker({
                position: { lat: item.data.latitude, lng: item.data.longitude },
                map: map,
                title: item.data.price,
            });

            const contentString = `
                <div class="custom-info-window">
                    <h1>${item.data.service}</h1>
                    <p>${item.data.price}</p>
                </div>
                `;

            const infoWindow = new google.maps.InfoWindow({
                content: contentString,
            });

            infoWindow.open(map, marker);
            
            marker.addListener('click', function() {
                if (!addDiscoverCalled) {
                    addDiscoverCalled = true;
                    addDiscover_cards();
                }
            });

            console.log(`Marker ${index + 1}: ${item.data.price}`);
        });

        
    }

    function addDiscover_cards() {
        const add_discover_card = document.getElementById('artist_profiles');
    
        // Clear the existing discover cards
        add_discover_card.innerHTML = '';
    
        // Add the card for the clicked marker at the top
        if (clickedMarkerIndex == -1) {
            const clickedItem = dataArray[clickedMarkerIndex];
            console.log(clickedItem);
            if (clickedItem && clickedItem.data) {
                const newDiv = document.createElement('div');
                newDiv.classList.add('discover-card');
    
                newDiv.innerHTML = `
                    <div class="discover-img"></div>
                    <p>${clickedItem.data.title}</p>
                    <div class="discover-wrapper">
                        <div class="service-offer">
                            <div class="service-offer-text">Service Offered</div>
                            <div class="service-chip">
                                <div class="service-chip-text">${clickedItem.data.service}</div>
                            </div>
                        </div>
                    </div>
                `;
    
                add_discover_card.appendChild(newDiv);
            } else {
                console.error("Clicked item is undefined or missing data property.");
            }
        }
    
        // Add the rest of the cards
        dataArray.forEach((item, index) => {
            if (index !== clickedMarkerIndex) {
                if (!item || !item.data) {
                    console.error(`Item at index ${index} is undefined or missing data property.`);
                    return;
                }
    
                const newDiv = document.createElement('div');
                newDiv.classList.add('discover-card');
    
                newDiv.innerHTML = `
                    <div class="discover-img"></div>
                    <p>${item.data.title}</p>
                    <div class="discover-wrapper">
                        <div class="service-offer">
                            <div class="service-offer-text">Service Offered</div>
                            <div class="service-chip">
                                <div class="service-chip-text">${item.data.service}</div>
                            </div>
                        </div>
                        <a href="./dashborad.html"><button>Cancel</button></a>
                    </div>
                `;
    
                add_discover_card.appendChild(newDiv);
            }
        });
    
        add_discover_card.classList.remove('hide');
        add_discover_card.classList.add('view_discover_card');
        console.log("Discover cards added");
    }
    
    // Call addMarkers() to initialize the markers and add the listeners
    addMarkers();
    
    console.log("dataArray:", dataArray);
    