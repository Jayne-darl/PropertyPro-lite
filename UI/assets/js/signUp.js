const email = document.querySelector("#email");
password = document.querySelector("#password");
confirmPassword = document.querySelector("#confirmPassword");
submitBtn = document.querySelector("#createAccount");
warning = document.querySelector(".warning");
passwordVal = document.querySelector(".password-val");
passwordConfirm = document.querySelector(".message");

eventlisteners();

function eventlisteners() {
  email.addEventListener("blur", validateEmail);
  password.addEventListener("keyup", validateLength, validateMatch);
  confirmPassword.addEventListener("keyup", validateMatch);
  submitBtn.addEventListener("click", submitForm);
}
// Functions

//validate password is longer or equal to 8 in length
function validateLength() {
  if (password.value.length >= 8) {
    passwordVal.style.display = "none";
  } else {
    passwordVal.style.display = "block";
    passwordVal.style.color = "red";
    passwordVal.innerHTML =
      "Ensure your password length is of 8 characters or more";
  }
}

// validate passwords are matching
function validateMatch() {
  if (password.value == "" || confirmPassword.value == "") {
    passwordConfirm.innerHTML = "";
  } else if (password.value == confirmPassword.value) {
    passwordConfirm.style.display = "block";
    passwordConfirm.innerHTML = "Matched";
    passwordConfirm.style.color = "blue";
  } else {
    passwordConfirm.style.display = "block";
    passwordConfirm.innerHTML = "Enter matching passwords";
    passwordConfirm.style.color = "red";
  }
}

//validate email
function validateEmail() {
  let content = email.value;
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let match = regex.test(String(content).toLowerCase());
  if (match == true) {
    warning.style.display = "none";
  } else {
    warning.style.display = "block";
    warning.style.color = "red";
    warning.innerHTML = "Enter a valid email";
  }
}

//on click of submit button
function submitForm(e) {
  e.preventDefault();
  document.location.href = "./log-in.html";
}
