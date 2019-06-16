const email = document.querySelector(".email");
password = document.querySelector(".password");
logInButton = document.querySelector("#logIn");

logInButton.addEventListeners("click", logIn);

function logIn() {
  if (email.value != "" && password.value != "") {
    window.location.href = "./user-dashboard";
  }
}
