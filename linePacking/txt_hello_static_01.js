let x, y, z;
let h, w, a;
let g;

function setup() {

  createCanvas(500, 700);
  noLoop();
  ellipseMode(CORNER);
  textAlign(LEFT, CENTER);

  noFill(25);
  stroke(255);
  z = 0;
  g = 75;
}

function draw() {
  clear();
  background(0);

  h = 2;
  w = 1;
  a = 4;

  for (s = h; s < h * (h + 2) * (pow(w, 3)) * (pow(a, 3)); s++) {

    y = z;
    t = g;

    for (x = 0; x < (s * w); x++) {

      txt(width * (x / (s * w)), y + g / 2, g,255);
    }
    z += g - g / 5
    g -= g / (s * w) / (1 + 1 / (s * w))

  }
  fill('BLUE');
  textSize(100);
  noStroke()
  txt(50,height-80,120,25);
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
