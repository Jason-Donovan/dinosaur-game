class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      
      this.speed = 4;
      this.bullets = [];
    }
    
    update() {
      let mvmt = createVector(0, 0);
      
      if(pressedKeys.a) {
        mvmt.x -= 1;
      }
      if(pressedKeys.d) {
        mvmt.x += 1;
      }
      if(pressedKeys.w) {
        mvmt.y -= 1;
      }
      if(pressedKeys.s) {
        mvmt.y += 1;
      }
      
      mvmt.setMag(this.speed);
      
      this.x += mvmt.x;
      this.y += mvmt.y;

      if (this.x > width) {
        this.x = 0;
      }
      if (this.x < 0) {
        this.x = width;
      }
      if (this.y > height) {
        this.y = 0;
      }
      if (this.y < 0) {
        this.y = height;
      }

      for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw();
        this.bullets[i].move();
        if (this.bullets[i].x < 0 || this.bullets[i].x > width || this.bullets[i].y < 0 || this.bullets[i].y > height) {
          this.bullets.splice(i, 1);
        }
      }
    }
    
    keyPressed() {
      if (key == "ArrowUp") {
        this.bullets.push(new bullet(this.x, this.y, "up"));
      }
      if (key == "ArrowDown") {
        this.bullets.push(new bullet(this.x, this.y, "down"));
      }
      if (key == "ArrowLeft") {
        this.bullets.push(new bullet(this.x, this.y, "left"));
      }
      if (key == "ArrowRight") {
        this.bullets.push(new bullet(this.x, this.y, "right"));
      }
    }

    draw() {
      noFill();
      noStroke();
      circle(this.x, this.y, 30);
    }
  }
