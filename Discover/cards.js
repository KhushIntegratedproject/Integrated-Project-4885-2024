import { markers } from "../Discover/markers";

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementById("cards-area");

    markers.forEach((marker) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        card.innerHTML = `<img
            src="${marker.featuredImg}"
            alt=""
        />
        <div class="card-details">
            <p class="name">${marker.locationName}</p>
            <div class="tag_and_hour">
                <span class="card-tag">${marker.tag.join(
                    ", "
                )}</span> | <span class="card-star"></span> <span class="card-rating">${
            marker.rating
        }</span>
            </div>
        </div>`;

        cards.appendChild(card);
    });
});
