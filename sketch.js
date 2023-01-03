let player;
let score = 0;

var enemies = [];
var spawn = [40, 560];

let playerFrames = [];
let playerNumFrames = 6;
let enemyFrames = [];
let enemyNumFrames = 6;

let whichFrame = 0;

let bg;

let pressedKeys = {};

function preload() {
  for (let i = 1; i < playerNumFrames + 1; i++) {
    let filename = 'Assets/Sprites/Player/' + i + '.png';
    let frame = loadImage(filename);
    playerFrames.push(frame);
  }
  for(let i = 1; i < enemyNumFrames + 1; i++) {
    let filename = 'Assets/Sprites/Enemy/' + i + '.png';
    let frame = loadImage(filename);
    enemyFrames.push(frame);
  }

  bg = loadImage('Assets/Background.png');
}

function setup() {
  createCanvas(600, 600);
  resetSketch();
  var button = createButton("reset");
  button.mousePressed(resetSketch);
}

function draw() {
  // background(image('Assets/Background.png', 0, 0));
  image(bg, width/2, height/2);
  player.update();
  player.draw();
  
  if((frameCount % 120) === 0) {
    spawnEnemies(floor(random(1,5)));
  }

  for(let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].draw();
    imageMode(CENTER);
    image(enemyFrames[whichFrame], enemies[i].x, enemies[i].y);
  }

  scoreBox(score);

  // check whether enemy touches player
  for (let i = 0; i < enemies.length; i++) {
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) < 30) {
      noLoop();
      deathScreen();
    }
  }

  // checks if player's bullet hits enemy
  for (let i = 0; i < player.bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (dist(player.bullets[i].x, player.bullets[i].y, enemies[j].x, enemies[j].y) < 19) {
        player.bullets.splice(i, 1);
        enemies.splice(j, 1);
        score ++;
        break;
      }
    }
  }

  imageMode(CENTER);
  image(playerFrames[whichFrame], player.x, player.y);
  if (frameCount % 6 === 0) {
    whichFrame += 1;
  }
  if (whichFrame === playerFrames.length) {
    whichFrame = 0;
  }
  
}

function keyPressed() {
  player.keyPressed();
  pressedKeys[key] = true;
}

function keyReleased() {
  delete pressedKeys[key];
}

function scoreBox(score) {
  textAlign(CENTER);
  fill(60);
  rectMode(CENTER);
  rect(width/2, 18, 75, 28, 4);
  
  fill(230);
  textFont('Courier New', 12)
  text("score", width/2, 15);
  text(score, width/2, 27)
}

function spawnCoord() {
  return spawn[Math.round(random(0,1))];
}

function spawnEnemies (number) {  
  for(let i = 0; i < number; i++) {
    enemies.push(new Enemy(spawnCoord(), spawnCoord(), player));
  }
}

function resetSketch () {
  loop();
  loop();
  player = new Player(width/2, height/2);
  spawnEnemies(2);
  frameRate(60);
  score = 0;
  enemies.splice(0, enemies.length);
}

function deathScreen() {
  rectMode(CENTER);
  fill(255);
  stroke(60);
  rect(width/2, 130, 200, 100, 20)
  fill(60);
  textAlign('center');
  text("you lost", width/2, 100);
  text("your final score was : " + score, width/2, 150);
  if (score < 10) {
    text("skill issue try harder" ,width/2, 170);
  } else if (50 > score > 10) {
    text("better, but a blind person could still beat you" , width/2, 170);
  } else {
    text("not bad", width/2, 170);
  }
}
