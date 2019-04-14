let x, y, z;
let h, w, a;
let g;

function setup() {

  createCanvas(500, 700);
  noLoop();
  ellipseMode(CORNER);
  textAlign(CENTER, CENTER);

  noFill(25);
  stroke(255);
  z = 0;
  g = 75;
}

function draw() {
  clear();
  background(252);

  h = 3;
  w = 1;
  a = 2;

  for (s = h; s < h * (h + 2) * (pow(w, 3)) * (pow(a, 3)); s++) {

    y = z;
    t = g;



      txt(width / 2, y + g / 2, g,25);

    z += g - g / 5
    g -= g / (s * w) / (1 + 1 / (s * w))

  }

  noStroke()

  paper();
}

function txt(x, y, g, c) {
  textSize(g);
  fill(c);
  text('HELLO', x, y);
}

function paper() {
  noStroke();
  for (var i = 0; i < width; i += 2) {
    for (var j = 0; j < height; j += 2) {
      fill(random(175, 225), 25);
      rect(i, j, 2, 2);
    }
  }
}
