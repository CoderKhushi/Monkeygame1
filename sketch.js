var PLAY=1
var END=0
var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,groundImage,ground,invisibleGround
var FoodGroup, obstacleGroup
var score
var time
var gameoverImg,gameOver_1
var restartImg,restart_1
var jumpSound
var dieSound
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground2.png")
  gameoverImg=loadImage("gameover.png")
  restartImg=loadImage("restart.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")

}

function setup() {
  
  monkey=createSprite(50,310,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.16
  
  ground=createSprite(20,350,20,20)
  ground.addImage(groundImage)
  ground.x=ground.width/2


   invisibleGround=createSprite(200,370,400,20)
  invisibleGround.x=invisibleGround.width/2
  invisibleGround.visible=false
  
  gameOver_1=createSprite(190,160,10,10)
  gameOver_1.addImage(gameoverImg)
gameOver_1.visible=false
  
  restart_1=createSprite(190,220,10,10)
  restart_1.addImage(restartImg)
  restart_1.scale=0.7
  restart_1.visible=false
  
  
  FoodGroup=new Group()
  obstacleGroup=new Group()
  score=0
  time=0
}


function draw() {
   createCanvas(400,400)
  background(rgb(200,200,300))
  
  
  
  if(gameState===PLAY){
  ground.velocityX=-(Math.round(time*10/5))
  if(ground.x<0){
    ground.x=ground.width/2
  }
  

  time=0
    
if(keyWentDown("space") && monkey.y>200){
     
     monkey.velocityY=-15
     jumpSound.play()
     }
 if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach()
   score=score+1
   
 }
    
  spawnb()


  
  monkey.depth=ground.depth+1 
  monkey.velocityY=monkey.velocityY+0.5

  
   if(frameCount%100===0){   
  obstacle=createSprite(400,330,20,20)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.1
  obstacle.velocityX=-5  
  obstacle.lifetime=300
  obstacleGroup.add(obstacle)
   }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
       dieSound.play()
       }
  }
  if(gameState===END){
     ground.velocityX=0;
    obstacleGroup.destroyEach()
    FoodGroup.destroyEach()
    gameOver_1.visible=true
    restart_1.visible=true
    monkey.visible=false
    time=0
    score=0
    frameCount=0 
    if(mousePressedOver(restart_1)){
      gameState=PLAY
      monkey.visible=true
      restart_1.visible=false
      gameOver_1.visible=false
     
    }
     }
     
  
  
  
    monkey.collide(invisibleGround)
   drawSprites() 
  
  
  if(gameState===PLAY){
    time =Math.round(frameCount/40)
  }
  fill("black")
  text("Score="+score,350,20)
  fill("black")
  text("Survival Time="+time+" seconds",10,20)
}
function spawnb(){
  if(frameCount%80===0){
   var rand=Math.round(random(100,200))
  var banana=createSprite(400,rand,20,20)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-5
  banana.lifetime=300  
  FoodGroup.add(banana)
  }


  
  }
  
  
  
  
  





