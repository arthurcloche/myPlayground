let ft;
let points = [];
let minX,minY;
let maxX,maxY;
let offX = 0;
let offY = 0;
let sty = true;
let inp, drop;




function preload() {
  ft = loadFont('data/MaisonMono-Bold.otf');
}



function setup() {

  createCanvas(800, 400,SVG);
  frameRate(24);
  smooth(1);
  rectMode(CENTER);
  controls();
  // noLoop();

  inp = select("#textfield");
  // drop = select("#dropzone");
  //
  // drop.dragOver(highlight);
  // drop.dragLeave(unhighlight);
  // drop.drop(gotFile,highlight);

}
// function highlight(){
//   drop.style('background-color','#fff');
// }
// function unhighlight(){
//   drop.style('background-color','');
// }
//
// function gotFile(file){
//   ft = file;
//   setup();
//   draw();
// console.log('got file !')
// }

function draw() {
  clear();
  background('BLUE');

  if (sty == true){
    noStroke();
    fill(255);

  }

  if (sty == false){
    stroke(255);
    noFill();
    strokeWeight(1.5);

  }



  minX = minY = 99999;
  maxX = maxY = -99999;

  let s=str(inp.value());
  let l=int(s.length);
  let fts = ftsze.value();
  let offinc = fts/2;


  // nudge
  let afxoff = dax.value()/100;
  let afyoff = dafy.value()/100;

  translate(tslx.value(),tsly.value())
  translate(offX,offY);

  let lines = 0;


  push();
  // creating the letters
    for (let m = 0; m <copsx.value()+1; m++){
      let copxoff = offinc*afxoff*l+(copsxoff.value()*m)+fts/10;

      for(let n = 0; n < copsy.value()+1; n++){
      let copyoff = ((fts*0.75)*n)*afyoff+(copsyoff.value())*n;
      translate((copsy.value()*offinc)*krnx.value(),0);
      for (let t = 0; t < l; t++){

        let c = s.charAt(t);
         if (c == '\n'){
           c = '';
           lines += 1;
           copyoff += fts*0.75;
         }

         let x = m*copxoff+(afxoff+(fts*krn.value()*t*1.05));
         let y = fts/1.5*afyoff+copyoff+(fts*krny.value()*t);

        createL(c,x,y,fts);

  }

  }
}
pop();

let pt1 = minX*100* dax.value()/100 ;
let pt2 = minY*100* dafy.value()/100 ;
let pt3 = maxX*100* dax.value()/100 ;
let pt4 = maxY*100* dafy.value()/100 ;

let wB = pt3-pt1;
let hB = pt4-pt2;

offX = width/2 - wB / 2;
offY = height/2 - hB / 2;

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
//
//
// pop();


htmldom();

}


function sinEngine(xLength, xCounter, yLength, yCounter, speed, slopeN) {
var sinus = sin((frameCount*speed + xCounter*xLength + yCounter*yLength));
var sign = (sinus >= 0 ? 1: -1);
var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
return sinerSquare;
}



function displacerX(x,y){

  this.yWave = dbx.value();
  this.offset = dcx.value();
  this.ribbonOffset = ddx.value();
  this.k = copsy.value();
  this.speed = dex.value();
  this.slope = dfx.value();

  yWaver = sinEngine(this.offset, x, this.ribbonOffset,
                     x, -this.speed, this.slope ) * this.yWave;

  return yWaver;

}



function displacerY(x,y){


  this.yWave = dby.value();
  this.offset = dcy.value();
  this.ribbonOffset = ddy.value();
  this.k = copsy.value();
  this.speed = dey.value();
  this.slope = dfy.value();

  yWaver = sinEngine(this.offset, y, this.ribbonOffset,
                     y, -this.speed, this.slope ) * this.yWave;



  return yWaver;


// return sin(this.movey.a * y / this.movey.b + millis() / this.movey.c) *
//             this.movey.d / (this.movey.e * this.movey.f)

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

function checkerX(x,y){

  if(this.vari == 1 || this.vari == 3){
  return y
  }

  if(this.vari == 2 || this.vari == 4 ){
  return x
  }

}

function checkerY(x,y){

  if(this.vari == 1 || this.vari == 2){
  return y
  }

  if(this.vari == 3 || this.vari == 4 ){
  return x
  }
}

function checkerT(t){

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

  this.vari = variations.value();
  this.txtS = t;
  this.hasdot = checkerT(t);
  this.hcnt = 0;
  this.tol = 10;
  this.break = 0;
  this.breakb = 0;
  this.points = ft.textToPoints(this.txtS, x / 100, y / 100, s / 100, {
    sampleFactor: 32,
    simplifyThreshold: 0,
  });


  for (let i = 0; i < this.points.length; i++) {

      let pt = this.points[i];

      checkerP(pt);

      if (i < this.points.length - 1) {
      if (dist(this.points[i].x, this.points[i].y,
          this.points[i + 1].x, this.points[i + 1].y) <
          this.tol / 100)  {
            // console.log('all good buddy !')
          } else {
              if (this.hcnt == 0) {
              this.break = i + 1;
              this.hcnt += 1;
          // console.log('went over !')
          } else {
              if (this.hcnt != 0) {
          // console.log('went over 2nd time !')
              this.breakb = i + 1;

              } } } } }

      // No break, "one-line" letter
  if (this.break == 0 && this.breakb == 0) {
    // console.log('case 1');
    push();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let lt = this.points[i];


      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

      );

    }
    endShape(CLOSE);
    pop();

  }

    // the letter begin with the break
  if (this.break < this.points.length / 2 && this.breakb == 0 && this.hcnt != 0 ) {
    // console.log('case 2');

    push();
    beginShape();
    for (let i = this.break; i < this.points.length; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);



      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

      );

    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

      );

    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }
    // the letter finish with the break
  if (this.break > this.points.length / 2 && this.breakb == 0 && this.hcnt != 0 ) {
    // console.log('case 3');

    push();
    beginShape();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

      );

    }

    beginContour();
    for (let i = this.break; i < this.points.length; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

      );

    }
    endContour(CLOSE);
    endShape(CLOSE);
    pop();

  }
    // the letter has a second break OR a dot
  if (this.break > this.points.length / 2 && this.breakb != 0 ) {
    // console.log('case 4');

    push();

    beginShape();
    for (let i = this.breakb; i < this.points.length; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

      );
    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

      );
    }
    endContour(CLOSE);

    beginContour();
    for (let i = this.break; i < this.breakb; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx,yy),
        lt.y * dafy.value() + displacerY(xx,yy)

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

function dlSVG(){
    save('movingType.svg');
}

function checkerSty (){

    if (sty == true){
      sty = false
    } else {
      sty = true
    }

}

function htmldom() {

  axdom.html(dax.value());
  aydom.html(dafy.value());

  bxdom.html(dbx.value());
  bydom.html(dby.value());

  cxdom.html(dcx.value());
  cydom.html(dcy.value());

  dxdom.html(ddx.value());
  dydom.html(ddy.value());

  exdom.html(dex.value());
  eydom.html(dey.value());

  fxdom.html(dfx.value());
  fydom.html(dfy.value());

  tslxdom.html(tslx.value());
  tslydom.html(tsly.value());

  ftszedom.html(ftsze.value());
  variadom.html(variations.value());

  copsydom.html(copsy.value());
  copsyoffdom.html(copsyoff.value());

  copsxdom.html(copsx.value());
  copsxoffdom.html(copsxoff.value());

  krnxdom.html(krnx.value());
  krnydom.html(krny.value());

  krndom.html(krn.value());
  subdisdom.html(subdis.value());
}

function controls() {

  let domoffx = 140;
  let domoffy = 100;

  // Deform a for x
  dax = createSlider(10, 300, 100, 1);
  dax.position(20, height + 35);
  createP('Glyph x% = ').position(20, height);
  axdom = createP('').position(100, height);

  // Deform a for y
  dafy = createSlider(10, 300, 100, 1);
  dafy.position(20, height + 60);
  createP('Glyph y% = ').position(20, height+60);
  aydom = createP('').position(100, height+60);

  // Deform b for x
  dbx = createSlider(0, 100, 96, 1);
  dbx.position(20+domoffx, height + 35);
  createP('WaveY x = ').position(20+domoffx, height);
  bxdom = createP('').position(100+domoffx, height);

  // Deform b for y
  dby = createSlider(0, 100, 96, 1);
  dby.position(20+domoffx, height + 60);
  createP('WaveY y = ').position(20+domoffx, height+60);
  bydom = createP('').position(100+domoffx, height+60);

  // Deform c for x
  dcx = createSlider(0, PI, .26, 0.01);
  dcx.position(20+domoffx*2, height + 35);
  createP('offset x = ').position(20+domoffx*2, height);
  cxdom = createP('').position(100+domoffx*2, height);

  // Deform c for y
  dcy = createSlider(0, PI, .26, 0.01);
  dcy.position(20+domoffx*2, height + 60);
  createP('offset y = ').position(20+domoffx*2, height+60);
  cydom = createP('').position(100+domoffx*2, height+60);

  // Deform d for x
  ddx = createSlider(0, PI, 0.2, 0.1);
  ddx.position(20, height + 35 + domoffy);
  createP('Ribb off x = ').position(20, height+domoffy);
  dxdom = createP('').position(100, height+domoffy);

  // Deform d for y
  ddy = createSlider(0, PI, 0.2, 0.1);
  ddy.position(20, height + 60 +domoffy);
  createP('Ribb off y = ').position(20, height+60+domoffy);
  dydom = createP('').position(100, height+60+domoffy);

  // Deform e for x
  dex = createSlider(0, 0.3, 0.01, 0.01);
  dex.position(20+domoffx, height + 35+domoffy);
  createP('speed x = ').position(20+domoffx, height+domoffy);
  exdom = createP('').position(100+domoffx, height+domoffy);

  // Deform e for y
  dey = createSlider(0, 0.3, 0.01, 0.01);
  dey.position(20+domoffx, height + 60+domoffy);
  createP('speed y = ').position(20+domoffx, height+60+domoffy);
  eydom = createP('').position(100+domoffx, height+60+domoffy);

  // Deform f for x - Is made to be linked to a dynamic value
  dfx = createSlider(0, 4, 1, 0.1);
  dfx.position(20+domoffx*2, height + 35+domoffy);
  createP('slope x = ').position(20+domoffx*2, height+domoffy);
  fxdom = createP('').position(100+domoffx*2, height+domoffy);

  // Deform f for y - Is made to be linked to a dynamic value
  dfy = createSlider(0, 4, 1, 0.1);
  dfy.position(20+domoffx*2, height + 60+domoffy);
  createP('slope y = ').position(20+domoffx*2, height+60+domoffy);
  fydom = createP('').position(100+domoffx*2, height+60+domoffy);

  // Nudge x
  tslx = createSlider(-width, width, 0, 1);
  tslx.position(40+domoffx*3, height + 35);
  createP('nudge x = ').position(40+domoffx*3, height);
  tslxdom = createP('').position(120+domoffx*3, height);

  // Nudge y
  tsly = createSlider(-height, height, 0, 1);
  tsly.position(40+domoffx*3, height + 60);
  createP('nudge y = ').position(40+domoffx*3, height+60);
  tslydom = createP('').position(120+domoffx*3, height+60);

  // Fontsize
  ftsze = createSlider(85, 600, 250, 1);
  ftsze.position(40+domoffx*3, height + 35+domoffy);
  createP('font size = ').position(40+domoffx*3, height+domoffy);
  ftszedom = createP('').position(120+domoffx*3, height+domoffy);

  // Variations
  variations = createSlider(1, 4, 1, 1);
  variations.position(40+domoffx*3, height + 60+domoffy);
  createP('variations = ').position(40+domoffx*3, height+60+domoffy);
  variadom = createP('').position(120+domoffx*3, height+60+domoffy);

  // Copies y
  copsy = createSlider(0,5,0,1);
  copsy.position(20, height + 35 + domoffy*2);
  createP('Copies y = ').position(20, height+domoffy*2);
  copsydom = createP('').position(100, height+domoffy*2);

  // Copies y offset
  copsyoff = createSlider(-400,400,0,1);
  copsyoff.position(20, height + 60 +domoffy*2);
  createP('Copy y off = ').position(20, height+60+domoffy*2);
  copsyoffdom = createP('').position(120, height+60+domoffy*2);

  // Copies x
  copsx = createSlider(0,5,0,1);
  copsx.position(20+domoffx, height + 35 + domoffy*2);
  createP('Copies x = ').position(20+domoffx, height+domoffy*2);
  copsxdom = createP('').position(100+domoffx, height+domoffy*2);

  // Copies x offset
  copsxoff = createSlider(-200,200,0,1);
  copsxoff.position(20+domoffx, height + 60 +domoffy*2);
  createP('Copy x off = ').position(20+domoffx, height+60+domoffy*2);
  copsxoffdom = createP('').position(120+domoffx, height+60+domoffy*2);

  // Kerning
  krn = createSlider(0, 1, 0.5, 0.01);
  krn.position(40+domoffx*3, height + 35+domoffy*2);
  createP('kern x = ').position(40+domoffx*3, height+domoffy*2);
  krndom = createP('').position(120+domoffx*3, height+domoffy*2);

  // Subdisplace
  subdis = createSlider(-width, width, 0, 1);
  subdis.position(40+domoffx*3, height + 60+domoffy*2);
  createP('Subdisp rad = ').position(40+domoffx*3, height+60+domoffy*2);
  subdisdom = createP('').position(140+domoffx*3, height+60+domoffy*2);

  // Offset x
  krnx = createSlider(-1, 1, 0, 0.01);
  krnx.position(20+domoffx*2, height + 35 + domoffy*2);
  createP('Offset x = ').position(20+domoffx*2, height+domoffy*2);
  krnxdom = createP('').position(100+domoffx*2, height+domoffy*2);

  // Offset y
  krny = createSlider(-1, 1, 0, 0.01);
  krny.position(20+domoffx*2, height + 60+domoffy*2);
  createP('Offset y = ').position(20+domoffx*2, height+60+domoffy*2);
  krnydom = createP('').position(100+domoffx*2, height+60+domoffy*2);

  spng = createButton('Save PNG');
  spng.position(650, 470);
  spng.mousePressed(dlPNG);

  ssvg = createButton('Save SVG');
  ssvg.position(650, 495);
  ssvg.mousePressed(dlSVG);

  fNoS = createButton('Fill / Stroke');
  fNoS.position(650, 530);
  fNoS.mousePressed(checkerSty);

}
