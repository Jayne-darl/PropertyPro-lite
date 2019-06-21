const email = document.querySelector(".email");
password = document.querySelector(".password");
logInButton = document.querySelector("#logIn");

logInButton.addEventListener("click", logIn);

function logIn(e) {
  e.preventDefault();
  if (email.value != "" && password.value != "") {
    document.location.href = "./agent-dashboard.html";
  }
}
