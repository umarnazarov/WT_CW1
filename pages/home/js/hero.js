class BackgroundChanger {
  constructor(selector) {
    this.heroBanner = document.querySelector(selector);
  }

  updateBackground(imageUrl) {
    throw new Error("updateBackground method not implemented");
  }
}

class GradientBackgroundChanger extends BackgroundChanger {
  constructor(selector) {
    super(selector);
  }

  updateBackground(imageUrl) {
    const combinedBackground = `
      linear-gradient(180deg, rgba(255, 255, 255, 0) 86.13%, #fff 100%),
      ${imageUrl} lightgray 50% / cover no-repeat`;

    this.heroBanner.style.background = combinedBackground;
  }
}

class ButtonHandler {
  constructor(button, imageUrl, backgroundChanger) {
    this.button = document.getElementById(button);
    this.imageUrl = imageUrl;
    this.backgroundChanger = backgroundChanger;
    this.setupButton();
  }

  setupButton() {
    this.button.addEventListener("click", () => {
      this.backgroundChanger.updateBackground(this.imageUrl);
    });
  }
}

const yellowBackground = 'url("../../images/wall-yellow.jpeg")';
const grayBackground = 'url("../../images/wall-gray.jpeg")';
const mrableBackground = 'url("../../images/wall-mrable.jpeg")';

const gradientBackgroundChanger = new GradientBackgroundChanger(".hero");

new ButtonHandler("yellow", yellowBackground, gradientBackgroundChanger);
new ButtonHandler("gray", grayBackground, gradientBackgroundChanger);
new ButtonHandler("mrable", mrableBackground, gradientBackgroundChanger);
