var ships = [];
var numShips = 10;
var radius = 50;
var move = 2;
var clicks = 0;
var newShipClick = 2;

function setup() {
  createCanvas(800,600);
  //frameRate(20)
  for(var i = 0; i < numShips; i++) {
    ships.push(new Ship(400,300));
  }
}

function mouseClicked(){
  for(var x = 0; x < ships.length; x++) {
    if(dist(mouseX,mouseY,ships[x].x,ships[x].y) < ships[x].radius){
      if(clicks > 0) {
        clicks--;
      }
      ships[x].update(true);
      ships.splice(x,1);
      return;
    }
  } 
  clicks++;
}

function draw() {
  background(0)
  for(var w = 0; w < ships.length; w++) {
    ships[w].update(false);
  }
  if(clicks > newShipClick) {
    ships.push(new Ship(400,300));
    clicks = 0;
  }
}

class Ship {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.radius = random(20,radius);
    this.c = random(100,255);
    this.red = this.c;
    this.green = this.c;
    this.blue = this.c;
    this.mx = random(-.1,.1);
    this.my = random(-.1,.1);
  }
  
  update(red) {
    noStroke()
    // var x = floor(random(4));

    this.dx += this.mx;
    this.dy += this.my;
    
    this.x += this.dx;
    this.y += this.dy;

    if(this.x <= this.radius/2 && this.dx < 0) {
      this.dx *= -1
    }
    if(this.y <= this.radius/2 && this.dy < 0) {
      this.dy *= -1
    }
    if(this.x >= width - this.radius/2 && this.dx > 0) {
      this.dx *= -1
    }
    if(this.y >= height - this.radius/2 && this.dy > 0) {
      this.dy *= -1
    }

    if(floor(random(100)) < 25) {
      this.red = 255;
      this.green = 255;
    } else if(red){
      this.red = 255;
      this.green = 0;
      this.blue = 0;
      this.radius += 100;
    } else {
      this.red = this.c;
      this.green = this.c;      
    }
    fill(this.red,this.green,this.blue);
    
    ellipse(this.x,this.y,this.radius); 
    //ellipse(constrain(this.x,0,200),constrain(this.y,0,200),this.radius); 
    //ellipse(constrain(this.x,0,width-(this.radius*3)),constrain(this.y,0,height-(this.radius*3)),this.radius); 
  }
}
