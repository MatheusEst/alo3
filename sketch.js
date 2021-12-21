// variaveis aqui
var estado = "Play";
var seila;
var die;
var check;
var jump;
var gameover,gameoverimg;
var restart,restartimg;
var pontos;
var nmmrale;
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var nuvens,nuvemimg;
var nuvensgp;
var cactogp;
var chao,chaoIMG;
var chaoverdadeiro;
var Trex,ImgTrex,imgtrexmorto;
function criarnuvens(){
  if(frameCount%160 == 0){
    nuvens = createSprite(width,Math.round(random(5,60)));
    nuvens.addImage(nuvemimg);
    nuvens.velocityX = -0.7;
    nuvens.scale =  0.5;
    nuvens.depth = 1;
    Trex.depth =2;
    nuvens.lifeTime = 200;
    nuvensgp.add(nuvens);
  }
}
function gerarcactos(){
  if(frameCount%100 == 0){
  var cactos = createSprite(width,155)
 cactos.velocityX = chao.velocityX;
 nmmrale = Math.round(random(1,6));
 //console.log(nmmrale);
 
cactos.lifeTime = 200;
 switch(nmmrale){
   case 1 : cactos.addImage(cacto1);
   cactos.scale = 0.8;
   cactos.depth = 0
   break;
   case 2 : cactos.addImage(cacto2);
   cactos.scale = 0.7;
   break;
   case 3 : cactos.addImage(cacto3);
   cactos.scale = 0.5;
   break;
   case 4 : cactos.addImage(cacto4);
   cactos.scale = 0.5;
   break;
   case 5 : cactos.addImage(cacto5);
   cactos.scale = 0.5;
   break;
   case 6 : cactos.addImage(cacto6);
   cactos.scale = 0.5;
   break;
   default : break;
 }
 console.log("cacto:" + cactos.velocityX);
 cactogp.add(cactos); 
}
}
function preload(){
 //carregamento de imagens
   ImgTrex = loadAnimation("trex1.png","trex3.png","trex4.png");
   imgtrexmorto = loadAnimation("trex_collided.png");
   chaoIMG = loadImage("ground2.png");
   nuvemimg = loadImage("cloud.png");
   cacto1 = loadImage("obstacle1.png")
   cacto2 = loadImage("obstacle2.png")
   cacto3 = loadImage("obstacle3.png")
   cacto4 = loadImage("obstacle4.png")
   cacto5 = loadImage("obstacle5.png")
   cacto6 = loadImage("obstacle6.png")
   jump = loadSound("jump.mp3")
   die = loadSound("die.mp3")
   check = loadSound("checkPoint.mp3")
   restartimg = loadImage("restart.png")
   gameoverimg = loadImage("gameOver.png")
}
function reset(){
  estado = "Play";
    Trex.x = 20
    Trex.y = 100
    cactogp.destroyEach();
    nuvensgp.destroyEach();
    chao.velocityX = -10;
    Trex.changeAnimation("Run");
    pontos = 0;
    restart.visible =  false;
    gameover.visible = false;
    World.seconds = 0;
    frameCount = 0;
    pontos = 0;
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  background("blue")
  cactoss = new Group();
  //criar sprites
  Trex = createSprite(20,100);
  Trex.addAnimation("Run",ImgTrex);
  Trex.addAnimation("morto",imgtrexmorto);
  Trex.scale = 0.5;
  chao = createSprite(width,175);
  chao.scale = 1.5;
  gameover = createSprite(width/2,100);
  gameover.addImage(gameoverimg)
  restart = createSprite(width/2,150);
  restart.addImage(restartimg)
  restart.scale = 0.5;
gameover.visible = false;
restart.visible = false;
  chao.addImage(chaoIMG)
  chaoverdadeiro = createSprite(20,230)
  chaoverdadeiro.visible = false;
  nuvensgp = new Group();
 cactogp = new Group();
  pontos = 0; 
   chao.velocityX = -10;
}

function draw(){
  background("white")
  if (estado == "Play"){
    if (frameCount%270 == 0){
    check.play(); 
  }
  if(frameCount%60 == 0){
    pontos++;
  }
    if (chao.x <= 0){
      chao.velocityX = chao.velocityX - 1
      console.log(chao.velocityX)
  chao.x = chao.width/2;
    }
if ((keyDown("SPACE")|| touches.length > 0) && Trex.y >= 155){
      Trex.velocityY = -5
      jump.play();
      touches = []

      
  }

      if (Trex.isTouching(cactogp)){
        die.play();
        estado = "gameover";
          }
  gerarcactos();
  criarnuvens();
  
   Trex.velocityY += 0.2
}
Trex.collide(chaoverdadeiro);
  if(estado == "gameover")
  {
    chao.velocityX = 0;
    nuvensgp.setVelocityXEach(0);
    cactogp.setVelocityXEach(0);
    Trex.changeAnimation("morto");
    Trex.velocityY = 0;
    gameover.visible = true
    restart.visible = true
    cactogp.setLifetimeEach(-1);
    nuvensgp.setLifetimeEach(-1);
  }
  
if ((mousePressedOver(restart) || touches.length > 0)&& estado == "gameover"){
    reset();
    touches = [];
  }
  drawSprites();
  
  console.log(estado)
  textSize(18)
 text("Pontos:"+ pontos, 20, 20);
}
