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

function checkerSty() {

  if (sty == true) {
    sty = false
  } else {
    sty = true
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

// function dlSVG(){
//     save('movingType.svg');
// }

function dlPNG(){
    save('movingType.png');
}

function dlMP4(){
    alert("Still working on it, come back soon :)");
}

function uploadFt(){
    alert("Still under development too, sorry :/");
}

function readMe() {
    alert("This is a beta version of kinetic type tool\ni've built using p5.js as an ongoing side project \nduring the year 2019, loads of improvement are to come.\n\nIf you make anything cool with it\nsend it to me info@yokai.agency\nor @a.mehow.c on IG");
}
