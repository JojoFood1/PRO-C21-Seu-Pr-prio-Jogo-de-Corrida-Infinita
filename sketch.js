var sky, girl, comet, comet2
var cometsGroup, cometImg, comet2Img, girlImg, skyImg, gameOverImg;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameOver, restart;
var distance = 0;
var CG, CG2;


function preload(){
 skyImg = loadImage("assets/pink space.jpg");
 girlImg = loadImage("assets/girl.png");
 cometImg = loadImage("assets/comet.png");
 comet2Img = loadImage("assets/comet2.png");
 gameOverImg = loadImage("assets/game over.png");
}

function setup() {
 createCanvas(1250, 600);
 sky = createSprite(800, 400);
 sky.addImage(skyImg);
 sky.velocityX = -5;
 sky.scale = 4;
 sky.width = 2;

 girl = createSprite(100, 150);
 girl.addImage(girlImg);
 girl.scale = 0.20;
 girl.width = 2;


 gameOver = createSprite(650, 150);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.9;
 gameOver.visible = false;
 gameOver.width = 3;

 CG = new Group();
 CG2 = new Group();
 
}

function draw() {
 background(0);

 drawSprites();

 textSize(20);
 fill("white");
 text("Distance: " + distance, 1000, 30);

 if(gameState === PLAY) {

    distance = distance + Math.round(getFrameRate()/50);
    sky.velocityX = -(6 + 2*distance/150);

    girl.y = World.mouseY;

    edges = createEdgeSprites();
    girl.collide(edges);

    if(sky.x < 250) {
        sky.x = width/2;
    }

    var select_comet = Math.round(random(1, 2))
   
    if(World.frameCount % 60 == 0) {
     if (select_comet == 1) {
        cometsGroup();
   } else if (select_comet == 2) {
        comets2Group();
}}

   if(CG.isTouching(girl)) {
    gameState = END;
    comet.velocityX = 0;
   }

   if(CG2.isTouching(girl)) {
    gameState = END;
    comet2.velocityX = 0;
   }
 } else if(gameState === END) {
    gameOver.visible = true;

    fill("white");
    text("Pressione a tecla para cima para reiniciar o jogo", 450, 200);
    textSize(30);

    sky.velocityX = 0;
    girl.velocityY = 0;

    CG.setVelocityXEach(0);
    CG.setLifetimeEach(-1);
    CG2.setVelocityXEach(0);
    CG2.setLifetimeEach(-1);

    if(keyDown(UP_ARROW)) {
        reset();
    }
 }
}

function cometsGroup() {
    comet = createSprite(1300, Math.round(random(50, 600)));
    comet.scale = 0.17;
    comet.velocityX = -(8 + 2 * distance/150);
    comet.addImage(cometImg);
    comet.setLifetime = 170;
    CG.add(comet);
}

function comets2Group(){
    comet2 = createSprite(1300, Math.round(random(50, 600)));
    comet2.scale = 1.5;
    comet2.velocityX = -(8 + 2 * distance/150);
    comet2.addImage(comet2Img);
    comet2.setLifetime = 170;
    CG2.add(comet2);
}

function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    CG.destroyEach();
    CG2.destroyEach();
    distance = 0;
    girl.y = 150;
}

