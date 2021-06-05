const listingContainer = document.querySelector(".jackets-grid-container");
const jacketCategoryTitle = document.querySelector(".jacket-category-title");
const htmlTitle = document.querySelector("title");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const categoryId = params.get("category");

const url =
  "https://headless.epokestudio.no/wp-json/wc/store/products" +
  "?category=" +
  categoryId;

const mensLink = document.querySelector("#mens");
const womensLink = document.querySelector("#womens");

if (categoryId === "16") {
  womensLink.id = "active-nav";
}
if (categoryId === "17") {
  mensLink.id = "active-nav";
}

async function fetchListings() {
  try {
    const response = await fetch(url);
    const listings = await response.json();

    listingContainer.innerHTML = "";

    for (let i = 0; i < listings.length; i++) {
      if (!listings[i]) {
        continue;
      }
      if (i >= 21) {
        break;
      }

      let priceAdj = listings[i].prices.price / 100;

      htmlTitle.innerHTML =
        listings[0].categories[0].name + " Jackets | Rainy Days";

      jacketCategoryTitle.innerHTML = `${listings[0].categories[0].name}`;

      listingContainer.innerHTML += `
      <a href="./product.html?id=${listings[i].id}">
      <div class="jacket">
        <img src="${listings[i].images[0].src}" />
        <h3>${listings[i].name}</h3>
        <p>$ ${priceAdj}</p>
      </div></a>
    
      <a href="./product.html" class="listing">
        <img class="listing-photo"></img>
        </a>`;
    }
  } catch (error) {
    listingContainer.innerHTML = "";
    listingContainer.innerHTML = error;
  }
}

fetchListings();
