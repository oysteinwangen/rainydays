const listingContainer = document.querySelector(".listing-container");
const url = "http://headless.epokestudio.no/wp-json/wc/store/products";

async function fetchListings() {
  try {
    const response = await fetch(url);
    const listings = await response.json();

    console.log(listings);

    photosContainer.innerHTML = "";

    for (let i = 0; i < listings.hits.length; i++) {
      if (!listings.hits[i].user) {
        continue;
      }
      if (i >= 15) {
        break;
      }

      listingContainer.innerHTML += `<a href="/details.html?id=${photos.hits[i].id}" class="listing">
        <img class="listing-photo" src="${photos.hits[i].largeImageURL}></img>""
        <div class="listing-username">
        <p class="listing-username-text">
        Taken by: ${photos.hits[i].user} </br>
        Likes: ${photos.hits[i].likes}</p>
        </div>
        </a>`;
    }
  } catch (error) {
    console.log(error);
    listingContainer.innerHTML = "";
    listingContainer.innerHTML = error;
  }
}

fetchListings();
