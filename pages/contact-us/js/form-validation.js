class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errorMessages = new ErrorMessages();
    this.validationRules = new ValidationRules();
    this.form.addEventListener("submit", this.onSubmit.bind(this));

    this.form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", (event) => {
        this.validateInput(event.target);
      });
    });
  }

  validateInput(input) {
    const validator = new ValidationStrategy(
      input,
      this.errorMessages,
      this.validationRules
    );

    validator.validateInput();
  }

  onSubmit(event) {
    event.preventDefault();
    const formElements = this.form.elements;

    let formInputsValid = [];

    for (const element of formElements) {
      if (element.type !== "submit") {
        const validator = new ValidationStrategy(
          element,
          this.errorMessages,
          this.validationRules
        );

        let isFormValid = validator.validateInput();
        formInputsValid.push(isFormValid);
      }
    }

    if (!formInputsValid.every((i) => i)) return;
    this.form.submit();
  }
}

class ErrorMessages {
  add(element, message) {
    const errorMessage = document.createElement("span");

    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    element.parentNode.classList.add("invalid");
    element.parentNode.appendChild(errorMessage);
  }

  clear(element) {
    const errorMessages = element.parentNode.querySelectorAll(".error-message");
    const btn = document.querySelector(".btn");
    element.parentNode.classList.remove("invalid");

    errorMessages.forEach((message) => message.remove());
  }
}

class ValidationRules {
  isRequired(element) {
    return element.hasAttribute("data-required");
  }

  isEmpty(value) {
    return !value.trim();
  }

  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  hasExceededMaxWord(value, maxWord) {
    const wordCount = value.split(/\s+/).length;
    return wordCount >= +maxWord;
  }

  isValidPhoneNumber(value) {
    return /^\+\d{12}$/.test(value);
  }
}

class ValidationStrategy {
  constructor(element, errorMessages, validationRules) {
    this.element = element;
    this.errorMessages = errorMessages;
    this.validationRules = validationRules;
  }

  validateInput() {
    let isValid = true;
    this.errorMessages.clear(this.element);

    if (this.element.type !== "submit") {
      const value = this.element.value;
      const isRequired = this.validationRules.isRequired(this.element);
      const isEmpty = this.validationRules.isEmpty(value);
      const maxWord = this.element.getAttribute("data-max-word");
      const hasExceededMaxWord = this.validationRules.hasExceededMaxWord(
        value,
        maxWord
      );

      if (isRequired && isEmpty) {
        this.errorMessages.add(this.element, "Please fill in this field.");
        isValid = false;
      } else if (this.element.type === "email" && !isEmpty) {
        const isValidEmail = this.validationRules.isValidEmail(value);
        if (!isValidEmail) {
          this.errorMessages.add(
            this.element,
            "Please enter a valid email address."
          );
          isValid = false;
        }
      } else if (maxWord && hasExceededMaxWord) {
        this.errorMessages.add(
          this.element,
          `Please enter at most ${maxWord} words.`
        );
        isValid = false;
      } else if (this.element.type === "tel" && !isEmpty) {
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

    return isValid;
  }
}

const validator = new FormValidator("contact-form");
