function loadImage(){
    var image = document.getElementById('img').files[0];
    const imageURL = URL.createObjectURL(image);
    var text = "<img src=\"" + imageURL + "\" >";
    document.getElementById('loadImage').innerHTML = text;
}

const courseTemplate = document.getElementById("course1").cloneNode(true);

function addCourse() {
  const nextCourseNumber = [1, 2, 3, 4, 5, 6].find((number) =>
    document.getElementById(`course${number}`).childElementCount === 0
  );

  if (!nextCourseNumber) {
    return;
  }

  const course = courseTemplate.cloneNode(true);
  course.id = `course${nextCourseNumber}`;
  course.querySelector("p").textContent = `Course ${nextCourseNumber}:`;

  course.querySelectorAll("input").forEach((input) => {
    const oldId = input.id;
    input.id = `${oldId}${nextCourseNumber}`;
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

function getFormData() {
  const value = (id) => document.getElementById(id).value;
  const imageFile = document.getElementById("img").files[0];
  const courses = [1, 2, 3, 4, 5, 6]
    .map((number) => document.getElementById(`course${number}`))
    .filter((course) => course.querySelector("input"))
    .map((course) => Array.from(course.querySelectorAll("input"), (input) => input.value))
    .filter((fields) => fields.some((field) => field !== ""))
    .map(([department, courseNumber, courseTitle, reasonForTaking]) => ({
      department,
      courseNumber,
      courseTitle,
      reasonForTaking
    }));

  return {
    firstName: value("firstName"),
    middleName: value("middleName"),
    nickname: value("nickname"),
    lastName: value("lastName"),
    acknowledgment: value("acknowledgment"),
    acknowledgmentDate: value("acknowledgmentDate"),
    prettyNameDivider: value("prettyNameDivider"),
    adjectives: value("adjectives"),
    animal: value("animal"),
    img: imageFile ? `images/${imageFile.name}` : "",
    pictureAlt: value("pictureAlt"),
    caption: value("caption"),
    personalInfo: {
      statement: value("statement"),
      personalBackground: value("personalBackground"),
      professionalBackground: value("professionalBackground"),
      academicBackground: value("academicBackground"),
      primaryWorkComputer: value("primaryWorkComputer"),
      primaryWorkLocation: value("primaryWorkLocation"),
      alternateComputerLocation: value("alternateComputerLocation")
    },
    courses,
    quote: value("quote"),
    quoteAuthor: value("quoteAuthor"),
    funnyItem: value("funnyItem"),
    somethingToShare: value("somethingToShare"),
    footerLinks: [
      { label: "CLT Web", url: value("clt-web") },
      { label: "GitHub.io", url: value("github-web") },
      { label: "GitHub", url: value("github") },
      { label: "freeCodeCamp", url: value("fcc") },
      { label: "Codecademy", url: value("codecademy") },
      { label: "LinkedIn", url: value("linkedin") }
    ]
  };
}

function appendHtmlData(parent, data) {
  if (Array.isArray(data)) {
    const list = parent.ownerDocument.createElement("ol");
    data.forEach((item) => {
      const listItem = parent.ownerDocument.createElement("li");
      appendHtmlData(listItem, item);
      list.appendChild(listItem);
    });
    parent.appendChild(list);
    return;
  }

  if (data !== null && typeof data === "object") {
    const list = parent.ownerDocument.createElement("dl");
    Object.entries(data).forEach(([key, value]) => {
      const term = parent.ownerDocument.createElement("dt");
      term.textContent = key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());

      const definition = parent.ownerDocument.createElement("dd");
      appendHtmlData(definition, value);
      list.append(term, definition);
    });
    parent.appendChild(list);
    return;
  }

  parent.appendChild(
    parent.ownerDocument.createTextNode(
      String(data === null || data === undefined ? "" : data)
    )
  );
}

function appendXmlData(outputDocument, parent, key, value) {
  if (Array.isArray(value)) {
    const itemName = key.endsWith("s") ? key.slice(0, -1) : "item";
    value.forEach((item) => appendXmlData(outputDocument, parent, itemName, item));
    return;
  }

  const element = outputDocument.createElement(key);
  if (value !== null && typeof value === "object") {
    Object.entries(value).forEach(([childKey, childValue]) => {
      appendXmlData(outputDocument, element, childKey, childValue);
    });
  } else {
    element.textContent = value === null || value === undefined ? "" : String(value);
  }
  parent.appendChild(element);
}

function createHtmlOutput(data) {
  const outputDocument = document.implementation.createHTMLDocument("Introduction Data");
  outputDocument.documentElement.lang = "en";

  const charset = outputDocument.createElement("meta");
  charset.setAttribute("charset", "UTF-8");
  outputDocument.head.prepend(charset);

  const main = outputDocument.createElement("main");
  const title = outputDocument.createElement("h1");
  title.textContent = "Introduction Data";
  main.appendChild(title);
  appendHtmlData(main, data);
  outputDocument.body.appendChild(main);

  return `<!DOCTYPE html>\n${outputDocument.documentElement.outerHTML}`;
}

function createXmlOutput(data) {
  const outputDocument = document.implementation.createDocument(null, "introduction");
  const root = outputDocument.documentElement;

  Object.entries(data).forEach(([key, value]) => {
    appendXmlData(outputDocument, root, key, value);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(outputDocument)}`;
}

function showGeneratedOutput(format) {
  const data = getFormData();
  const output = document.getElementById("generatedOutput");
  const heading = document.getElementById("outputHeading");

  if (format === "html") {
    heading.textContent = "Generated HTML";
    output.textContent = createHtmlOutput(data);
  } else if (format === "xml") {
    heading.textContent = "Generated XML";
    output.textContent = createXmlOutput(data);
  } else {
    heading.textContent = "Generated JSON";
    output.textContent = JSON.stringify(data, null, 2);
  }

  document.getElementById("generatedOutputSection").hidden = false;
}

document.getElementById("generateHtml").addEventListener("click", () => {
  showGeneratedOutput("html");
});

document.getElementById("generateXml").addEventListener("click", () => {
  showGeneratedOutput("xml");
});

document.getElementById("generateJson").addEventListener("click", () => {
  showGeneratedOutput("json");
});

document
  .querySelector("#clear")
  .addEventListener("click", function () {
    Array.from(document.querySelectorAll("form input")).forEach((input) => {
      input.value = "";
    });
  });

const formElement = document.querySelector("form");
formElement.addEventListener("submit", (event) => event.preventDefault());
