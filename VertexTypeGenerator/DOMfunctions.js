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

sceneNudgeXslider.value(0);
sceneNudgeYslider.value(0);

fontSizeslider.value(200);
scenevariationsslider.value(1);

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

sceneNudgeX = sceneNudgeXslider.value();
sceneNudgeY = sceneNudgeYslider.value();

fontSize = fontSizeslider.value();
sceneVariations = scenevariationsslider.value();

spaceBtwLine = spaceBtwLineslider.value();
spaceBtwChar = spaceBtwCharslider.value();

fontColor = fontColorpicker.value();
backgroundColor = backgroundColorpicker.value();

}

function htmldom() {

  // glyphDistortXsliderdom.html(glyphDistortX);
  // glyphDistortYsliderdom.html(glyphDistortY);
  //
  // waveAmplitudeXsliderdom.html(waveAmplitudeX);
  // waveAmplitudeYsliderdom.html(waveAmplitudeY);
  //
  // waveDisplaceXsliderdom.html(waveDisplaceX.toFixed(2));
  // waveDisplaceYsliderdom.html(waveDisplaceY.toFixed(2));
  //
  // waveFrequencyXsliderdom.html(waveFrequencyX);
  // waveFrequencyYsliderdom.html(waveFrequencyY);
  //
  // waveSpeedXsliderdom.html(waveSpeedX);
  // waveSpeedYsliderdom.html(waveSpeedY);
  //
  // waveSlopeXsliderdom.html(waveSlopeX);
  // waveSlopeYsliderdom.html(waveSlopeY);
  //
  // sceneNudgeXsliderdom.html(sceneNudgeX);
  // sceneNudgeYsliderdom.html(sceneNudgeY);
  //
  // fontSizesliderdom.html(fontSize);
  // scenevariationssliderdom.html(sceneVariations);
  // // scenesubvariationssliderdom.html(sceneSubVariations)
  //
  // spaceBtwLinesliderdom.html(spaceBtwLine);
  // spaceBtwCharsliderdom.html(spaceBtwChar);

}

function controls() {

  let domx = 120;
  let domy = 36
  let subdomy = 12;

  glyphDistortXslider = createSlider(10, 300, 100, 1).
  position(25, 30).style('width', '100px');
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

  waveAmplitudeXslider = createSlider(0, 100, 60, 1);
  waveAmplitudeXslider.position(25, 30+domy*2+subdomy);
  waveAmplitudeXslider.style('width', '100px');
  createP('WaveAmp X').position(25, 5+domy*2+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveAmplitudeXsliderdom = createP('').position(100, 5+domy*2+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  waveAmplitudeYslider = createSlider(0, 100, 30, 1);
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

  waveFrequencyXslider = createSlider(0, PI, 0.2, 0.01);
  waveFrequencyXslider.position(25, 30+domy*6+subdomy*3);
  waveFrequencyXslider.style('width', '100px');
  createP('WaveFreq X').position(25, 5+domy*6+subdomy*3)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  waveFrequencyXsliderdom = createP('').position(100, 5+domy*6+subdomy*3)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  waveFrequencyYslider = createSlider(0, PI, 0.2, 0.01);
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

  spaceBtwCharslider = createSlider(0, 100, 5, 1);
  spaceBtwCharslider.position(25+domx, 30+domy*3+subdomy);
  spaceBtwCharslider.style('width', '100px');
  createP('GlyphSpace').position(25+domx, 5+domy*3+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  spaceBtwCharsliderdom = createP('').position(100+domx, 5+domy*3+subdomy)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  fontSizeslider = createSlider(85, 600, 200, 1);
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
  scenevariationsslider.style('width', '100px');
  createP('Variations').position(25+domx, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');
  scenevariationssliderdom = createP('').position(100+domx, 5+domy*5+subdomy*2)
  .style('color','#ffffff').style('font-size','11px')
  .style('font-family','Courier');

  fontColorpicker = createColorPicker('WHITE');
  fontColorpicker.position(25+domx, domy*11.5);
  fontColorpicker.style('width', '20px');

  backgroundColorpicker = createColorPicker('BLACK');
  backgroundColorpicker.position(60+domx, domy*11.5);
  backgroundColorpicker.style('width', '20px');

  fNoS = createButton('Fill / Stroke');
  fNoS.position(25+domx, domy*7.5);
  fNoS.mousePressed(checkerSty);

  spng = createButton('Save PNG');
  spng.position(25+domx, domy*8.5);
  spng.mousePressed(dlPNG);

  ssvg = createButton('Save GIF');
  ssvg.position(25+domx, domy*9.5);
  ssvg.mousePressed(dlMP4);

  reset = createButton('Reset');
  reset.position(25+domx, domy*10.5);
  reset.mousePressed(resetSliders);

  uploadFont = createButton('Upload Font');
  uploadFont.position(25+domx, domy*12.75);
  uploadFont.mousePressed(uploadFt);

  readMebutton = createButton('Read Me');
  readMebutton.position(25+domx, domy*13.5);
  readMebutton.mousePressed(readMe);

}
