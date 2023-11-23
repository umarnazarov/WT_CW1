class FormValidator {
  constructor(formId) {
    // Getting form element using its ID
    this.form = document.getElementById(formId);
    // Instances of ErrorMessages and ValidationRules are initialized
    this.errorMessages = new ErrorMessages();
    this.validationRules = new ValidationRules();

    // A submit event listener is connected to form
    this.form.addEventListener("submit", this.onSubmit.bind(this));

    // Iterating over input and textarea elements in form
    this.form.querySelectorAll("input, textarea").forEach((input) => {
      // An input event listener is added for each input and textarea element
      input.addEventListener("input", (event) => {
        // Validation of input occurs when its value changes
        this.validateInput(event.target);
      });
    });
  }

  validateInput(input) {
    // A ValidationStrategy instance is created for input
    const validator = new ValidationStrategy(
      input,
      this.errorMessages,
      this.validationRules
    );

    // Validation for input is called
    validator.validateInput();
  }

  onSubmit(event) {
    // Default form submission behavior is prevented
    event.preventDefault();

    // All elements in form
    const formElements = this.form.elements;

    // An array is initialized to store validation results
    let formInputsValid = [];

    // Looping through each element in form
    for (const element of formElements) {
      // Excluding submit button from validation
      if (element.type !== "submit") {
        // A ValidationStrategy instance is created for element
        const validator = new ValidationStrategy(
          element,
          this.errorMessages,
          this.validationRules
        );

        // Validation of element is performed and result is stored
        let isFormValid = validator.validateInput();
        formInputsValid.push(isFormValid);
      }
    }

    // If any input failed validation preventing form submission
    if (!formInputsValid.every((i) => i)) return;
    this.form.submit();
  }
}

// Defines class to handle error messages for form validation
class ErrorMessages {
  // Adds error message to parent element of input
  add(element, message) {
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    element.parentNode.classList.add("invalid");
    element.parentNode.appendChild(errorMessage);
  }

  // Clears all error messages associated with input field
  clear(element) {
    const errorMessages = element.parentNode.querySelectorAll(".error-message");
    element.parentNode.classList.remove("invalid");
    errorMessages.forEach((message) => message.remove());
  }
}

// Rules for form validation
class ValidationRules {
  // Checks if an element has 'data-required' attribute
  isRequired(element) {
    return element.hasAttribute("data-required");
  }

  // Checks if a value is empty or consists only of whitespace
  isEmpty(value) {
    return !value.trim();
  }

  // Validates whether value is a correctly formatted email address
  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Checks if word count in a value exceeds given maximum limit
  hasExceededMaxWord(value, maxWord) {
    const wordCount = value.split(/\s+/).length;
    return wordCount >= +maxWord;
  }

  // Validates if a value is a valid phone number with a specific format
  isValidPhoneNumber(value) {
    return /^\+\d{12}$/.test(value);
  }
}

// Manages the validation strategy based on provided rules and error messages
class ValidationStrategy {
  // Constructor function to initialize the validation strategy
  constructor(element, errorMessages, validationRules) {
    this.element = element; // Input element to validate
    this.errorMessages = errorMessages; // Error message handler
    this.validationRules = validationRules; // Rules for validation
  }

  // Validates input based on defined rules and shows error messages if necessary
  validateInput() {
    let isValid = true; // Flag to track if input is valid or not
    this.errorMessages.clear(this.element); // Clears any existing error messages

    if (this.element.type !== "submit") {
      // If element is not a submit button
      const value = this.element.value; // Gets the value of the input field
      const isRequired = this.validationRules.isRequired(this.element); // Checks if input is required
      const isEmpty = this.validationRules.isEmpty(value); // Checks if input is empty
      const maxWord = this.element.getAttribute("data-max-word"); // Gets max word limit
      const hasExceededMaxWord = this.validationRules.hasExceededMaxWord(
        value,
        maxWord
      ); // Checks if word count exceeds limit

      // Validates based on different criteria and displays error messages
      if (isRequired && isEmpty) {
        this.errorMessages.add(this.element, "Please fill in this field.");
        isValid = false;
      } else if (this.element.type === "email" && !isEmpty) {
        // Validates email format
        const isValidEmail = this.validationRules.isValidEmail(value);
        if (!isValidEmail) {
          this.errorMessages.add(
            this.element,
            "Please enter a valid email address."
          );
          isValid = false;
        }
      } else if (maxWord && hasExceededMaxWord) {
        // Validates word count limit
        this.errorMessages.add(
          this.element,
          `Please enter at most ${maxWord} words.`
        );
        isValid = false;
      } else if (this.element.type === "tel" && !isEmpty) {
        // Validates phone number format
        const isValidPhoneNumber =
          this.validationRules.isValidPhoneNumber(value);
        if (!isValidPhoneNumber) {
          this.errorMessages.add(
            this.element,
            "Please enter a valid phone number."
          );
          isValid = false;
        }
      }
    }

    return isValid; // Returns whether the input is valid or not
  }
}

const validator = new FormValidator("contact-form"); // Initializes form validation
