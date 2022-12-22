const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// set canvas background to white
c.fillStyle = 'white';
// 0, 0 starts at top left of canvas
// canvas.width and canvas.height to specify how wide and tall to fill
c.fillRect(0, 0, canvas.width, canvas.height);


const image = new Image();
image.src = './img/Pellet Town.png';
// image.src takes time to load so call image.onload to draw the image out once the image is done loading
// or else it'll be a blank canvas
image.onload = () => {
    // drawImage does not take a filepath, but takes an HTML Image Object <img src="filepath">
    c.drawImage(image, -1500, -370);
};