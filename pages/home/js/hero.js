// Base class Background changer class
class BackgroundChanger {
  constructor(selector) {
    this.heroBanner = document.querySelector(selector); // Selects hero banner element
  }

  updateBackground(imageUrl) {
    throw new Error("updateBackground method not implemented"); // Placeholder method for updating background (to be implemented by subclasses)
  }
}

// Background changer with gradient effect whcih inherits from BackgroundChanger
class GradientBackgroundChanger extends BackgroundChanger {
  constructor(selector) {
    super(selector); // Calls parent class constructor
  }

  // Overrides parent method to update background with a gradient
  updateBackground(imageUrl) {
    // Combined image URL with a linear gradient for hero banner background
    const combinedBackground = `
      linear-gradient(180deg, rgba(255, 255, 255, 0) 86.13%, #fff 100%),
      ${imageUrl} lightgray 50% / cover no-repeat`;

    this.heroBanner.style.background = combinedBackground; // Updates hero banner background with combined style
  }
}

// Handler for buttons triggering background changes
class ButtonHandler {
  constructor(button, imageUrl, backgroundChanger) {
    this.button = document.getElementById(button); // Selects button element
    this.imageUrl = imageUrl; // URL of image to set as background
    this.backgroundChanger = backgroundChanger; // Instance of a background changer
    this.setupButton(); // Sets up button event listener
  }

  // Sets up a click event listener for button to update background
  setupButton() {
    this.button.addEventListener("click", () => {
      this.backgroundChanger.updateBackground(this.imageUrl); // Calls updateBackground method of background changer with imageURL
    });
  }
}

// Image URL for different backgrounds
const yellowBackground = 'url("../../images/wall-yellow.jpeg")';
const grayBackground = 'url("../../images/wall-gray.jpeg")';
const mrableBackground = 'url("../../images/wall-mrable.jpeg")';

// Creates an instance of GradientBackgroundChanger for hero banner
const gradientBackgroundChanger = new GradientBackgroundChanger(".hero");

// Creates ButtonHandler instances for different buttons calling background changes
new ButtonHandler("yellow", yellowBackground, gradientBackgroundChanger); // Yellow background button
new ButtonHandler("gray", grayBackground, gradientBackgroundChanger); // Gray background button
new ButtonHandler("mrable", mrableBackground, gradientBackgroundChanger); // Mrable background button
