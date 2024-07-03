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
        featuredImg: "https://picsum.photos/200/300?random=663",
        category: "Upcycle",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=772",
        category: "Upcycle",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=663",
        category: "Upcycle",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=693",
        category: "Upcycle",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=999",
        category: "Upcycle",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=234",
        category: "Donate",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=359",
        category: "Fashion",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=593",
        category: "Donate",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=637",
        category: "Tailor",
        price: 39,
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
        featuredImg: "https://picsum.photos/200/300?random=693",
        category: "Tailor",
        price: 39,
    },
];

let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const showPosition = (position) => {
        let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        map.setCenter(pos);

        const userLocation = new google.maps.Marker({
            position: { lat: pos.lat, lng: pos.lng },
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
    const fehMarker = "../Discover/icons/icon-green.png";

    const mapOptions = {
        zoom: 15,
        disableDefaultUI: true,
    };

    const map = new Map(document.getElementById("map"), mapOptions);

    const infoWindow = new google.maps.InfoWindow({
        minWidth: 200,
        maxWidth: 200,
    });

    const markerLabel = (price, category) => {
        return {
            text: `$${price} - ${category}`,
            color: "black",
            fontSize: "16px",
        };
    };

    document.addEventListener("DOMContentLoaded", () => {
        // retrieve all the markers
        let allMarkers = [];

        const tags = document.querySelectorAll(".tag");
        const defaultTag = "All";

        tags.forEach((tag) => {
            if (tag.innerText === defaultTag) {
                tag.classList.add("filter-active");
            }
        });

        // * create markers
        const createMarker = (markerData) => {
            const marker = new google.maps.Marker({
                position: {
                    lat: markerData.lat,
                    lng: markerData.lng,
                },
                map: map,
                label: fehMarker,
            });

            const infoWindowContent = ``;

            // ! add info window when each marker is clicked

            return marker;
        };

        // * Clear Markers
        const clearMarkers = () => {
            allMarkers.forEach((marker) => marker.setMap(null));
            allMarkers = [];
        };

        // * Filter
        tags.forEach((tag) => {
            tag.addEventListener("click", () => {
                // ? remove active class from all tags
                tags.forEach((t) => t.classList.remove("filter-active"));

                // ? Add "filter-active" class to the clicked tag
                tag.classList.add("filter-active");

                // ? clear current markers from the array
                clearMarkers();

                // ! Check if "All" is selected
                if (tag.innerText === defaultTag) {
                    markers.forEach((markerData) => {
                        const newMarker = createMarker(markerData);
                        allMarkers.push(newMarker);
                        console.log(allMarkers);
                    });
                } else {
                    // ! Filtering markers
                    const filtered = markers.filter(
                        (filteredMarker) =>
                            filteredMarker.category === tag.innerText
                    );

                    filtered.forEach((filter) => {
                        const filteredMarker = createMarker(filter);
                        allMarkers.push(filteredMarker);
                    });

                    console.log(filtered);
                }
            });
        });

        // ! defaultMarker
        markers.forEach((defaultMarker) => {
            // const all = new google.maps.Marker({
            //     position: {
            //         lat: defaultMarker.lat,
            //         lng: defaultMarker.lng,
            //     },
            //     map: map,
            //     label: fehMarker,
            // });

            const dfMarker = createMarker(defaultMarker);
            allMarkers.push(dfMarker);
        });
    });
}

// *Initialize map
window.initMap = initMap;
