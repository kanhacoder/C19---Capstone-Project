var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,ghostRunning;
var invisibleBlockGroup, invisibleBlock;
var gameOver,gameOverImg;
var gameState = "play";
var gameState = "end";

  

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostRunning = loadImage("ghost-jumping.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  ghost = createSprite(300,450);
  ghost.scale = 0.5;
  ghost.addImage("ghost",ghostRunning);
  tower.velocityY = 3;
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  gameOver = createSprite(300,300);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible = false;
  ghost.setCollider("rectangle",5,10,200,200);
  ghost.debug = true;
}

function draw() {
  background(200);
  
  if(tower.y > 600){
      tower.y = 0
    }
    if(keyDown("space")){
      ghost.velocityY = -3;
    }
    ghost.velocityY = ghost.velocityY + 0.5
    if(keyDown("right_arrow")){
      ghost.x = ghost.x+2;
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x-2;
    }
    spawnDoors();
    
    if(ghost.isTouching(invisibleBlockGroup)||ghost.y > 600){
      gameState = "end";
      ghost.velocityY = 0;
      climbersGroup.setVelocityYEach(0);
      doorsGroup.setVelocityYEach(0);
      invisibleBlockGroup.setVelocityYEach(0);
      tower.velocityY = 0;  
      gameOver.visible = true;
    }

    if(keyDown("r")){
      gameState = "play";
      ghost.velocityY = 3;
      climbersGroup.setVelocityYEach(3);
      doorsGroup.setVelocityYEach(3);
      invisibleBlockGroup.setVelocityYEach(3);
      tower.velocityY = 3;  
      gameOver.visible = false;
      ghost.x = 300;
      ghost.y = 450;
      climbersGroup.destroyEach(3);
      doorsGroup.destroyEach(3);
      invisibleBlockGroup.destroyEach(3);
    }
    ghost.collide(climbersGroup);
    drawSprites();
}

function spawnDoors(){
  if(frameCount % 240 === 0){
  door = createSprite(450,-50);
  door.addImage("door",doorImg);
  door.x = Math.round(random(100,450));
  door.velocityY = 3;
  door.depth = ghost.depth;
  ghost.depth = ghost.depth+1;
  doorsGroup.add(door);
  doorsGroup.lifetime = 650;

  climber = createSprite(450,10);
  climber.addImage("climber",climberImg);
  climber.velocityY = 3;
  climber.depth = door.depth;
  climber.x = door.x;
  climbersGroup.add(climber);
  climbersGroup.lifetime = 650;

  invisibleBlock = createSprite(450,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2
  invisibleBlock.x = climber.x;
  invisibleBlock.velocityY = 3;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.lifetime = 650;
  invisibleBlock.visible = false;


  }
}

