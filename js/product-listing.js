const apiKey = "3957450-287d8f08397456bf01b762222";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const photoId = params.get("id");

const url = "https://pixabay.com/api/?key=" + apiKey + "&id=" + photoId;

const detailsContainer = document.querySelector(".details-container");
const htmlTitle = document.querySelector("title");

async function fetchDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    console.log(details);

    detailsContainer.innerHTML = `<div>
    <img class="full-photo" src=${details.hits[0].largeImageURL}></img>
    <div class="listing-username">
    <p class="listing-username-text">Taken by: ${details.hits[0].user}</p>
    <p class="listing-username-text">Tags: ${details.hits[0].tags}</p>
    <p class="listing-username-text">Views: ${details.hits[0].views}</p>
    <p class="listing-username-text">Likes: ${details.hits[0].likes}</p>
    </div>
    </div>
    `;

    htmlTitle.innerHTML = details.hits[0].user;
  } catch (error) {
    console.log(error);
    detailsContainer.innerHTML = "";
    detailsContainer.innerHTML = error;
  }
}

fetchDetails();
