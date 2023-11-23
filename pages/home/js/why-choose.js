class Testimonial {
  constructor(title, description, ctaUrl, ctaUrlTitle) {
    this.title = title;
    this.description = description;
    this.ctaUrl = ctaUrl;
    this.ctaUrlTitle = ctaUrlTitle;
  }
}

class TestimonialElement {
  constructor(testimonialData) {
    this.testimonialData = testimonialData;
  }

  render() {
    const testimonialsContainer = document.createElement("div");

    const svgIconRight = `
      <svg class="cta__icon" width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 12.4002H42M42 12.4002C42 12.4002 37.5119 9.44867 36.6 7.00024M42 12.4002C42 12.4002 38.0324 15.1736 36.6 17.8002" stroke="#E58411" stroke-linecap="square"/>
      </svg>
    `;

    const testimonialInfo = `
      <h4 class="testimonials__subtitle">${this.testimonialData.title}</h4>
      <p class="testimonials__text">${this.testimonialData.description}</p>
      <a href="${this.testimonialData.ctaUrl}" class="cta__link">
        <span>${this.testimonialData.ctaUrlTitle}</span>
        ${svgIconRight}
      </a>
    `;

    testimonialsContainer.innerHTML = testimonialInfo;
    return testimonialsContainer;
  }
}

class TestimonialRenderer {
  constructor(testimonials, containerSelector, testimonialClass) {
    this.testimonials = testimonials;
    this.container = document.querySelector(containerSelector);
    this.testimonialClass = testimonialClass;
  }

  renderData() {
    this.testimonials.forEach((testimonialData) => {
      const testimonial = new this.testimonialClass(
        testimonialData.title,
        testimonialData.description,
        testimonialData.ctaUrl,
        testimonialData.ctaUrlTitle
      );
      const testimonialElement = new TestimonialElement(testimonial).render();
      this.container.appendChild(testimonialElement);
    });
  }
}

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

const testimonialRenderer = new TestimonialRenderer(
  whyChooseUs,
  ".testimonials__content",
  Testimonial
);
testimonialRenderer.renderData();
