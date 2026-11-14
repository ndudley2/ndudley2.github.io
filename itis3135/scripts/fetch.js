async function fetchData(){
    const response = await fetch("https://intro-form.tommyhost.ing/");const all = await response.json();
    const images = [];
    for (const username in all) {images.push({username: username, img: all[username].introductionData.img});}
    for (const username in all) {  const record = all[username];   const picture = document.createElement("img");  picture.src = record.introductionData.img;
        picture.alt = username;
        picture.style.maxWidth = "200px";
        const label = document.createElement("p");
        label.textContent = username;
        document.main.append(picture);
        document.main.append(label);
    }
}
