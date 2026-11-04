document
  .querySelector("#clear")
  .addEventListener("click", function (event) {
    Array.from(document.querySelectorAll("form input")).forEach((input) => {
      input.value = "";
    });
  });


const formElement = document.querySelector("form");
formElement.addEventListener("submit", (e) => e.preventDefault()); // prevents page refresh / default behavior

function loadImage(){
    var image = document.getElementById('img').files[0];
    const imageURL = URL.createObjectURL(image);
    var text = "<img src=\"" + imageURL + "\" >";
    document.getElementById('loadImage').innerHTML = text;
}

function addCourse() {
  const nextCourseNumber = [2, 3, 4, 5, 6].find((number) =>
    document.getElementById(`course${number}`).childElementCount === 0
  );

  if (!nextCourseNumber) {
    return;
  }

  const course = document.getElementById("course1").cloneNode(true);
  course.id = `course${nextCourseNumber}`;
  course.querySelector("p").textContent = `Course ${nextCourseNumber}:`;

  course.querySelectorAll("input").forEach((input) => {
    const oldId = input.id;
    input.id = `${oldId}${nextCourseNumber}`;
    input.value = "";
  });

  course.querySelectorAll("label").forEach((label) => {
    label.htmlFor = `${label.htmlFor}${nextCourseNumber}`;
  });

  const deleteButton = course.querySelector("button");
  deleteButton.id = `delCourse${nextCourseNumber}`;
  document.getElementById(`course${nextCourseNumber}`).replaceWith(course);
}

function deleteCourse(button) {
  button.parentElement.replaceChildren();
}
