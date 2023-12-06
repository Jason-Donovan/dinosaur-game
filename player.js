class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      
      this.speed = 4;
      this.bullets = [];

      this.lives = 3;
    }
    
    // movement
    update() {
      let mvmt = createVector(0, 0);
      
      // OR (||) allows for capitals to be accepted to
      if(pressedKeys.a || pressedKeys.A) {
        mvmt.x -= 1;
      }
      if(pressedKeys.d || pressedKeys.D) {
        mvmt.x += 1;
      }
      if(pressedKeys.w || pressedKeys.W) {
        mvmt.y -= 1;
      }
      if(pressedKeys.s || pressedKeys.S) {
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

      // removes the bullets from the game when they leave the screen
      for (let i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw();
        this.bullets[i].move();
        if (this.bullets[i].x < 0 || this.bullets[i].x > width || this.bullets[i].y < 0 || this.bullets[i].y > height) {
          this.bullets.splice(i, 1);
        }
      }
    }
    
    // allows players to shoot
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

    // displays lives in the corner
    drawLives() {
      switch(this.lives) {
        case 3:
          imageMode(CENTER);
          image( heart, 15, 15, 28, 28);
          image( heart, 45, 15, 28, 28);
          image( heart, 75, 15, 28, 28);
          break;
        case 2:
          imageMode(CENTER);
          image( heart, 15, 15, 28, 28);
          image( heart, 45, 15, 28, 28);
          break;
        case 1:
          imageMode(CENTER);
          image( heart, 15, 15, 28, 28);
          break;
        case 0:
          break;
      }
    }

    // draws the player's hitbox
    draw() {
      noFill();
      noStroke();
      circle(this.x, this.y, 30);
    }
  }
