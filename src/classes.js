class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
        this.moving = false;
        this.sprites = sprites;
        
    }

    // this.frames.val iterates from 0 - 3
    // multiply by width (48 px) to get diff frames to animate player walking
    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,           // x coordinate to begin crop
            0,                                      // y coordinate to begin crop
            this.image.width / this.frames.max,     // divide by frames because player sprite has 4 frames, map is 1 frame
            this.image.height,                      // crop entire height of sprite
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,     // width that sprite is rendered out at
            this.image.height                       // height that sprite is rendered out at
        );
        
        if (!this.moving) return;

        if (this.frames.max > 1) this.frames.elapsed++;

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
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
        c.fillStyle = 'rgba(255, 0, 0, 0.5)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}