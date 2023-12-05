class Enemy {
  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.speed = 1.5 + (score / 75);
  }

  move(enemies) {
    const avoidanceRadius = 30;
    const maxSpeed = this.speed;

    let avoidanceVector = createVector(0, 0);
    let totalAvoided = 0;

    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i] !== this) {
        const distance = dist(this.x, this.y, enemies[i].x, enemies[i].y);
        if (distance < avoidanceRadius) {
          const avoidanceDirection = createVector(this.x - enemies[i].x, this.y - enemies[i].y).normalize();
          avoidanceVector.add(avoidanceDirection);
          totalAvoided++;
        }
      }
    }

    if (totalAvoided > 0) {
      avoidanceVector.div(totalAvoided); // Average the avoidance vector
      avoidanceVector.normalize();
    }

    const playerDirection = createVector(this.player.x - this.x, this.player.y - this.y).normalize();
    const finalDirection = p5.Vector.add(playerDirection, avoidanceVector).normalize();

    this.x += finalDirection.x * maxSpeed;
    this.y += finalDirection.y * maxSpeed;
  }

  draw() {
    noFill();
    noStroke();
    circle(this.x, this.y, 30);
  }
}
