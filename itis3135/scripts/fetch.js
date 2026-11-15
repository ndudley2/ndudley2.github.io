async function fetchData(){
    const response = await fetch("https://intro-form.tommyhost.ing/");const all = await response.json();
    const images = [];
    for (const username in all) {images.push({username: username, img: all[username].introductionData.img});}
    let main = document.querySelector("main");
    for (const username in all) {
        const record = all[username];
        const nameMascot = record.introductionData.firstName + " " + record.introductionData.lastName + "'s " + record.introductionData.adjectives + " " + record.introductionData.animal;
        const picture = document.createElement("img");
        picture.src = record.introductionData.img;
        picture.alt = record.introductionData.alt;
        picture.style.maxWidth = "200px";
        picture.style.margin = "auto";
        const label = document.createElement("p");
        const label2 = document.createElement("p");
        label.textContent = username;
        label2.textContent = nameMascot;
        main.append(picture);
        main.append(label);
        main.append(label2);
    }
}
