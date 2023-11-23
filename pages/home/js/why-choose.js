// Base class Testimonial with title, description, call-to-action URL, and title
class Testimonial {
  constructor(title, description, ctaUrl, ctaUrlTitle) {
    this.title = title;
    this.description = description;
    this.ctaUrl = ctaUrl;
    this.ctaUrlTitle = ctaUrlTitle;
  }
}

// TestimonialElement class that renders testimonial data into HTML
class TestimonialElement {
  constructor(testimonialData) {
    this.testimonialData = testimonialData; // Testimonial data containing title, description, URL, and title for CTA button
  }

  // Renders testimonial content into HTML elements
  render() {
    const testimonialsContainer = document.createElement("div"); // Creates a container element

    // SVG icon for CTA button
    const svgIconRight = `
      <svg class="cta__icon" width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 12.4002H42M42 12.4002C42 12.4002 37.5119 9.44867 36.6 7.00024M42 12.4002C42 12.4002 38.0324 15.1736 36.6 17.8002" stroke="#E58411" stroke-linecap="square"/>
      </svg>
    `;

    // HTML structure for testimonial information
    const testimonialInfo = `
      <h4 class="testimonials__subtitle">${this.testimonialData.title}</h4>
      <p class="testimonials__text">${this.testimonialData.description}</p>
      <a href="${this.testimonialData.ctaUrl}" class="cta__link">
        <span>${this.testimonialData.ctaUrlTitle}</span>
        ${svgIconRight}
      </a>
    `;

    testimonialsContainer.innerHTML = testimonialInfo; // Puts testimonial content into container
    return testimonialsContainer; // Returns rendered testimonial element
  }
}

// TestimonialRenderer class that puts testimonial data into specified container
class TestimonialRenderer {
  constructor(testimonials, containerSelector, testimonialClass) {
    this.testimonials = testimonials; // Testimonial data array
    this.container = document.querySelector(containerSelector); // Selects container to render testimonials
    this.testimonialClass = testimonialClass; // Class used to create Testimonial elements
  }

  // Renders testimonial data into HTML elements and appends them to container
  renderData() {
    this.testimonials.forEach((testimonialData) => {
      const testimonial = new this.testimonialClass(
        testimonialData.title,
        testimonialData.description,
        testimonialData.ctaUrl,
        testimonialData.ctaUrlTitle
      ); // Creates a new Testimonial instance with testimonial data
      const testimonialElement = new TestimonialElement(testimonial).render(); // Renders testimonial content into HTML elements
      this.container.appendChild(testimonialElement); // Appends rendered testimonial to container
    });
  }
}

// 'Why Choose Us' Data
const whyChooseUs = [
  {
    title: "Luxury facilities",
    description:
      "The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities.",
    ctaUrl: "#",
    ctaUrlTitle: "Read more",
  },
  {
    title: "Affordable Price",
    description:
      "You can get a workspace of the highst quality at an affordable price and still enjoy the facilities that are oly here.",
    ctaUrl: "#",
    ctaUrlTitle: "Read more",
  },
  {
    title: "Many Choices",
    description:
      "We provide many unique work space choices so that you can choose the workspace to your liking.",
    ctaUrl: "#",
    ctaUrlTitle: "Read more",
  },
];

// Instance of TestimonialRenderer with 'Why Choose Us'
const testimonialRenderer = new TestimonialRenderer(
  whyChooseUs,
  ".testimonials__content",
  Testimonial
);
testimonialRenderer.renderData(); // Renders testimonial data into HTML elements and appends them to specified container
