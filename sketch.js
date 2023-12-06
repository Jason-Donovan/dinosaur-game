//player and enemy variables
let player;
let score = 0;

var enemies = [];
var spawn = [40, 560];

// sprites
//player
let playerFrames = [];
let playerNumFrames = 6;

//enemy
let enemyFrames = [];
let enemyNumFrames = 6;
let whichFrame = 0;

//other
let bg;
let heart;

// keystrokes
let pressedKeys = {};

//loads the images for player and enemy animation
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
  heart = loadImage('Assets\Sprites\Other\heart.png');
}

//makes canvas
function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  resetSketch();
}

function draw() {
  deathCheck(player);

  // background(image('Assets/Background.png', 0, 0));
  image(bg, width/2, height/2);
  player.update();
  player.draw();
  player.drawLives();
  
  // spawns enemies
  if((frameCount % 60) === 0) {
    spawnEnemies(floor(random(1,4)));
  }

  //moves enemies
  for(let i = 0; i < enemies.length; i++) {
    enemies[i].move(enemies);
    enemies[i].draw();
    imageMode(CENTER);
    image(enemyFrames[whichFrame], enemies[i].x, enemies[i].y);
  }

  //makes scorebox
  scoreBox(score);

  // check whether enemy touches player
  for (let i = 0; i < enemies.length; i++) {
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) < 30) {
      player.lives--;
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

  //animates the player
  imageMode(CENTER);
  image(playerFrames[whichFrame], player.x, player.y);
  if (frameCount % 6 === 0) {
    whichFrame += 1;
  }
  if (whichFrame === playerFrames.length) {
    whichFrame = 0;
  }
  
}

//detects keystrokes
function keyPressed() {
  player.keyPressed();
  pressedKeys[key] = true;
}
function keyReleased() {
  delete pressedKeys[key];
}

//score box
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

// spawns enemies
function spawnEnemies (number) {  
  for(let i = 0; i < number; i++) {
    // chooses randomly from 4 preset coordinates 
    spawn = round(random(1,4));
    switch(spawn) {
      case 1: //top
        enemies.push(new Enemy(width/2, 30, player));
        break;
      case 2: //bottom
        enemies.push(new Enemy(width/2, height -30, player));
        break;
      case 3: //left
        enemies.push(new Enemy(30, height/2, player));
        break;
      case 4: //right
        enemies.push(new Enemy(width - 30, height/2, player));
        break;
    }
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


// displays the death screen box with score
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

function deathCheck(player) {
  if (player.lives == 0) {
    noLoop();
    deathScreen();
  }
}