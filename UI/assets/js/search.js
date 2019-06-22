const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", searchResult);

function searchResult() {
  document.location.href = "./search.html";
}
