var gamestate = "play";
var play = 1;
var end = 0;
var trex, trexrunning, trexcollided;
var ground, invisibleground, groundimg;
var cloud, cloudimg, cloudgrp;
var o1, o2, o3, o4, o5, o6, obstaclegrp;
var o1img, o2img, o3img, o4img, o5img, o6img;
var score = 0;
var gameoverimg, restartimg;
var gameover, restart;


function preload() {
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimg = loadImage("ground2.png");
  trexcollided = loadAnimation("trex_collided.png");
  cloudimg = loadImage("cloud.png");
  o1img = loadImage("obstacle1.png");
  o2img = loadImage("obstacle2.png");
  o3img = loadImage("obstacle3.png");
  o4img = loadImage("obstacle4.png");
  o5img = loadImage("obstacle5.png");
  o6img = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trexrunning);
  trex.addAnimation("collided", trexcollided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage(groundimg);

  ground.x = ground.width / 2;

  invisibleground = createSprite(200, 190, 400, 10);
  invisibleground.visible = false;

  cloudgrp = createGroup();
  obstaclegrp = createGroup();

  restart = createSprite(300, 140);
  restart.addImage(restartimg);
  restart.scale = 0.5;

  gameover = createSprite(300, 100);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;

  trex.setCollider("circle", 0, 0, 40);
  trex.debug = false;
}

function draw() {
  background(180);

  ground.velocityX = -3;

  text("score:" + score, 500, 50);

  if (gamestate === "play") {

    trex.changeAnimation("running", trexrunning);

    gameover.visible = false;
    restart.visible = false;

    score = score + Math.round(frameCount / 60);

    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -8;
    }

    trex.velocityY = trex.velocityY + 0.8;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    createclouds();

    createobstacles();
    if (obstaclegrp.isTouching(trex)) {
      gamestate = end;
    }
  } else if (gamestate === end) {

    gameover.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    trex.velocityY = 0;

    trex.changeAnimation("collided", trexcollided);

    obstaclegrp.setLifetimeEach(-1);
    obstaclegrp.setVelocityXEach(0);

    cloudgrp.setLifetimeEach(-1);
    cloudgrp.setVelocityXEach(0);

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  trex.collide(invisibleground);

  drawSprites();

}


function createclouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudimg);
    cloud.y = Math.round(random(10, 60));
    cloud.velocityX = -3;
    cloud.scale = 0.4;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 300;
    cloudgrp.add(cloud);
  }
}

function createobstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;


    var selectsprites = Math.round(random(1, 6));
    switch (selectsprites) {
      case 1:
        obstacle.addImage(o1img);
        break;
      case 2:
        obstacle.addImage(o2img);
        break;
      case 3:
        obstacle.addImage(o3img);
        break;
      case 4:
        obstacle.addImage(o4img);
        break;
      case 5:
        obstacle.addImage(o5img);
        break;
      case 6:
        obstacle.addImage(o6img);
        break;
      default:
        break;
    }
    obstaclegrp.add(obstacle);

  }
}

function reset() {
  gamestate = "play";
  gameover.visible = false;
  restart.visible = false;
  cloudgrp.destroyEach();
  obstaclegrp.destroyEach();
  score = 0;
}