const listingContainer = document.querySelector(".jackets-grid-container");
const url = "https://headless.epokestudio.no/wp-json/wc/store/products/";

async function fetchListings() {
  try {
    const response = await fetch(url);
    const listings = await response.json();

    console.log(listings);

    listingContainer.innerHTML = "";

    for (let i = 0; i < listings.length; i++) {
      if (!listings[i]) {
        continue;
      }
      if (i >= 15) {
        break;
      }

      let priceAdj = listings[i].prices.price / 100;

      listingContainer.innerHTML += `
      <a href="./product.html?id=${listings[i].id}">
      <div class="jacket">
        <img src="${listings[i].images[0].src}" />
        <h3>${listings[i].name}</h3>
        <p>$ ${priceAdj}</p>
      </div></a>
    
      <a href="/product.html" class="listing">
        <img class="listing-photo"></img>""
        <div class="listing-username">
        <p class="listing-username-text">
        Taken by:  </br>
        Likes: </p>
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
