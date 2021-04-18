const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const productId = params.get("id");

const url =
  "https://headless.epokestudio.no/wp-json/wc/store/products/" + productId;

const detailsContainer = document.querySelector(".product-text");
const productImage = document.querySelector(".product-image");

const htmlTitle = document.querySelector("title");

async function fetchDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    console.log(details);

    let priceAdj = details.prices.price / 100;

    productImage.innerHTML = `<img src=${details.images[0].src} />`;

    detailsContainer.innerHTML = `
    <h1>${details.name}</h1>
    <h3>$ ${priceAdj}</h3>
    <a class="hero-button-link" href="/checkout.html">Buy now</a>
    <hr />

${details.description}

    `;
    htmlTitle.innerHTML = details.name;
  } catch (error) {
    console.log(error);
    detailsContainer.innerHTML = "";
    detailsContainer.innerHTML = error;
  }
}

fetchDetails();
