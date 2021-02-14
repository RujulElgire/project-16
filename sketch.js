var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var flag;
var distance = 0;
var obstaclesGroup;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  opponentImg = loadImage("opponent5.png");
  opponentImage= loadImage("opponent6.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
}

function setup() {

  createCanvas(500, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  

  flag = Math.round(random(1, 3))

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;
  
  obstaclesGroup = createGroup();

  opponent = createSprite(50, random(50, 250), 10, 10)
  opponent.velocityX = 0.1;
  opponent.addImage(opponentImg);
  opponent.scale = 0.07
}

function draw() {
  background(0);
  
  if(opponent.isTouching(obstaclesGroup)) {
    opponent.velocityX = -5;
    opponent.addImage(opponentImage)
  }
  opponent.debug = true
  opponent.setCollider("rectangle",-200,500,-1100,300)
  
  
 
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);
  if(opponent.x < 0) {
     opponent.velocityX = 0.1;
  opponent.addImage(opponentImg);
  opponent.scale = 0.07
    opponent.depth = 1000000000;
    obstaclesGroup.depth = 100000
  }
  if (gameState === PLAY) {

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    path.velocityX = -5;
   
   createObstacles();
    
    //code to reset the background
    if (path.x < -25) {
      path.x = 200;
      distance = distance + 10
    }

if(obstaclesGroup.isTouching(mainCyclist)) {
  gameState = END
}
  }
  if(gameState == END) {
    path.velocityX = 0;
    mainCyclist.addAnimation("image/mainPlayer.png")
    opponent.velocityX = 5.1;
    opponent.lifetime = 10;
    text("gameOver",200,200)
  }
  mainCyclist.setCollider("rectangle",-200,500,-1100,300)
}

function createObstacles() {
  if (frameCount % 200 == 0) {
    obstacle = createSprite(520, random(50, 250), 10, 10)
    obstacle.lifetime = 120;
    obstacle.debug = true
    obstacle.setCollider("circle",-2,2,105)
    obstacle.velocityX = -5;
    obstacle.scale = 0.1;
    obstaclesGroup.add(obstacle)
    if (flag == 1) {
      obstacle.addImage(obstacle1)
    }else if(flag == 2) {
      obstacle.addImage(obstacle2)
    }else{
      obstacle.addImage(obstacle3)
    }
  }
}