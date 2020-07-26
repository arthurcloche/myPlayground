let ft;

let minX, minY;
let maxX, maxY;
let offX = 0;
let offY = 0;
let charDim = [];
let sty = false;
let hi = false;
let obj = [];
let px, py;

function loadChar(font) {
  const s = str("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789éàâè.:,;!?-/ (){}[]=_'");
  let len = int(s.length);
  let ft = font;
  const fts = 10;
  for (i = 0; i < len; i++) {
    let char = s.charAt(i);
    charDim[char] = bounds(char, 0, 0, fts, ft);
  }
}

function bounds(t, x, y, s, font) {
  let char = str(t);
  const ft = font;
  let bbox = ft.textBounds(char, x, y, s)
  return bbox.w;
}

// adjusting the kerning for specific letters
function letKern (letter,dflt) {
  let kern = dflt;
  let space = 0;
  let c = letter;

  if (c == 'w' || c == 'y'|| c == 'a'|| c == 'e') {
    space = 0;
  } else if (c == 'h' || c == 'l') {
    space = 1.8 * kern;
  } else if (c == 'Y') {
    space = -kern*3.2;
  } else {
    space = kern;
  }

  return space

}

function preload() {
  ft = loadFont('data/Marcel-Bold.otf');
}


function setup() {
  createCanvas(windowWidth, windowHeight,);
  pixelDensity(1);
  frameRate(24);
  smooth(1);
  noFill();
  strokeWeight(1);
  controls();

  loadChar(ft);
  inp = select("#textfield");
}

function draw() {
  clear();
  iniSliders();

  background(backgroundColor);
  let obj = [];

  if (sty == true) {
    noStroke();
    fill(fontColor);
  }

  if (sty == false) {
    stroke(fontColor);
    noFill();
    strokeWeight(1.5);
  }

  minX = minY = 99999;
  maxX = maxY = -99999;

  let linesCount = 0;
  let letterCount = -999;

  let s = str(inp.value());
  // let s = str('Cool\nstuff\nyeah!');
  let l = int(s.length);
  let lines = s.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let li = lines[i];
    linesCount = lines.length;
    let chars = li.split("");
    if(chars.length>letterCount){letterCount = chars.length}
    obj[i] = [];
    for (let j = 0; j < chars.length; j++) {
      let chr = chars[j];
      obj[i][j] = {
        ltr: chr,
        dim: charDim[chr],
        li: i
      };
    }
  }

  let fts = fontSize;
  var interline = fts / 1.2 + spaceBtwLine ;

  // nudge
  push();
  translate(sceneNudgeX, sceneNudgeY)

  // center everything in the canvas
  translate(width / 2 - offX, height / 2 - offY);

  let defaultkern = 12;
  let kern = spaceBtwChar;
  let spaceBetweenChars = 0;

  for (let i = 0; i < obj.length; i++) {
    py = i * interline;
    px = 0;
    let linesoffset =0;
    for (let j = 0; j < obj[i].length; j++) {
      o = obj[i][j];
      let c = o.ltr;
      let l = o.li;


      createL(c, px, py, fts);
      spaceBetweenChars = letKern(c,defaultkern);
      px += o.dim / 10 * fts  + spaceBetweenChars + kern;
    }
  }
  pop();
  let pt1 = minX * glyphDistortX;
  let pt2 = minY * glyphDistortY;
  let pt3 = maxX * glyphDistortX;
  let pt4 = maxY * glyphDistortY;

  let wB = pt3 - pt1;
  let hB = pt4 - pt2;
  offX = pt1 + wB / 2;
  offY = pt2 + hB / 2;

  htmldom();

}

//sinEngine function borrowed for @kiel_m - http://spacetypegenerator.com/
function sinEngine(xLength, xCounter, yLength, yCounter, speed, slopeN) {
  var sinus = sin((frameCount * speed + xCounter * xLength + yCounter * yLength));
  var sign = (sinus >= 0 ? 1 : -1);
  var sinerSquare = sign * (1 - pow(1 - abs(sinus), slopeN));
  return sinerSquare;
}


//Throw you crazy function in there
function displacerX(x, y) {

  this.amplitude = waveAmplitudeX;
  this.offset = waveDisplaceX;
  this.frequency = waveFrequencyX;
  this.speed = waveSpeedX;
  this.slope = waveSlopeX;
  this.x = x;
  this.y = y;

  xWaver = sinEngine(this.offset, this.x, this.frequency,
    this.y, -this.speed, this.slope) * this.amplitude;

  return xWaver;

}

function displacerY(x, y) {

  this.amplitude = waveAmplitudeY;
  this.offset = waveDisplaceY;
  this.frequency = waveFrequencyY;
  this.speed = waveSpeedY;
  this.slope = waveSlopeY;
  this.x = x;
  this.y = y;

  yWaver = sinEngine(this.offset, this.x, this.frequency,
    this.y, -this.speed, this.slope) * this.amplitude;



  return yWaver;


  // return sin(this.movey.a * y / this.movey.b + millis() / this.movey.c) *
  //             this.movey.d / (this.movey.e * this.movey.f)

}

function createL(t, x, y, s) {

  this.vari = sceneVariations;
  this.txtS = t;
  this.hasdot = checkerT(t);
  this.hcnt = 0;
  this.tol = 15;
  this.break = 0;
  this.breakb = 0;
  this.points = ft.textToPoints(this.txtS, x / 100, y / 100, s / 100, {
    sampleFactor: 14,
    simplifyThreshold: 0,
  });


  for (let i = 0; i < this.points.length; i++) {

    let pt = this.points[i];

    checkerP(pt);

    if (i < this.points.length - 1) {
      if (dist(this.points[i].x, this.points[i].y,
          this.points[i + 1].x, this.points[i + 1].y) <
        this.tol / 100) {} else {
        if (this.hcnt == 0) {
          this.break = i + 1;
          this.hcnt += 1;
        } else {
          if (this.hcnt != 0) {
            this.breakb = i + 1;
          }
        }
      }
    }
  };

  // No break, "one-line" letter
  if (this.break == 0 && this.breakb == 0) {
    // console.log('case 1');
    push();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );

    }
    endShape(CLOSE);
    pop();

  }

  // the letter begin with the break
  if (this.break < this.points.length / 2 && this.hcnt != 0 && this.breakb == 0) {
    // console.log('case 2');

    push();
    beginShape();
    for (let i = this.break; i < this.points.length; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );

    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y, this.vari);
      let yy = checkerY(lt.x, lt.y, this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );

    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }
  // the letter finish with the break
  if (this.break > this.points.length / 2 && this.breakb == 0 && this.hasdot != true) {
    // console.log('case 3');
    push();
    beginShape();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );

    }

    beginContour();
    for (let i = this.break; i < this.points.length; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );

    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }
  // the letter has a second break AND a dot
  if (this.break > this.points.length / 2 && this.breakb != 0 && this.hasdot == true) {
    // console.log('case 4');

    push();
    beginShape();
    for (let i = this.breakb; i < this.points.length; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);
      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    endContour(CLOSE);

    beginContour();
    for (let i = this.break; i < this.breakb; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }

  if (this.break < this.points.length / 2 && this.breakb != 0 && this.hasdot == true) {
    // console.log('case 5');

    push();
    beginShape();
    for (let i = this.breakb; i < this.points.length; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);
      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    endContour(CLOSE);

    beginContour();
    for (let i = this.break; i < this.breakb; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }

  if (this.break > this.points.length / 2 && this.breakb != 0 && this.hasdot != true) {
    // console.log('case 6');

    push();
    beginShape();
    for (let i = this.breakb; i < this.points.length; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);
      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    endContour(CLOSE);

    beginContour();
    for (let i = this.break; i < this.breakb; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }

  if (this.break < this.points.length / 2 && this.breakb != 0 && this.hasdot != true) {
    // console.log('case 7');

    push();
    beginShape();
    for (let i = this.breakb; i < this.points.length; i++) {
      let lt = this.points[i];
      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);
      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(
        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)

      );
    }
    endContour(CLOSE);

    beginContour();
    for (let i = this.break; i < this.breakb; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x, lt.y,this.vari);
      let yy = checkerY(lt.x, lt.y,this.vari);

      vertex(
        lt.x * glyphDistortX + displacerX(xx, yy),
        lt.y * glyphDistortY + displacerY(xx, yy)
      );
    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
