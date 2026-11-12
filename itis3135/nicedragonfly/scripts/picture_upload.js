function loadImage(){
    var image = document.getElementById('img').files[0];
    const imageURL = URL.createObjectURL(image);
    var text = "<img src=\"" + imageURL + "\" >";
    document.getElementById('loadImage').innerHTML = text;
}