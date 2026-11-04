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

function addCourse() {
    const container = document
    .getElementById('container');
    container
        .innerHTML += '<label for="department">Course Department:</label><!-- id is used to identify what the input is for --><input type="text" id="department" required value="ITIS"><label for="courseNumber">Course Number:</label><!-- id is used to identify what the input is for --><input type="text" id="courseNumber" required value="3135"><label for="courseTitle">Course Name:</label><!-- id is used to identify what the input is for --><input type="text" id="courseTitle" required value="Front-End Web Application Development"><label for="reasonForTaking">Reason:</label><!-- id is used to identify what the input is for --><input type="text" id="reasonForTaking" required value="Required for my concentration"></input>';
}
