function preload() {
  img = loadImage("data/mona_800x1192.jpg");
}

function roundTo(x, y) {
  return Math.round(x / y) * y
}
var n;
var c;

function setup() {
  createCanvas(800, 1192) // ! width and height should be similar to img
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      var index = (x + y * width) * 4;
      var n = roundTo(warp(x, y, 0.0018, 600), 4);
      var indexW = index + (4 * n);
      if (indexW > (img.width + img.height * width) * 4) {
        indexW = indexW - ((img.width + img.height * width) * 4)
      };

      var r1 = img.pixels[indexW + 0];
      var g1 = img.pixels[indexW + 1];
      var b1 = img.pixels[indexW + 2];
      var a1 = img.pixels[indexW + 3];
      var c = color(r1, g1, b1, a1);

      img.pixels[index + 0] = red(c);
      img.pixels[index + 1] = green(c);
      img.pixels[index + 2] = blue(c);
      img.pixels[index + 3] = a1;

    }

  }
  img.updatePixels();
  image(img, 0, 0);

}

function warp(_x, _y, factor, n_range) {

  this.n1 = noise((_x + 0.0) * factor, (_y + 0.0) * factor, ) * n_range;
  this.n2 = noise((_x + 5.2) * factor, (_y + 1.3) * factor, ) * n_range;
  this.q = createVector(n1, n2);

  this.n3 = noise(((_x + q.x * 4) + 1.7) * factor, ((_y + q.y * 4) + 9.2) * factor, ) * n_range;
  this.n4 = noise(((_x + q.x * 4) + 8.3) * factor, ((_y + q.y * 4) + 2.8) * factor, ) * n_range;
  this.r = createVector(n3, n4);

  return (noise((_x + r.x * 4) * factor, (_y + r.y * 4) * factor) * n_range);

}

function mousePressed() {
  if (keyIsDown(SHIFT)) {

    save();

  }
}
