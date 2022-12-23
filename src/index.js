const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
// pellet town map is 70 tiles wide, 40 tiles tall
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, i + 70));
}

// 12x12 pixel tiles, but map is zoomed in at 400%
// 12 * 4 = 48
class Boundary {
    static width = 48;
    static height = 48;

    constructor({position}) {
        this.position = position;
        this.width = 48; 
        this.height = 48;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = [];
const offset = {
    x: -1504,
    y: -455
};

// 1025 is the symbol for collision boundary in json file
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) { 
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
});

const image = new Image();
image.src = './img/Pellet Town.png';

const playerImage = new Image();
playerImage.src = './img/playerDown.png';

class Sprite {
    constructor({position, velocity, image, frames = { max: 1 } }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
    }

    draw() {
        c.drawImage(
            this.image,
            0,                          // x coordinate to begin crop
            0,                          // y coordinate to begin crop
            this.image.width / this.frames.max,     // divide by frames because player sprite has 4 frames, map is 1 frame
            this.image.height,                      // crop entire height of sprite
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,     // width that sprite is rendered out at
            this.image.height                       // height that sprite is rendered out at
        );
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

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

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
});

// array to hold all movables for when key is pressed
// map and collisions travel the same amount of pixels
const movables = [background, testBoundary];

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    // boundaries.forEach(boundary => {
    //     boundary.draw();
    // });
    testBoundary.draw();
    player.draw();
    // if keys pressed, move background image (illusion of movement)
    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach(movable => movable.position.y +=3)
    } else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach(movable => movable.position.x +=3)
    } else if (keys.s.pressed && lastKey === 's') {
        movables.forEach(movable => movable.position.y -=3)
    } else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach(movable => movable.position.x -=3)
    };
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


