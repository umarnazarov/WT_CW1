// Image class object with a source and alternate text
class Image {
  constructor(src, alt) {
    this.src = src; // Image source (URL)
    this.alt = alt || "furnitureImage"; //  Alt for image default is "furnitureImage"
  }
}

// Handles rendering of Image objects into a specified container
class ImageRenderer {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector); // Selects container where images will be rendered
  }

  // Renders an array of image sources into specified container
  render(images) {
    images.forEach((imageSrc) => {
      const img = new Image(imageSrc); // Creates an Image object for each image source
      this.renderImage(img); // Renders each Image object
    });
  }

  // Renders a single Image object into container
  renderImage(image) {
    const imgContainer = document.createElement("div"); // Creates a container element for image
    const imgElement = document.createElement("img"); // Creates an img element

    imgContainer.classList.add("gallery__image"); // Adds a class to image container

    imgElement.src = image.src; // Sets image source
    imgElement.alt = image.alt; // Sets alt for image

    imgContainer.appendChild(imgElement); // Appends image element to its container
    this.container.appendChild(imgContainer); // Appends image container to specified container in document
  }
}

// Array of image source URLs
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

const imageRenderer = new ImageRenderer(".gallery__content"); // Initializes an ImageRenderer object with class name ".gallery__content"
imageRenderer.render(imageSrcs); // Renders array of image sources into container
