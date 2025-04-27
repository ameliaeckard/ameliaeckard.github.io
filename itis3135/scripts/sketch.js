let symmetry = 6;
let angle = 360 / symmetry;
let strokeColor = 255;

function setup() {
  let canvas = createCanvas(windowWidth * 0.9, 600);
  canvas.parent("drawing-area");
  angleMode(DEGREES);
  background(0);
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseIsPressed && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    stroke(strokeColor);
    strokeWeight(2);

    for (let i = 0; i < symmetry; i++) {
      rotate(angle);
      line(mx, my, pmx, pmy);
      push();
      scale(1, -1);
      line(mx, my, pmx, pmy);
      pop();
    }
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    background(0);
  }
}
