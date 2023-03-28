// James Santucci
// Nicholas Brown-Hernandez
// WEB AND FX: FROM THEORY TO PRACTICE section 00003
// Little World
// https://openprocessing.org/sketch/1875215
//you can interact by clicking the mouse to start, after this click again will turn it to night right away. 
//you can use the left and right arrow keys to turn the "sky" black gradually.

//story: Like a powerful being, you watch over a forest you have complete dominion over. 
//The circles are like little mystical animals that seem to follow your influence (mouse) around, 
//searching for a way to get closer to you to hurt you or say hi you have no idea. You control the time of day;
//you can make it instantly night like flicking a switch or gradually turn it a night, almost like mood lighting. 
//However, you are no god; this is simply a terrarium in your house you like to look at, 
//and the little circles must be a figment of your imagination… right?

//assisted by chatgpt

let bgColor;
let targetColor;
const colorIncrement = 5;
let lastColorChange = -Infinity;
let treeImg;
let glassImg;
let plantImg;

const circleSize = 20;

const circles = [];

function preload() {
  treeImg = loadImage('forest.png');
  plantImg = loadImage('plant.png')
  glassImg = loadImage('glass.png');
}

function setup() {
  createCanvas(800, 500);
  bgColor = color('beige');
  targetColor = color(0);

  for (let i = 0; i < 250; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      speed: random(0.5, 2),
      size: random(10, 30),
      color: color(random(150, 255), random(150, 255), random(150, 255)),
      strokeWeight: 2,
      strokeColor: color(random(150, 255), random(150, 255), random(150, 255)),    
    });
  }
}

function draw() {
  if (keyIsPressed && (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW)) {
    targetColor = color(0);
    bgColor = lerpColor(bgColor, targetColor, colorIncrement / 255);
  } else if (mouseIsPressed && millis() - lastColorChange > 1000) {
    bgColor = color(0);
    lastColorChange = millis();
  } else if (millis() - lastColorChange > 1000) {
    targetColor = color('beige');
    bgColor = lerpColor(bgColor, targetColor, colorIncrement / 255);
  }

  background(bgColor);
  image(glassImg, 0, 0, width, height);
  image(treeImg, 0, 0, width, height);
  image(plantImg, 0, 200, width, height);

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let dx = mouseX - circle.x;
    let dy = mouseY - circle.y;
    let distance = sqrt(dx * dx + dy * dy);
    if (distance > circle.size / 2) {
      circle.x += dx * circle.speed / distance;
      circle.y += dy * circle.speed / distance;
    }
    
    push();
    translate(circle.x, circle.y); 
    stroke(circle.strokeColor);
    strokeWeight(circle.strokeWeight);
    fill(circle.color);
    ellipse(0, 0, circle.size, circle.size);
    pop();
  }

  fill('white');
  textAlign(CENTER);
  textSize(15);
  text('Click mouse to start, click again to turn to night. Use arrow keys to turn the "sky" black gradually.', width/2, 50);

}
