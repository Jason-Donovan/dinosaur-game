class Enemy {
  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.speed = 2 + (score/50);
  }

  update() {
    this.rotation = atan2(player.y - this.y, player.x - this.y);
    this.speed = 2.5;

    this.x += cos(this.rotation) * this.speed;
    this.y += sin(this.rotation) * this.speed;
  }

  move() {
    var xDir = player.x-this.x;
    var yDir = player.y-this.y;
    var vector = createVector(xDir, yDir).normalize();
    this.x += vector.x*this.speed;
    this.y += vector.y*this.speed;
  }
  
  draw() {
    noFill();
    noStroke();
    circle(this.x, this.y, 30);
  }
}
