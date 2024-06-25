const markers = [
    {
        locationName: "Guu Original Thurlow",
        lat: 49.2795446,
        lng: -123.1426288,
        address: "838 Thurlow St, Vancouver, BC V6E 1W2, Canada",
        img: "default.jpg", // Provide a default image path or URL
        tag: ["Thrift"],
        open: "11:00 AM - 10:00 PM",
        rating: "4.5",
    },
    {
        locationName: "Noah's Cafe",
        lat: 49.2823044,
        lng: -123.1513701,
        address: "1096 Denman St, Vancouver, BC V6G 2M8, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "7:00 AM - 8:00 PM",
        rating: "4.7",
    },
    {
        locationName: "Shabusen Yakiniku House",
        lat: 49.28017,
        lng: -123.1381321,
        address: "755 Burrard St #202, Vancouver, BC V6Z 1X6, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "11:30 AM - 10:30 PM",
        rating: "4.3",
    },
    {
        locationName: "La Playita Seafood",
        lat: 49.2754984,
        lng: -123.1247803,
        address: "360 Cambie St, Vancouver, BC V6B 1G8, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "12:00 PM - 9:00 PM",
        rating: "4.6",
    },
    {
        locationName: "Suika Japanese Restaurant",
        lat: 49.2699782,
        lng: -123.1491633,
        address: "1626 W Broadway, Vancouver, BC V6J 1X6, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "12:00 PM - 10:00 PM",
        rating: "4.4",
    },

    // duplication

    {
        locationName: "Guu Original Thurlow",
        lat: 49.2795446,
        lng: -123.1426288,
        address: "838 Thurlow St, Vancouver, BC V6E 1W2, Canada",
        img: "default.jpg", // Provide a default image path or URL
        tag: ["Thrift"],
        open: "11:00 AM - 10:00 PM",
        rating: "4.5",
    },
    {
        locationName: "Noah's Cafe",
        lat: 49.2823044,
        lng: -123.1513701,
        address: "1096 Denman St, Vancouver, BC V6G 2M8, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "7:00 AM - 8:00 PM",
        rating: "4.7",
    },
    {
        locationName: "Shabusen Yakiniku House",
        lat: 49.28017,
        lng: -123.1381321,
        address: "755 Burrard St #202, Vancouver, BC V6Z 1X6, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "11:30 AM - 10:30 PM",
        rating: "4.3",
    },
    {
        locationName: "La Playita Seafood",
        lat: 49.2754984,
        lng: -123.1247803,
        address: "360 Cambie St, Vancouver, BC V6B 1G8, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "12:00 PM - 9:00 PM",
        rating: "4.6",
    },
    {
        locationName: "Suika Japanese Restaurant",
        lat: 49.2699782,
        lng: -123.1491633,
        address: "1626 W Broadway, Vancouver, BC V6J 1X6, Canada",
        img: "default.jpg",
        tag: ["Thrift"],
        open: "12:00 PM - 10:00 PM",
        rating: "4.4",
    },
];

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const showPosition = (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log(lat, lng);
        const userLocation = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
        });
        return userLocation, showPosition;
    };

    const showError = (error) => {
        console.log(error);
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("not supported");
        }
    };

    getLocation();

    // Location Markers
    // ? green marker
    const fehMarker = "./icons/icon-green.png";

    // const centerMap = showPosition();
    const centerMap = { lat: 49.2347143, lng: -123.1574978 };

    const mapOptions = {
        center: centerMap,
        zoom: 15,
        disableDefaultUI: true,
    };

    const map = new Map(document.getElementById("map"), mapOptions);

    const infoWindow = new google.maps.InfoWindow({
        minWidth: 200,
        maxWidth: 200,
    });

    for (let i = 0; i < markers.length; i++) {
        const marker = new google.maps.Marker({
            position: { lat: markers[i]["lat"], lng: markers[i]["lng"] },
            map: map,
            icon: fehMarker,
        });

        function createInfoWindows() {
            const infoWindowContent = `

                <div class="feh-content">
                <h3>${markers[i].locationName}</h3>
                <p>${markers[i].address}</p>
                </div>
            `;

            google.maps.event.addListener(marker, "click", function () {
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);
            });
        }

        createInfoWindows();
    }
    return markers;
}

if (!markers === null) {
    const container = document.getElementById("container");

    const containerWrapper = document.createElement("div");

    container.appendChild(containerWrapper);
}

// Sidebar and Cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementById("cards-area");
    console.log(cards);

    for (let i = 0; i < markers.length; i++) {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        card.innerHTML = `<img
            src="https://www.highsnobiety.com/static-assets/dato/1682630959-vintage-clothes-thrift-shopping-05.jpg"
            alt=""
        />
        <div class="card-details">
            <p class="name">${markers[i].locationName}</p>
            <!-- <p class="address">${markers[i].address}</p> -->
            <p class="tag_and_hour">
                <span>${markers[i].tag.join(", ")}</span> | <span>${
            markers[i].rating
        }</span>
            </p>
            <!-- <p class="rating">${markers[i].rating}</p> -->
        </div>`;

        cards.appendChild(card);
    }
});

// // Initialize map
// window.initMap = initMap;
