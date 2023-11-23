class Product {
  constructor(imageSrc, title, stars, currency, price) {
    this.imageSrc = imageSrc;
    this.title = title;
    this.stars = stars;
    this.currency = currency;
    this.price = price;
  }

  render() {
    throw new Error("render method not implemented");
  }
}

class ProductElement extends Product {
  constructor(imageSrc, title, stars, currency, price) {
    super(imageSrc, title, stars, currency, price);
  }

  render() {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("best-selling-product__item");

    const starIcon = `
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1435 10.9081C13.9463 11.0993 13.8556 11.3758 13.9006 11.6469L14.5776 15.3941C14.6347 15.7117 14.5007 16.0331 14.2349 16.2166C13.9744 16.407 13.6279 16.4299 13.3438 16.2775L9.97065 14.5182C9.85336 14.4557 9.72313 14.4222 9.58985 14.4184H9.38345C9.31186 14.4291 9.24179 14.4519 9.17782 14.487L5.80389 16.2547C5.6371 16.3385 5.44822 16.3682 5.26315 16.3385C4.81227 16.2532 4.51144 15.8236 4.58531 15.3705L5.26315 11.6233C5.30808 11.3499 5.21745 11.0719 5.02019 10.8777L2.27002 8.21201C2.04002 7.98886 1.96005 7.65375 2.06515 7.35138C2.1672 7.04978 2.42767 6.82968 2.74222 6.78017L6.52742 6.23105C6.81531 6.20134 7.06816 6.02617 7.19763 5.76722L8.86556 2.34756C8.90516 2.2714 8.95619 2.20133 9.01788 2.14192L9.08642 2.08861C9.12222 2.04901 9.16335 2.01626 9.20904 1.9896L9.29206 1.95914L9.42153 1.90582H9.74217C10.0285 1.93553 10.2806 2.10689 10.4124 2.36279L12.1024 5.76722C12.2243 6.01627 12.4611 6.18916 12.7345 6.23105L16.5197 6.78017C16.8396 6.82587 17.1069 7.04674 17.2128 7.35138C17.3126 7.65679 17.2265 7.9919 16.9919 8.21201L14.1435 10.9081Z"
        fill="#F6B76F"
      />
    </svg>
`;

    const starIcons = Array.from({ length: this.stars }, () => starIcon).join(
      ""
    );

    const productInfo = `
    <div class="best-selling-product__item-content">
      <div class="best-selling-product__item-image-content">
        <img
          class="best-selling-product__item-image"
          src="${this.imageSrc}"
          alt=""
          srcset=""
        />
      </div>
      <div class="best-selling-product__item-info">
        <h5 class="best-selling-product__item-name">${this.title}</h5>
        <div class="ratings best-selling-product__item-ratings">
          ${starIcons}
        </div>
        <div class="best-selling-product__item-details">
          <span class="best-selling-product__item-price">
            <span class="best-selling-product__item-price-currency">${this.currency}</span>
            <span>${this.price}</span>
          </span>
          <button class="best-selling-product__item-button">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.1342 12.2102C22.1342 11.4411 21.5107 10.8176 20.7415 10.8176H13.7782V3.85427C13.7782 3.08512 13.1547 2.46161 12.3856 2.46161C11.6164 2.46161 10.9929 3.08512 10.9929 3.85427V10.8176H4.02962C3.26048 10.8176 2.63696 11.4411 2.63696 12.2102C2.63696 12.9794 3.26048 13.6029 4.02962 13.6029H10.9929V20.5662C10.9929 21.3353 11.6164 21.9588 12.3856 21.9588C13.1547 21.9588 13.7782 21.3353 13.7782 20.5662V13.6029H20.7415C21.5107 13.6029 22.1342 12.9794 22.1342 12.2102Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

    productsContainer.innerHTML = productInfo;
    return productsContainer;
  }
}

class ProductRenderer {
  constructor(products, containerSelector, productClass) {
    this.products = products;
    this.container = document.querySelector(containerSelector);
    this.productClass = productClass;
  }

  renderData() {
    this.products.forEach((productData) => {
      const product = new this.productClass(
        productData.imageSrc,
        productData.title,
        productData.stars,
        productData.currency,
        productData.price
      );
      const productElement = product.render();
      this.container.appendChild(productElement);
    });
  }
}

const productData = [
  {
    imageSrc: "../../images/chair1.png",
    title: "Sakarias Armchair",
    stars: 5,
    currency: "$",
    price: 392,
  },
  {
    imageSrc: "../../images/chair2.png",
    title: "Baltsar Chair",
    stars: 5,
    currency: "$",
    price: 299,
  },
  {
    imageSrc: "../../images/chair3.png",
    title: "Anjay Chair",
    stars: 5,
    currency: "$",
    price: 921,
  },
  {
    imageSrc: "../../images/chair4.png",
    title: "Nyantuy Chair",
    stars: 5,
    currency: "$",
    price: 921,
  },
];

const productRenderer = new ProductRenderer(
  productData,
  ".best-selling-product__grid",
  ProductElement
);

productRenderer.renderData();
