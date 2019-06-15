menuIcon();

function menuIcon() {
  //grab the span element
  let span = document.querySelector(".navbar-toggler-icon");

  //create an image tag
  const image = document.createElement("img");
  image.id = "menu-icon";
  image.src = "./assets/images/menu.png";

  //append the image to span
  span.appendChild(image);

  // create a div and append to the button
  const div = document.createElement("div");
  div.classList = "menu-icon-nav";
  let button = document.querySelector(".navbar-toggler");
  button.insertAdjacentElement("afterend", div);

  //get navbar-nav values
  const nav = document.querySelectorAll(".navbar-nav .nav-item");
  nav.forEach(function(el) {
    let values = el.cloneNode(true);
    div.append(values);
    console.log(values);
  });
}
