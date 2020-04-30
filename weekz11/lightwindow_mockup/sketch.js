// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// https://www.youtube.com/watch?v=z0YFFg_nBjw

// For more:
// https://github.com/CodingTrain/QuadTree


let particles = [];
let maskpg;
let cnv, text;

let margin = 40;

let isMobile = false;
let isAndroid = false;

let mask_backgroundcol = 0;


function preload() {
maskimg = loadImage('test/mask4.png');

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    isAndroid = true;
  }

}

function centerCanvas() {
  var cnv_x = (windowWidth - width) / 2;
  var cnv_y = (windowHeight - height) / 3;
  cnv.position(cnv_x, cnv_y);
}


function texttitle() {
  text = createDiv('Light Window Mockup');

  text.class("didacticcenter");
  text.center('horizontal');

}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  centerCanvas();
  maskpg = createGraphics(windowWidth, windowHeight);
  masker();



}


function masker() {
  maskpg.background(255);
  maskpg.noStroke();
  maskpg.fill(0);
  maskpg.rectMode(CENTER);
  maskpg.rect(width/2, height/2, width, 600);
}

function draw() {
  blendMode(BLEND);
  background(23, 73, 219);//224, 58, 86 //23, 73, 219
//blendMode(ADD);

  let boundary = new Rectangle(width / 2, height / 2, width, height);
  let qtree = new QuadTree(boundary, 1);

  for (let p of particles) {
    let point = new Point(p.position.x, p.position.y, p);
    qtree.insert(point);
    // qtree.show();
    p.colour();
    p.move();
    p.render();
    p.edges();
    p.setHighlight(false);

  }

  for (let p of particles) {
    let range = new Circle(p.position.x, p.position.y, p.r * 2);
    let points = qtree.query(range);
    for (let point of points) {
      let other = point.userData;
      // for (let other of particles) {
      if (p !== other && p.intersects(other)) {
        p.setHighlight(true);
      }
    }
  }
  //blendMode(BLEND);
 image(pgMask(maskpg), 0, 0);
}

function pgMask(_mask) {
  //Create the mask as image
  var img = createImage(_mask.width, _mask.height);
  img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
  //load pixels
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // 0 red, 1 green, 2 blue, 3 alpha
    // Assuming that the mask image is in grayscale,
    // the red channel is used for the alpha mask.
    // the color is set to black (rgb => 0) and the
    // alpha is set according to the pixel brightness.
    var v = img.pixels[i];
    img.pixels[i] = mask_backgroundcol;
    img.pixels[i + 1] = mask_backgroundcol;
    img.pixels[i + 2] = mask_backgroundcol;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();
  return img;
}

//
// function windowResized() {
//   text.remove();
//   texttitle();
//   centerCanvas();
//   //img.position((windowWidth - width) / 2, windowHeight - (windowHeight/6));
//
//   // img.position(windowWidth- ((windowWidth - width) / 8) - (width)+ margin, (windowHeight - height) / 2);
// }

function mousePressed() {

  for (let i = 0; i < 5; i++) {
   particles[i] = new Particle(random(width), random(height));
  }

  if (mouseX > width / 3 && mouseX < width - (width / 3) && mouseY > 0 && mouseY < 70 && isMobile == false) {
    let fs = fullscreen();
    fullscreen(!fs);
    console.log(isMobile);
    //Remove vert scroll bar in fullScreen
    document.body.scrollTop = 0; // <-- pull the page back up to the top
    document.body.style.overflow = 'hidden';
  }

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 70 && isAndroid == true) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maskpg.resizeCanvas(windowWidth, windowHeight);
  masker();
}
