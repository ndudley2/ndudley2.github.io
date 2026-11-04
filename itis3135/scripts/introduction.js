document
  .querySelector("#clear")
  .addEventListener("click", function (event) {
    Array.from(document.querySelectorAll("form input")).forEach((input) => {
      input.value = "";
    });
  });


const formElement = document.getElementById("form");
formElement.addEventListener("submit", (e) => e.preventDefault()); // prevents page refresh / default behavior

function loadImage(){
    var image = document.getElementById('img').files[0];
    const imageURL = URL.createObjectURL(image);
    var text = "<img src=\"" + imageURL + "\" >";
    document.getElementById('loadImage').innerHTML = text;
}

var coursenum = 1;
function addCourse() {
    coursenum += 1;
    document.getElementById('course' + coursenum).innerHTML = document.getElementById("course1").innerHTML;
}

function removeCourse() {
    if (coursenum > 1){
        const attr = element.getAttribute("id").slice(9);
            document.getElementById("course" + attr).innerHTML = '';
            coursenum -= 1;
    }
}
