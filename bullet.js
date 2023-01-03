// rebuildplayer class
// make it so when an arrow key is presed a bullet spawns in that direction
// start with hte the only 4 directions up down left right to start
// maybe move onto diagnals if feeling spicy

class bullet {
    constructor(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      
      this.speed = 8;
    }
    
    draw() {
      fill(150);
      stroke(20);
      circle(this.x, this.y, 8);
    }

    move() {
      switch (this.direction) {
        case 'up':
          this.y -= this.speed;
          break;
        case 'down':
          this.y += this.speed;
          break;
        case 'left':
          this.x -= this.speed;
          break;
        case 'right':
          this.x += this.speed;
          break;
      }
    }
}