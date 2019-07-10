var ft;
var points = [];

function preload() {
  ft = loadFont('data/MaisonMono-Bold.otf');
}

function setup() {
  createCanvas(800, 400,P2D);
  frameRate(24);
  smooth(1);
  rectMode(CENTER);
  noStroke(255);
  fill(255);
  strokeWeight(1.5);
  controls();
  // noLoop();

}

function draw() {
  clear();
  background('BLUE');

  let s=str('Helos');
  let l=int(s.length);
  let fts = ftsze.value();
  let offinc = fts/2;

  // trying to center it, need to be working on
  // translate(width/(l*l)-(fts/20)*l,height/2-(fts*copsy.value())/1.5-fts)

  // nudge
  let afxoff = dax.value();
  let afyoff = dafy.value();
  translate(tslx.value(),tsly.value())

  // creating the letters
  for (let m = 0; m <copsx.value()+1; m++){
    let copxoff = m*l*offinc + (copsxoff.value()*m);

    for(let n = 0; n < copsy.value()+1; n++){
    let copyoff = ((fts*0.75)*n)+(copsyoff.value()+6)*n;
    translate((copsy.value()*offinc)*krnx.value(),0);
    for (let t = 0; t < l; t++){
      let c = s.charAt(t);
      createL(c,
              width/2-(fts*0.15*l)-afxoff+copxoff+(fts*krn.value()*t),
              height / 2 + fts-afyoff+copyoff+(fts*krny.value()*t),
              fts);
  }

  }
}

  htmldom();

}

function displacerX(x){

  this.move = {
    a: 25,
    b: dbx.value(),
    c: dcx.value(),
    d: ddx.value(),
    e: dex.value(),
    f: dfx.value(),
  }

  return sin(this.move.a * x / this.move.b + millis() / this.move.c) *
    this.move.d / (this.move.e * this.move.f)


}

function displacerY(y){

this.movey = {
  a: 25,
  b: dby.value(),
  c: dcy.value(),
  d: ddy.value(),
  e: dey.value(),
  f: dfy.value(),
}

return sin(this.movey.a * y / this.movey.b + millis() / this.movey.c) *
            this.movey.d / (this.movey.e * this.movey.f)

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

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

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

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

      );

    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

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

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

      );

    }

    beginContour();
    for (let i = this.break; i < this.points.length; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

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

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

      );
    }
    beginContour();
    for (let i = 0; i < this.break; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

      );
    }
    endContour(CLOSE);

    beginContour();
    for (let i = this.break; i < this.breakb; i++) {
      let lt = this.points[i];

      let xx = checkerX(lt.x,lt.y);
      let yy = checkerY(lt.x,lt.y);

      vertex(

        lt.x * dax.value() + displacerX(xx),
        lt.y * dafy.value() + displacerY(yy)

      );
    }
    endContour(CLOSE);

    endShape(CLOSE);
    pop();

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
  dbx = createSlider(1, 25, 14, 0.1);
  dbx.position(20+domoffx, height + 35);
  createP('amp x = ').position(20+domoffx, height);
  bxdom = createP('').position(100+domoffx, height);

  // Deform b for y
  dby = createSlider(1, 25, 14, 0.1);
  dby.position(20+domoffx, height + 60);
  createP('amp y = ').position(20+domoffx, height+60);
  bydom = createP('').position(100+domoffx, height+60);

  // Deform c for x
  dcx = createSlider(0, 2000, 1000, 10);
  dcx.position(20+domoffx*2, height + 35);
  createP('speed x = ').position(20+domoffx*2, height);
  cxdom = createP('').position(100+domoffx*2, height);

  // Deform c for y
  dcy = createSlider(0, 2000, 1000, 10);
  dcy.position(20+domoffx*2, height + 60);
  createP('speed y = ').position(20+domoffx*2, height+60);
  cydom = createP('').position(100+domoffx*2, height+60);

  // Deform d for x
  ddx = createSlider(-500,500,0,1);
  ddx.position(20, height + 35 + domoffy);
  createP('disp x = ').position(20, height+domoffy);
  dxdom = createP('').position(100, height+domoffy);

  // Deform d for y
  ddy = createSlider(-500,500,0,1);
  ddy.position(20, height + 60 +domoffy);
  createP('disp y = ').position(20, height+60+domoffy);
  dydom = createP('').position(100, height+60+domoffy);

  // Deform e for x
  dex = createSlider(0.1, 1, 0.5, 0.01);
  dex.position(20+domoffx, height + 35+domoffy);
  createP('fact x = ').position(20+domoffx, height+domoffy);
  exdom = createP('').position(100+domoffx, height+domoffy);

  // Deform e for y
  dey = createSlider(0.1, 1, 0.5, 0.01);
  dey.position(20+domoffx, height + 60+domoffy);
  createP('fact y = ').position(20+domoffx, height+60+domoffy);
  eydom = createP('').position(100+domoffx, height+60+domoffy);

  // Deform f for x - Is made to be linked to a dynamic value
  dfx = createSlider(1, 20, 10, 0.1);
  dfx.position(20+domoffx*2, height + 35+domoffy);
  createP('2nd fact x = ').position(20+domoffx*2, height+domoffy);
  fxdom = createP('').position(100+domoffx*2, height+domoffy);

  // Deform f for y - Is made to be linked to a dynamic value
  dfy = createSlider(1, 20, 10, 0.1);
  dfy.position(20+domoffx*2, height + 60+domoffy);
  createP('2nd fact x = ').position(20+domoffx*2, height+60+domoffy);
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
  subdis = createSlider(-10, 10, 0, 0.01);
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


}
