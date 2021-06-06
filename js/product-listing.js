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

    let priceAdj = details.prices.price / 100;

    productImage.innerHTML = `<img id="full-photo" src=${details.images[0].src} />`;

    detailsContainer.innerHTML = `
    <h1>${details.name}</h1>
    <h3>$ ${priceAdj}</h3>
    <a class="hero-button-link" href="./checkout.html">Buy now</a>
    <hr />

${details.description}

    `;

    /* LIGHTBOX */
    const image = document.querySelector("#full-photo");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);
    image.addEventListener("click", (e) => {
      lightbox.classList.add("active-lightbox");
      fullPhoto = `<img style="max-width: 95vw; max-height: 95vh" src=${details.images[0].src}></img>`;
      lightbox.innerHTML = fullPhoto;
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) return;
      lightbox.classList.remove("active-lightbox");
    });

    htmlTitle.innerHTML = details.name;
  } catch (error) {
    detailsContainer.innerHTML = "";
    detailsContainer.innerHTML = error;
  }
}

fetchDetails();
