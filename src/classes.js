class Sprite {
    constructor({position, velocity, image, frames = { max: 1 } }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
        
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
        c.fillStyle = 'rgba(255, 0, 0, 0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}