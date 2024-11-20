let x = 275;
let y = 0;
let SpacePadX = 225;
let SpacePadY = 500;

// Game logic variables
let gravity = 0.1;
let acceleration = 0.1;
let initialGravity = 0.1;
let SpacePadSpeed = 1;

// Game state variables
let state = "start"; // "start", "play", "end"
let landingSuccess = false; // Track landing result

function setup() {
  createCanvas(600, 600);
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "play") {
    playGame();
  } else if (state === "end") {
    resultScreen();
  }
}

function startScreen() {
  background(255, 255, 254);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Welcome to the Evil Game!", width / 2, height / 2 - 50);
  textSize(16);
  text("Click Start to Begin", width / 2, height / 2);
  fill(0, 0, 255);
  rect(280, 350, 100, 40, 20);
  fill(255);
  text("Start", 330, 370);
}

function playGame() {
  background(100, 120, 120); // Clear background for each frame
  gameBackground();
  landingSpace(SpacePadX, SpacePadY);

  // Draw clouds
  cloudDark(450, 200);
  cloudDark(30, 200);
  cloudWhite(90, 100);
  cloudWhite(500, 90);

  // Draw character
  evilCharacter(x, y, gravity < 0);

  y += gravity;
  gravity += acceleration;

  // Reduce gravity when mouse is pressed
  if (keyIsDown(32) || mouseIsPressed) {
    gravity -= 0.5;
  }

  // Move landing pad
  SpacePadX += SpacePadSpeed;
  if (SpacePadX >= 600) {
    SpacePadX = -200;
  }

  // Check for landing
  if (y + 62 >= SpacePadY) {
    if (x >= SpacePadX && x <= SpacePadX + 150) {
      // Successful landing
      state = "end";
      landingSuccess = true;
      SpacePadSpeed = 0;
      gravity = 0; // Stop vertical speed
    } else {
      // Failed landing
      state = "end";
      landingSuccess = false;
      SpacePadSpeed = 0;
      gravity = 0; // Stop vertical speed
    }
  }
}

function resultScreen() {
  background(255, 0, 255);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  if (landingSuccess) {
    text("Landed Successfully!", width / 2, height / 2 - 50);
  } else {
    text("Landing Failed!", width / 2, height / 2 - 50);
  }
  text("Click ´Replay´ to Try Again", width / 2, height / 2);
  fill(0, 0, 0);
  rect(250, 550, 100, 40, 20);
  fill(255);
  textSize(16);
  text("Replay", 300, 570);
}

// Clouds
function cloudWhite(x, y) {
  strokeWeight(0);
  fill(255);
  ellipse(x, y, 50);
  ellipse(x - 40, y, 50);
  ellipse(x + 30, y - 10, 70);
  rect(x - 80, y + 5, 150, 20);
  ellipse(x - 80, y, 50);
  ellipse(x + 65, y, 50);
}

function cloudDark(a, b) {
  strokeWeight(0);
  fill(125, 70, 20);
  rect(a - 40, b + 5, 100, 20);
  ellipse(a, b, 50);
  ellipse(a - 40, b, 50);
  ellipse(a + 30, b - 10, 70);
  ellipse(a + 50, b, 55);
}

// Game background
function gameBackground() {
  strokeWeight(0);
  fill(225, 205, 150);
  rect(0, 500, 600, 600);
  fill(18, 95, 0);
  triangle(-50, 400, 180, 130, 300, 400);
  triangle(70, 400, 360, 210, 490, 400);
  triangle(400, 400, 600, 170, 650, 400);
  fill(52, 152, 219);
  rect(0, 380, 600, 120);
}

// Landing pad
function landingSpace(SpacePadX, SpacePadY) {
  fill(24, 0, 0);
  rect(SpacePadX, SpacePadY, 150, 40, 50);
  fill(252, 255, 51);
  triangle(
    SpacePadX + 15,
    SpacePadY + 40,
    SpacePadX + 35,
    SpacePadY + 50,
    SpacePadX + 55,
    SpacePadY + 40
  );
  triangle(
    SpacePadX + 55,
    SpacePadY + 40,
    SpacePadX + 75,
    SpacePadY + 50,
    SpacePadX + 95,
    SpacePadY + 40
  );
  triangle(
    SpacePadX + 95,
    SpacePadY + 40,
    SpacePadX + 110,
    SpacePadY + 50,
    SpacePadX + 130,
    SpacePadY + 40
  );
  fill(255);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("Space Pad", SpacePadX + 75, 520);
}

// The Evil Character
function evilCharacter(x, y, character) {
  push();
  strokeWeight(2);
  translate(x, y);
  scale(0.8);
  translate(-x, -y);
  //body
  fill(0, 0, 0);
  ellipse(x, y, 90);
  //Blue Flame
  fill(0, 0, 255);
  triangle(x - 59, y + 25, x - 55, y + 50, x - 40, y + 40);
  triangle(x - 40, y + 40, x - 35, y + 65, x - 20, y + 42);
  triangle(x - 22, y + 44, x - 12, y + 65, x - 2, y + 45);
  triangle(x - 5, y + 45, x + 10, y + 70, x + 20, y + 44);
  triangle(x + 20, y + 45, x + 35, y + 65, x + 40, y + 38);
  triangle(x + 40, y + 40, x + 55, y + 50, x + 55, y + 30);
  //outer shell
  fill(255, 215, 0);
  ellipse(x, y + 20, 120, 50);
  //body bottom
  fill(0, 0, 0);
  arc(x, y - 5, 90, 50, 0, 3.14);
  //eyes
  fill(255, 255, 255);
  ellipse(x, y - 10, 30, 20);
  fill(0, 0, 0);
  ellipse(x, y - 10, 10, 10);
  pop();
}

function mousePressed() {
  // Check button click for transitions
  if (
    state === "start" &&
    mouseX >= 280 &&
    mouseX <= 380 &&
    mouseY >= 350 &&
    mouseY <= 590
  ) {
    state = "play";
    x = 275;
    y = 0;
    gravity = initialGravity;
    acceleration = 0.1;
    SpacePadSpeed = 1;
  } else if (
    state === "end" &&
    mouseX >= 250 &&
    mouseX <= 350 &&
    mouseY >= 550 &&
    mouseY <= 590
  ) {
    state = "start";
  }
}
