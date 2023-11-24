class MenuController {
  constructor() {
    this.hamburger = document.querySelector(".hamburger"); // Selects element with class "hamburger"
    this.menuIcon = document.querySelector(".hamburger__menu-icon"); // Selecting element with class "hamburger__menu-icon"
    this.menuToggle = document.getElementById("menu-toggle"); // Selecting element with id "menu-toggle"

    // Binding functions to the class context
    this.handleMenuToggle = this.handleMenuToggle.bind(this); // Binding handleMenuToggle method to class instance
    this.updateScrollStyles = this.updateScrollStyles.bind(this); // Binding updateScrollStyles method to class instance

    // Initializing the menu
    this.init();
  }

  init() {
    // Calling scroll style update function on initialization and adding event listeners
    this.updateScrollStyles(); // Updating scroll styles initially
    window.addEventListener("scroll", this.updateScrollStyles); // Listening for scroll events to update styles
    this.menuToggle.addEventListener("change", this.handleMenuToggle); // Listening for changes in menu toggle state
  }

  // Function to update styles based on scroll position
  updateScrollStyles() {
    // Checks if the menu is checked toggled
    const isMenuChecked = this.menuToggle.checked;

    // if the icon should be black based on scroll position and menu state returns true
    const shouldIconBeBlack = window.scrollY > 0 || isMenuChecked;

    // Toggling classes to update styles based on scroll position and menu state
    this.menuIcon.classList.toggle("menu-black", shouldIconBeBlack);
    this.hamburger.classList.toggle("hamburger--fixed", shouldIconBeBlack);
    this.hamburger.classList.toggle(
      "menu--white-bg",
      shouldIconBeBlack && !isMenuChecked
    );
  }

  // Function to handle menu toggle state changes
  handleMenuToggle() {
    // Checking if menu is checked and the scroll position
    const isMenuChecked = this.menuToggle.checked;
    const scrollY = window.scrollY;

    // Handling class addition and removals based on menu state and scroll position
    if (isMenuChecked) {
      this.hamburger.classList.add("hamburger--fixed", "menu--white-bg");
      this.menuIcon.classList.add("menu-black");
    } else if (scrollY <= 0) {
      this.hamburger.classList.remove("hamburger--fixed", "menu--white-bg");
      this.menuIcon.classList.remove("menu-black");
    }
  }
}

// Instantiating MenuController class
const menuController = new MenuController();
