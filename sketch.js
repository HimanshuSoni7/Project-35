//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;

var fedTime, lastFed;
var foodObj;
var feed, addFoods;

var dogImg1,dogImg2;
function preload(){
  //load images here
  dogImg1=loadImage("images/dogImg.png");
  dogImg2=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000,550);
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  foodObj=new Food(900,200);
  dog=createSprite(850,380);
  dog.addImage(dogImg1);
  dog.scale=0.4;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFoods=createButton("Add Food");
  addFoods.position(800,95);
  addFoods.mousePressed(addFood);
}

function draw(){ 
  background(46,139,87); 
  //image(dogImg1,900,170,300,350);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
  }

    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
    lastFed=data.val();
  })

  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(25);
  if(lastFed >= 12){
    text("last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed+"AM",350,30);
  }

  foodObj.display();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })  
}