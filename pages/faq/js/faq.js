class DetailsController {
  constructor() {
    this.details; // Placeholder variable for details
    this.controls = document.querySelectorAll(".faq-details__control"); // Selects FAQ control elements
    this.faqImg = document.querySelector(".imgs"); // Selects image element

    // Array of FAQ objects containing titles, descriptions, and image URLs
    this.faqs = [
      {
        title: "How do I care for wooden furniture?",
        description:
          "Wooden furniture requires regular dusting with a soft cloth and occasional polishing. Use furniture polish suitable for the specific wood type. Avoid placing wooden furniture in direct sunlight or near heat sources to prevent warping.",
        image: "../../images/image01.png",
      },
      {
        title: "What are the best fabrics for upholstery?",
        description:
          "Choosing the right upholstery fabric is crucial as it affects both the aesthetics and durability of your furniture. Fabrics like cotton, linen, and leather are among the top choices for upholstery due to their various benefits.\n\nCotton is a popular natural fabric known for its breathability and comfort. It's durable and comes in a wide range of colors and textures. However, it may wrinkle and fade more easily compared to other fabrics.\n\nLinen is another natural fabric valued for its strength and coolness. It resists pilling and soiling, though it may wrinkle more than cotton. Linen upholstery can add an elegant and sophisticated touch to furniture.\n\nLeather, a classic choice, is highly durable and ages beautifully. It's easy to clean and develops a rich patina over time. However, genuine leather can be expensive.\n\nFor those seeking synthetic options, polyester and microfiber are excellent choices. Polyester upholstery is resistant to fading, stains, and abrasion, making it suitable for high-traffic areas. Microfiber, a type of polyester, mimics the look and feel of suede and is easy to clean with its stain-resistant properties.\n\nWhen selecting an upholstery fabric, consider factors such as the intended use of the furniture, desired maintenance level, and aesthetic preferences. Test fabric samples to ensure they meet your expectations for comfort, durability, and style.",
        image: "../../images/image02.png",
      },
      {
        title: "How to maximize space in a small room?",
        description:
          "Opt for furniture with built-in storage, such as ottomans with hidden compartments or beds with drawers. Use multifunctional furniture like sofa beds or extendable tables. Mirrors can create an illusion of space by reflecting light.",
        image: "../../images/chair1.png",
      },
    ];

    // Calling the renderFAQs() and changeImage() methods when class is created
    this.renderFAQs();
    this.changeImage();
  }

  // Method to set up event listeners for each FAQ details
  setupDetails() {
    this.details = document.querySelectorAll("details");
    this.details.forEach((targetDetail) => {
      targetDetail.addEventListener("click", () => {
        this.closeOtherDetails(targetDetail);
      });
    });
  }

  // Method to render FAQ elements in the DOM
  renderFAQs() {
    const faqContainer = document.querySelector(".faq-details");

    // Loop through each FAQ object and create corresponding HTML elements
    this.faqs.forEach((faq, index) => {
      const detail = document.createElement("details");
      detail.classList.add("faq-details__control");
      detail.innerHTML = `
        <summary class="faq-details__title">${faq.title}</summary>
        <p class="faq-details__text">${faq.description}</p>
      `;
      faqContainer.appendChild(detail);

      // Set up event listeners for each FAQ detail and call changeImage() method on click
      this.setupDetails();
      detail.addEventListener("click", () => {
        this.changeImage(index);
      });
    });
  }

  // Method to close other FAQ details when one is clicked
  closeOtherDetails(targetDetail) {
    this.details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
      }
    });
  }

  // Method to change the displayed image based on the FAQ clicked
  changeImage(index) {
    if (!this.faqs[index]) {
      // If the FAQ index doesn't exist sets the image to the first FAQ's image
      this.faqImg.style.background = `url(${this.faqs[0].image}) no-repeat center center`;
      return;
    }
    // Set the image based on the clicked FAQ's image URL
    this.faqImg.style.background = `url(${this.faqs[index].image}) no-repeat center center`;
  }
}

// Instantiating the DetailsController class
const detailsController = new DetailsController();
