document
  .querySelector("button[type='button']")
  .addEventListener("click", function (event) {
    Array.from(document.querySelectorAll("form input")).forEach((input) => {
      input.value = "";
    });
  });

const clearButton = document.querySelector("button[type='button']");
const inputElements = Array.from(document.querySelectorAll("form input"));
clearButton.addEventListener("click", function () {
  inputs.forEach((input) => (input.value = ""));
});


const formElement = document.getElementById("form");
formElement.addEventListener("submit", (e) => e.preventDefault()); // prevents page refresh / default behavior

function loadImage(){
    var image = document.getElementById('picture').files[0];
    const imageURL = URL.createObjectURL(image);
    var text = "<img src=\"" + imageURL + "\" >";
    document.getElementById('loadImage').innerHTML = text;
}