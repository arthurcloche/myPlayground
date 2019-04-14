let x, y, gain;
let h, w;


function setup() {

  createCanvas(500, 800);
  noLoop();
  ellipseMode(CORNER);

  fill(252);
  noStroke();
  gain = 0;
}

function draw() {
  clear();
  background(25);

  // You can play around with those values. It will always fill the canvas.
  h = 2;
  w = 3;

  for (s = h; s < h * (h + 2) * (pow(w, 3)); s++) {
    y = gain;
    for (x = 0; x < (s * w); x++) {

      ellipse(width * (x / (s * w)), y, width / (s * w))

    }
    gain += width / (s * w)

  }

  paper();
}

function paper() {
  for (var i = 0; i < 500; i += 2) {
    for (var j = 0; j < 500; j += 2) {
      fill(random(175, 225), 25);
      rect(i, j, 2, 2);
    }
  }
}
