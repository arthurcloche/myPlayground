var vehicles = [];
var points = [];
var vect;
var s = 12;

function preload() {
  img = loadImage('data/02.jpg');
}

function setup() {
  createCanvas(600, 800, P2D);
  background(color01);
  pixelDensity(1);
  noCursor();
  img.loadPixels();

  for (let i = 0; i < img.width; i += s) {
    for (let j = 0; j < img.height; j += s) {
      let index = (i + j * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];
      let c1 = color(r, g, b, a);
      let b1 = brightness(c1);
      let r1 = red(c1);

      let k = map(r1, 255, 0, 0, s);

      let vect = createVector(i, j, k);
      points.push(vect);

    }
  }

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y, pt.z);
    vehicles.push(vehicle);

  }
}

function draw() {
  background(35, 175, 220);

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.update();
    v.edges();
    v.behaviors();
    v.show();
  }

}

function Vehicle(x, y, z) {
  this.pos = createVector(x, y);
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.rad = z;
  this.r = 1;
  this.maxspeed = 6;
  this.maxforce = 1;
};

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  arrive.mult(1);
  flee.mult(4);
  this.applyForce(flee);
  this.applyForce(arrive);
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);

}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  this.dist = p5.Vector.dist(this.pos, this.target);

}

Vehicle.prototype.show = function() {
  noStroke();
  let alp = map(this.dist, 0, 50, 255, 0);
  if (this.dist > 0.5) {
    fill(35, 50, 100, alp);
  } else {
    fill(35, 50, 100, 255);
  }
  ellipse(this.pos.x, this.pos.y, this.rad);

}

Vehicle.prototype.edges = function() {
  if (this.pos.x > width) {
    this.pos.x = width;
  };

  if (this.pos.x < 0) {
    this.pos.x = 0;
  };

  if (this.pos.y > height) {
    this.pos.y = height;
  };

  if (this.pos.y < 0) {
    this.pos.y = 0;
  };

}

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;

}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 75) {

    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }

}
