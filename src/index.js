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

const playerImage = new Image();
playerImage.src = './img/playerDown.png';

/*
image/map takes time to load
call image.onload to draw the image out once the image is done loading or else it'll be a blank canvas
since playerImage is smaller, draw it after map is drawn or else map will be layered on top of player image
*/
image.onload = () => {
    // drawImage does not take a filepath, but takes an HTML Image Object <img src="filepath">
    c.drawImage(image, -1504, -455);
    c.drawImage(playerImage,
                0,                          // x coordinate to begin crop
                0,                          // y coordinate to begin crop
                playerImage.width / 4,      // crop 1/4 to get leftmost sprite
                playerImage.height,         // crop entire height of sprite
                canvas.width / 2 - playerImage.width / 4 / 2,   // x offset to place sprite in center
                canvas.height / 2 - playerImage.height / 2,  // y offset to place sprite in center
                playerImage.width / 4,      // width that sprite is rendered out at
                playerImage.height          // height that sprite is rendered out at
                );
};

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position;
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position: {
        x: -1504,
        y: -455
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    c.drawImage(playerImage,
                0,                          // x coordinate to begin crop
                0,                          // y coordinate to begin crop
                playerImage.width / 4,      // crop 1/4 to get leftmost sprite
                playerImage.height,         // crop entire height of sprite
                canvas.width / 2 - playerImage.width / 4 / 2,   // x offset to place sprite in center
                canvas.height / 2 - playerImage.height / 2,  // y offset to place sprite in center
                playerImage.width / 4,      // width that sprite is rendered out at
                playerImage.height          // height that sprite is rendered out at
                );

    // if keys pressed, move background image (illusion of movement)
    if (keys.w.pressed && lastKey === 'w') background.position.y += 3;
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 3;
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 3;
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3;
}

animate();

// if more than 1 key pressed, will move in direction of last key
let lastKey = '';

// window object represents an open window in a browser
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;    
    };
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;    
    };
});


