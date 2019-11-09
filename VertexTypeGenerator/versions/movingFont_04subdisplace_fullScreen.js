var ft;
var points = [];
var minX, minY;
var maxX, maxY;
var offX = 0;
var offY = 0;
var charDim = [];
let sty = false;
let hi = false;
let obj = [];
let px, py;

function loadChar(font) {
  let s = str('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789éàâè.:,;!?/ (){}[]=');
  let len = int(s.length);
  let ft = font;
  let fts = 10;
  for (i = 0; i < len; i++) {
    let char = s.charAt(i);
    charDim[char] = bounds(char, 0, 0, fts, ft);
  }
}

function bounds(t, x, y, s, font) {
  let char = str(t);
  let ft = font;
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
  } else if (c == 'E') {
    space = 1.8 * kern;}
    else {
    space = kern;
  }

  return space

}

function preload() {
  ft = loadFont('data/AtlasGrotesk-Bold.otf');
}


function setup() {
  createCanvas(windowWidth, windowHeight,);
  frameRate(24);
  smooth(1);
  // rectMode(CENTER);
  stroke(255);
  noFill();
  strokeWeight(1.5);
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

  // let s = str(inp.value());
  let s = str('HEY');
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
  var interline = fts / 1.2;

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

  // push();
  // strokeWeight(10);
  // stroke('RED');
  // point( pt1,pt2);
  // stroke('GREEN');
  // point(pt1,pt4);
  // stroke('YELLOW');
  // point(pt3,pt2);
  // stroke('PINK');
  // point(pt3,pt4);
  //
  // stroke('PURPLE');
  // point(offX,offY);


  htmldom();

  if (hi == true) {
      push();
      let dimx = width/2;
      let dimy = height/3;
      translate(width/2-dimx/2,height/2-dimy/2)
      fill(backgroundColor);
      stroke(fontColor);
      strokeWeight(1.5);
      rect(0,0,dimx,dimy);
      // createP('Hello World!').position(25, 25).style('display','inline')
      pop();
  } else if (hi == false){


  }


}

//sinEngine function borrowed for @kiel_m - http://spacetypegenerator.com/
function sinEngine(xLength, xCounter, yLength, yCounter, speed, slopeN) {
  var sinus = sin((frameCount * speed + xCounter * xLength + yCounter * yLength));
  var sign = (sinus >= 0 ? 1 : -1);
  var sinerSquare = sign * (1 - pow(1 - abs(sinus), slopeN));
  return sinerSquare;
}


//Throw you crazy function in there
function displacerX(x, y,) {

  this.amplitude = waveAmplitudeX;
  this.offset = waveDisplaceX;
  this.frequency = waveFrequencyX;
  this.speed = waveSpeedX;
  this.slope = waveSlopeX;
  this.subvar = sceneSubVariations;
  this.x = x;
  this.y = y;

  xWaver = sinEngine(this.offset, this.x, this.frequency,
    this.y, -this.speed, this.slope) * this.amplitude;

  return xWaver;

}



function displacerY(x, y,) {


  this.amplitude = waveAmplitudeY;
  this.offset = waveDisplaceY;
  this.frequency = waveFrequencyY;
  this.speed = waveSpeedY;
  this.slope = waveSlopeY;
  this.subvar = sceneSubVariations;
  this.x = x;
  this.y = y;

  yWaver = sinEngine(this.offset, this.x, this.frequency,
    this.y, -this.speed, this.slope) * this.amplitude;



  return yWaver;


  // return sin(this.movey.a * y / this.movey.b + millis() / this.movey.c) *
  //             this.movey.d / (this.movey.e * this.movey.f)

}

function checkerSty() {

  if (sty == true) {
    sty = false
  } else {
    sty = true
  }

}

function checkerHello() {

  if (hi == true) {
    hi = false
  } else {
    hi = true
  }

}

function checkerP(pt) {

  if (pt.x < minX) {
    minX = pt.x
  }
  if (pt.y < minY) {
    minY = pt.y
  }
  if (pt.x > maxX) {
    maxX = pt.x
  }
  if (pt.y > maxY) {
    maxY = pt.y
  }
}

function checkerIdx(ptx,idmax){

  let idx = map(ptx,minX,maxX,0,idmax)
  return idx

}

function checkerIdy(pty,idmax){

  let idy = map(pty,minY,maxY,0,idmax)
  return idy

}


function checkerX(x, y, value) {
  this.value = value;

  if (this.value == 1 || this.value == 3) {
    return y
  }

  if (this.value == 2 || this.value == 4) {
    return x
  }

}

function checkerY(x, y, value) {
  this.value = value;

  if (this.value == 1 || this.value == 2) {
    return y
  }

  if (this.value == 3 || this.value == 4) {
    return x
  }
}

function checkerT(t) {

  if (t === 'i' ||
    t === 'j' ||
    t === 'é' ||
    t === 'è' ||
    t === 'ê' ||
    t === 'à' ||
    t === 'î' ||
    t === 'ú' ||
    t === 'ô' ||
    t === 'â' ||
    t === 'É' ||
    t === 'Ê' ||
    t === 'Â' ||
    t === '?' ||
    t === '!' ||
    t === ':' ||
    t === ';' ||
    t === '=' ||
    t === '¿' ||
    t === '±' ||
    t === '“' ||
    t === '¡' ||
    t === 'ﬁ' ||
    t === '≈' ||
    t === '«' ||
    t === '»' ||
    t === 'Ô' ||
    t === 'Ú' ||
    t === 'À' ||
    t === 'È' ||
    t === 'Î' ||
    t === '÷'

  ) {
    return true;
  }

}

function createL(t, x, y, s) {

  this.vari = sceneVariations;
  this.idmax = 30;
  this.subvari = sceneSubVariations;
  this.txtS = t;
  this.hasdot = checkerT(t);
  this.hcnt = 0;
  this.tol = 20;
  this.break = 0;
  this.breakb = 0;
  this.points = ft.textToPoints(this.txtS, x / 100, y / 100, s / 100, {
    sampleFactor: 20,
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
      let ii = checkerIdx(lt.x,this.idmax);
      let jj = checkerIdy(lt.y,this.idmax);
      let offset = 0;

        let offmax = map(cos(frameCount*0.05),-1,1,1,6);
        let max = map(sin(ii%31/(2)),-1,1,0,10);
        offset = map(sin(frameCount*waveSpeedY),-1,1,-max,max);



      vertex(

        lt.x * glyphDistortX + displacerX(xx, yy, ),
        lt.y * glyphDistortY + displacerY(xx, yy, )+ offset

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

function dlPNG(){
    save('movingType.png');
}

function resetSliders(){

glyphDistortXslider.value(100);
glyphDistortYslider.value(100);

waveAmplitudeXslider.value(60);
waveAmplitudeYslider.value(30);

waveDisplaceXslider.value(0.26);
waveDisplaceYslider.value(0.26);

waveFrequencyXslider.value(0.2);
waveFrequencyYslider.value(0.2);

waveSpeedXslider.value(0.05);
waveSpeedYslider.value(0.05);

waveSlopeXslider.value(1.2);
waveSlopeYslider.value(1.2);
//
// // charOffsetX = charOffsetXslider.value();
// // charOffsetY = charOffsetYslider.value();
//
sceneNudgeXslider.value(0);
sceneNudgeYslider.value(0);

fontSizeslider.value(200);
scenevariationsslider.value(1);
scenesubvariationsslider.value(0);

spaceBtwLineslider.value(0);
spaceBtwCharslider.value(0);


}

function iniSliders(){

glyphDistortX = glyphDistortXslider.value();
glyphDistortY = glyphDistortYslider.value();

waveAmplitudeX = waveAmplitudeXslider.value();
waveAmplitudeY = waveAmplitudeYslider.value();

waveDisplaceX = waveDisplaceXslider.value();
waveDisplaceY = waveDisplaceYslider.value();

waveFrequencyX = waveFrequencyXslider.value();
waveFrequencyY = waveFrequencyYslider.value();

waveSpeedX = waveSpeedXslider.value();
waveSpeedY = waveSpeedYslider.value();

waveSlopeX = waveSlopeXslider.value();
waveSlopeY = waveSlopeYslider.value();
//
// // charOffsetX = charOffsetXslider.value();
// // charOffsetY = charOffsetYslider.value();
//
sceneNudgeX = sceneNudgeXslider.value();
sceneNudgeY = sceneNudgeYslider.value();

fontSize = fontSizeslider.value();
sceneVariations = scenevariationsslider.value();
sceneSubVariations = scenesubvariationsslider.value();

spaceBtwLine = spaceBtwLineslider.value();
spaceBtwChar = spaceBtwCharslider.value();

fontColor = fontColorpicker.value();
backgroundColor = backgroundColorpicker.value();

}

function htmldom() {

  glyphDistortXsliderdom.html(glyphDistortX);
  glyphDistortYsliderdom.html(glyphDistortY);

  waveAmplitudeXsliderdom.html(waveAmplitudeX);
  waveAmplitudeYsliderdom.html(waveAmplitudeY);

  waveDisplaceXsliderdom.html(waveDisplaceX.toFixed(2));
  waveDisplaceYsliderdom.html(waveDisplaceY.toFixed(2));

  waveFrequencyXsliderdom.html(waveFrequencyX);
  waveFrequencyYsliderdom.html(waveFrequencyY);

  waveSpeedXsliderdom.html(waveSpeedX);
  waveSpeedYsliderdom.html(waveSpeedY);

  waveSlopeXsliderdom.html(waveSlopeX);
  waveSlopeYsliderdom.html(waveSlopeY);

  sceneNudgeXsliderdom.html(sceneNudgeX);
  sceneNudgeYsliderdom.html(sceneNudgeY);

  fontSizesliderdom.html(fontSize);
  scenevariationssliderdom.html(sceneVariations);
  scenesubvariationssliderdom.html(sceneSubVariations.toFixed(2))

  spaceBtwLinesliderdom.html(spaceBtwLine);
  spaceBtwCharsliderdom.html(spaceBtwChar);

}

function controls() {

  let domx = 120;
  let domy = 36
  let subdomy = 12;

  glyphDistortXslider = createSlider(10, 300, 100, 1);
  glyphDistortXslider.position(25, 30);
  glyphDistortXslider.style('width', '100px');
  createP('Glyph X').position(25, 5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  glyphDistortXsliderdom = createP('').position(100, 5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  glyphDistortYslider = createSlider(10, 300, 100, 1);
  glyphDistortYslider.position(25, 30+domy);
  glyphDistortYslider.style('width', '100px');
  createP('Glyph Y').position(25, 5+domy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  glyphDistortYsliderdom = createP('').position(100, 5+domy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  waveAmplitudeXslider = createSlider(0, 100, 0, 1);
  waveAmplitudeXslider.position(25, 30+domy*2+subdomy);
  waveAmplitudeXslider.style('width', '100px');
  createP('WaveAmp X').position(25, 5+domy*2+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveAmplitudeXsliderdom = createP('').position(100, 5+domy*2+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  waveAmplitudeYslider = createSlider(0, 100, 0, 1);
  waveAmplitudeYslider.position(25, 30+domy*3+subdomy);
  waveAmplitudeYslider.style('width', '100px');
  createP('WaveAmp Y').position(25, 5+domy*3+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveAmplitudeYsliderdom = createP('').position(100, 5+domy*3+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  waveDisplaceXslider = createSlider(-PI, PI, .26, 0.01);
  waveDisplaceXslider.position(25, 30+domy*4+subdomy*2);
  waveDisplaceXslider.style('width', '100px');
  createP('WaveOff X').position(25, 5+domy*4+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveDisplaceXsliderdom = createP('').position(100, 5+domy*4+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  waveDisplaceYslider = createSlider(-PI, PI, .26, 0.01);
  waveDisplaceYslider.position(25, 30+domy*5+subdomy*2);
  waveDisplaceYslider.style('width', '100px');
  createP('WaveOff Y').position(25, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveDisplaceYsliderdom = createP('').position(100, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  waveFrequencyXslider = createSlider(0, PI, 0.2, 0.1);
  waveFrequencyXslider.position(25, 30+domy*6+subdomy*3);
  waveFrequencyXslider.style('width', '100px');
  createP('WaveFreq X').position(25, 5+domy*6+subdomy*3)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveFrequencyXsliderdom = createP('').position(100, 5+domy*6+subdomy*3)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  waveFrequencyYslider = createSlider(0, PI, 0.2, 0.1);
  waveFrequencyYslider.position(25, 30+domy*7+subdomy*3);
  waveFrequencyYslider.style('width', '100px');
  createP('WaveFreq Y').position(25, 5+domy*7+subdomy*3)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveFrequencyYsliderdom = createP('').position(100, 5+domy*7+subdomy*3)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  waveSpeedXslider = createSlider(0, 0.3, 0.05, 0.01);
  waveSpeedXslider.position(25, 30+domy*8+subdomy*4);
  waveSpeedXslider.style('width', '100px');
  createP('WaveSpeed X').position(25, 5+domy*8+subdomy*4)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveSpeedXsliderdom = createP('').position(100, 5+domy*8+subdomy*4)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  waveSpeedYslider = createSlider(0, 0.3, 0.05, 0.01);
  waveSpeedYslider.position(25, 30+domy*9+subdomy*4);
  waveSpeedYslider.style('width', '100px');
  createP('WaveSpeed Y').position(25, 5+domy*9+subdomy*4)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveSpeedYsliderdom = createP('').position(100, 5+domy*9+subdomy*4)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  waveSlopeXslider = createSlider(0, 4, 1.2, 0.1);
  waveSlopeXslider.position(25, 30+domy*10+subdomy*5);
  waveSlopeXslider.style('width', '100px');
  createP('WaveSlope X').position(25, 5+domy*10+subdomy*5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveSlopeXsliderdom = createP('').position(100, 5+domy*10+subdomy*5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  waveSlopeYslider = createSlider(0, 4, 1.2, 0.1);
  waveSlopeYslider.position(25, 30+domy*11+subdomy*5);
  waveSlopeYslider.style('width', '100px');
  createP('WaveSlope Y').position(25, 5+domy*11+subdomy*5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveSlopeYsliderdom = createP('').position(100, 5+domy*11+subdomy*5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  sceneNudgeXslider = createSlider(-width, width, 0, 1);
  sceneNudgeXslider.position(25+domx, 30);
  sceneNudgeXslider.style('width', '100px');
  createP('Nudge X').position(25+domx, 5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  sceneNudgeXsliderdom = createP('').position(100+domx, 5)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  sceneNudgeYslider = createSlider(-height, height, 0, 1);
  sceneNudgeYslider.position(25+domx, 30+domy);
  sceneNudgeYslider.style('width', '100px');
  createP('Nudge Y').position(25+domx, 5+domy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  sceneNudgeYsliderdom = createP('').position(100+domx, 5+domy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  spaceBtwLineslider = createSlider(-100, 100, 0, 1);
  spaceBtwLineslider.position(25+domx, 30+domy*2+subdomy);
  spaceBtwLineslider.style('width', '100px');
  createP('LineSpace').position(25+domx, 5+domy*2+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  spaceBtwLinesliderdom = createP('').position(100+domx, 5+domy*2+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  spaceBtwCharslider = createSlider(0, 100, 0, 1);
  spaceBtwCharslider.position(25+domx, 30+domy*3+subdomy);
  spaceBtwCharslider.style('width', '100px');
  createP('GlyphSpace').position(25+domx, 5+domy*3+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  spaceBtwCharsliderdom = createP('').position(100+domx, 5+domy*3+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  fontSizeslider = createSlider(85, 600, 300, 1);
  fontSizeslider.position(25+domx, 30+domy*4+subdomy*2);
  fontSizeslider.style('width', '100px');
  createP('Font Size').position(25+domx, 5+domy*4+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  fontSizesliderdom = createP('').position(100+domx, 5+domy*4+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  scenevariationsslider = createSlider(1, 4, 1, 1);
  scenevariationsslider.position(25+domx, 30+domy*5+subdomy*2);
  scenevariationsslider.style('width', '40px');
  createP('Var').position(25+domx, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  scenevariationssliderdom = createP('').position(55+domx, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  scenesubvariationsslider = createSlider(0, 100, 0, 1);
  scenesubvariationsslider.position(80+domx, 30+domy*5+subdomy*2);
  scenesubvariationsslider.style('width', '40px');
  createP('SubVar').position(70+domx, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  scenesubvariationssliderdom = createP('').position(120+domx, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');


  fNoS = createButton('Fill / Stroke');
  fNoS.position(25+domx, domy*7.5);
  fNoS.mousePressed(checkerSty);

  spng = createButton('Save PNG');
  spng.position(25+domx, domy*8.5);
  spng.mousePressed(dlPNG);

  ssvg = createButton('Save SVG');
  ssvg.position(25+domx, domy*9.5);
  ssvg.mousePressed(dlPNG);

  reset = createButton('Reset');
  reset.position(25+domx, domy*10.5);
  reset.mousePressed(resetSliders);

  hello = createButton('Hello!');
  hello.position(25+domx, domy*13.3);
  hello.mousePressed(checkerHello);

  fontColorpicker = createColorPicker('WHITE');
  fontColorpicker.position(25+domx, domy*11.5);
  fontColorpicker.style('width', '20px');

  backgroundColorpicker = createColorPicker('BLUE');
  backgroundColorpicker.position(60+domx, domy*11.5);
  backgroundColorpicker.style('width', '20px');


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
