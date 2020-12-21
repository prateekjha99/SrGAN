
const heading = ['Sr-GAN', 'Super-pixelation']
var idx = 0
setInterval(function () {
    document.querySelector('h1').innerText = heading[idx];
    idx = (idx + 1) % 2;
}, 3000);

function upload(event) {
    event.preventDefault();
}

const [WIDTH, HEIGHT] = [500, 400];
var loadFile = function (event) {
    var image = document.getElementById('input');
    image.src = URL.createObjectURL(event.target.files[0]);
    image.width = WIDTH;
    image.maxheight = HEIGHT;

    document.querySelector('p').innerText = 'Image Uploaded'
};
function generate(event) {
    event.preventDefault();
}
function download(event) {
    event.preventDefault();
    var link = document.createElement('a');
    link.href = document.getElementById('output').src;
    link.download = "images/output.png";
    link.click();
    console.log(document.getElementById('output'))
}
