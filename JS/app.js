import * as PIXI from "https://pixijs.download/release/pixi.min.js";

// Create a new PixiJS application
const app = new PIXI.Application({
  width: 800,
  height: 800,
  backgroundColor: 0x3398b9,
});
document.getElementById("game").appendChild(app.view);

// Create borders
const borders = [
  { x: 0, y: 0, width: 800, height: 10 }, // Top
  { x: 0, y: 790, width: 800, height: 10 }, // Bottom
  { x: 0, y: 0, width: 10, height: 800 }, // Left
  { x: 790, y: 0, width: 10, height: 800 }, // Right
];
const borderGraphics = [];
borders.forEach((border) => {
  const rect = new PIXI.Graphics();
  rect.beginFill(0xff0000); // Red
  rect.drawRect(border.x, border.y, border.width, border.height);
  rect.endFill();
  app.stage.addChild(rect);
  borderGraphics.push(rect);
});

// Create the ball
const ball = new PIXI.Graphics();
ball.beginFill(0xf5ef42); // Yellow
ball.drawCircle(0, 0, 10); // Radius: 10px
ball.endFill();
ball.x = 400;
ball.y = 400;
app.stage.addChild(ball);

// Ball movement
let vx = 2; // Velocity X
let vy = 2; // Velocity Y
const hitBorders = new Set();

function checkCollision() {
  if (ball.x - 10 <= 0) hitBorders.add("left"); // Left
  if (ball.x + 10 >= 800) hitBorders.add("right"); // Right
  if (ball.y - 10 <= 0) hitBorders.add("top"); // Top
  if (ball.y + 10 >= 800) hitBorders.add("bottom"); // Bottom
}

function updateBorderColors() {
  hitBorders.forEach((border) => {
    if (border === "left") borderGraphics[2].tint = 0xffff00; // Change to yellow
    if (border === "right") borderGraphics[3].tint = 0xffff00;
    if (border === "top") borderGraphics[0].tint = 0xffff00;
    if (border === "bottom") borderGraphics[1].tint = 0xffff00;
  });
}

// Game loop
function gameLoop() {
  ball.x += vx;
  ball.y += vy;

  // Reverse direction on collision
  if (ball.x - 10 <= 0 || ball.x + 10 >= 800) vx *= -1;
  if (ball.y - 10 <= 0 || ball.y + 10 >= 800) vy *= -1;

  checkCollision();
  updateBorderColors();

  // Stop the game when all borders are hit
  if (hitBorders.size === 4) {
    alert("Game Over! All borders have been hit.");
    app.ticker.stop();
  }
}

// Start the game loop
app.ticker.add(gameLoop);
