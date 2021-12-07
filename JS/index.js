// const isValidEmail = (email) => {
//   const re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };

// const isValidPhone = (phone) => {
//   const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//   return re.test(String(phone).toLowerCase());
// };
import {isValidEmail ,isValidPhone,fileValidation} from "./valid.js";
 


const form = document.querySelector("form");
const thankYou = document.querySelector(".thank-you");
const nameInp = document.querySelector('input[name="name"]');
const emailInp = document.querySelector('input[name="email"]');
const phoneInp = document.querySelector('input[name="phone"]');
const textaeraInp = document.querySelector('textarea[name="message"]');
const rule = document.querySelector('input[name="policy"]');
const image = document.querySelector('input[name="photo"]');



const inputs = [nameInp, emailInp, phoneInp, textaeraInp, rule, image];

let isFormValid = false;
let isValidationOn = false;

const resetElm = (elm) => {
  elm.classList.remove("invalid");
  elm.nextElementSibling.classList.add("hide");
};

const validateElm = (elm) => {
  elm.classList.add("invalid");
  elm.nextElementSibling.classList.remove("hide");
};

const validateInputs = () => {
  if (!isValidationOn) return;
  isFormValid = true;
  //   resetElm(nameInp);
  //   resetElm(emailInp);
  //   resetElm(phoneInp);
  inputs.forEach(resetElm);

  if (!nameInp.value) {
    isFormValid = false;
    validateElm(nameInp);
  }

  if (!isValidEmail(emailInp.value)) {
    isFormValid = false;
    validateElm(emailInp);
  }

  if (!isValidPhone(phoneInp.value)) {
    isFormValid = false;
    validateElm(phoneInp);
  }

  if (!textaeraInp.value) {
    isFormValid = false;
    validateElm(textaeraInp);
  }

  if (!rule.checked) {
    isFormValid = false;
    validateElm(rule);
  }

//   if (!fileValidation(image)) {
//     isFormValid = false;
//     validateElm(image);
//   }
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  isValidationOn = true;
  validateInputs();

  if (isFormValid) {
    fileValidation(image);
    var reader = new FileReader();
    reader.onload = function (e) {
      const body = {
        name: nameInp.value,
        email: emailInp.value,
        phone: phoneInp.value,
        description: textaeraInp.value,
        rule: rule.checked,
        image: reader.result,
      };
      console.log(body);
    };
    reader.readAsDataURL(image.files[0]);

 
    thankYou.classList.remove("hide");
  }
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateInputs();
  });
});
