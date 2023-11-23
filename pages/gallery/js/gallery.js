class Image {
  constructor(src, alt) {
    this.src = src;
    this.alt = alt || "furnitureImage";
  }
}

class ImageRenderer {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  render(images) {
    images.forEach((imageSrc) => {
      const img = new Image(imageSrc);
      this.renderImage(img);
    });
  }

  renderImage(image) {
    const imgContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    imgContainer.classList.add("gallery__image");

    imgElement.src = image.src;
    imgElement.alt = image.alt;

    imgContainer.appendChild(imgElement);
    this.container.appendChild(imgContainer);
  }
}

const imageSrcs = [
  "../../images/gallery1.avif",
  "../../images/gallery2.avif",
  "../../images/gallery3.avif",
  "../../images/gallery4.avif",
  "../../images/gallery5.avif",
  "../../images/gallery6.avif",
  "../../images/gallery7.avif",
  "../../images/gallery8.avif",
  "../../images/gallery9.avif",
  "../../images/gallery10.avif",
  "../../images/gallery11.avif",
  "../../images/gallery12.avif",
  "../../images/gallery13.avif",
  "../../images/gallery14.avif",
  "../../images/gallery15.avif",
  "../../images/gallery16.avif",
  "../../images/gallery17.avif",
  "../../images/gallery18.avif",
  "../../images/gallery19.avif",
  "../../images/gallery20.avif",
  "../../images/gallery21.avif",
];

const imageRenderer = new ImageRenderer(".gallery__content");
imageRenderer.render(imageSrcs);
