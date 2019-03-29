var color01 = ('#eb6163');
var color02 = ('#111427');
var color03 = ('#ffffff');

var n = 0;
var c = 10;
var o = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetSketch();
  frameRate(24);
}

function draw() {
  if (o > 90) {
    o = 30;
  }

  for (var j = 1; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      var a = n * (137 + o / 100);
      var r = c * sqrt(n);
      var d = r / 10 + n / 100 + i * j;
      var x = r * cos(a * i) + width / 4 * i;
      var y = r * sin(a * j) + height / 4 * j;
      fill(color01);
      stroke(color02);
      ellipse(x, y, d, d);

    }
  }
  n += 1;
  if (n > height/15) {
    resetSketch();
    o += 10;
  }
}
function resetSketch() {
  angleMode(DEGREES);
  background(color01);
  n = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch();
}
