var bananaImg; 
var obstacleImg; 
var obstaclegroup; 
var bananagroup; 
var monkey; 
var mAnimation; 
var backgroundimg;  
var score=0; 
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  mAnimation= loadAnimation("monkey0.png","monkey1.png", "monkey2.png","monkey3.png","monkey4.png", "monkey5.png", "monkey6.png", "monkey7.png", "monkey8.png"); 
  backgroundimg=loadImage("background0.png"); 
  bananaImg=loadImage("banana0.png"); 
  obstacleImg=loadImage("stone0.png"); 
}


function setup() {
  createCanvas(600,400);
  bgrd=createSprite(600,300,0,0); 
  bgrd.scale=2;
  bgrd.addImage("jungle", backgroundimg);
  bgrd.velocityX=-2; 
  bgrd.x= bgrd.width/2;
  invisibleground=createSprite(200,370,400,20);
  invisibleground.visible=false;
  monkey = createSprite(200,20);
  monkey.scale=0.1;
  monkey.addAnimation("monkeyXA", mAnimation); 
  gravity=0.5;
  obstaclegroup=new Group(); 
  bananagroup=new Group(); 
} 


function draw(){
  background(255); 
  if(gameState==PLAY){ 
    monkey.collide(invisibleground); 
    if(keyDown("space") && monkey.y >= 321.55){
        monkey.velocityY=-10; 
    }            
    monkey.velocityY=monkey.velocityY+gravity; 
    if(monkey.isTouching(bananagroup)){
        score=score+2;   
        bananagroup.destroyEach(); 
    }
    if(monkey.isTouching(bananagroup)){
        score=score+2;  
  }
    if(monkey.isTouching(obstaclegroup)){
        monkey.scale=0.2; 
  } 
    if(bgrd.x <600){
        bgrd.x=bgrd.width/2;
  }  
    switch(score){ 
      case 10: monkey.scale=0.2; 
        break; 
      case 20: monkey.scale=0.4; 
        break; 
      case 30: monkey.scale=0.6; 
        break; 
      case 40: monkey.scale=0.8; 
        break; 
        default: break; 
  }
    if(monkey.isTouching(obstaclegroup)){
      gameState=END; 
      monkey.velocityX=0; 
  } 
  else if(gameState==END){ 
    obstaclegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0); 
    obstaclegroup.setLifetimeEach(-1);
    monkey.velocityX=0; 
    invisibleground.velocityX=0; 
    bananagroup.setLifetimeEach(-1); 
  } 
  stroke("black"); 
  textSize(20); 
  fill("black");
  text("Score: " + score, 600,200);
  food(); 
  obstacles();
 drawSprites();  
  stroke("black"); 
  textSize(20); 
  fill("black");
  text("Score: " + score, 500,50);

} 
function food(){
  var remainder=frameCount % 80;
  if(remainder==0){
    banana= createSprite(171,361,0,0);
    banana.addImage("banana", bananaImg);
    banana.y=random(120,358);
    banana.scale=0.5; 
    banana.x=600; 
    banana.velocityX=-2; 
    banana.lifetime=155; 
    banana.scale=0.09; 
    bananagroup.add(banana); 
}
} 
function obstacles(){
  var remainder=frameCount % 60;
  if(remainder==0){
    obstacle=createSprite(6,320,0,0);
    obstacle.addImage("obstacle", obstacleImg);
    obstacle.scale=0.1;
    obstacle.x=600; 
    obstacle.velocityX=-2; 
    obstacle.lifetime=200;
    obstaclegroup.add(obstacle);
  }
}
}