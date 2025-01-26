document.addEventListener("DOMContentLoaded", () => {
  // Creating a new PixiJS Application using the init() method
  const app = new PIXI.Application({
    width: 800, // Width of the canvas
    height: 600, // Height of the canvas
    backgroundColor: 0x1099bb, // Set a background color (light blue)
  });

  // Ensure app is fully initialized before appending the canvas
  app.init();

  // Ensure app.canvas is ready before appending it to the DOM
  const gameContainer = document.getElementById("game-container");

  // Wait for the app.canvas to be initialized before proceeding
  if (gameContainer) {
    // Ensure the renderer and canvas are properly initialized
    if (app.canvas) {
      // Append the PixiJS canvas (app.canvas) to the 'game-container' element
      gameContainer.appendChild(app.canvas);
      console.log("PixiJS canvas appended successfully!");
    } else {
      console.error("app.canvas is still not ready.");
    }
  } else {
    console.error("Game container not found!");
  }

  // Creating a simple graphic (a rectangle) for the Pong paddle
  const paddle = new PIXI.Graphics();
  paddle.beginFill(0x66ccff); // Color of the paddle
  paddle.drawRect(0, 0, 10, 100); // Paddle size
  paddle.endFill();
  paddle.x = 50; // Initial position of the paddle
  paddle.y = app.screen.height / 2 - paddle.height / 2;

  // Adding the paddle to the stage
  app.stage.addChild(paddle);

  // Creating the ball
  const ball = new PIXI.Graphics();
  ball.beginFill(0xff0000); // Ball color (red)
  ball.drawCircle(0, 0, 10); // Ball size
  ball.endFill();
  ball.x = app.screen.width / 2;
  ball.y = app.screen.height / 2;

  // Adding the ball to the stage
  app.stage.addChild(ball);

  // Ball movement logic
  let ballSpeedX = 5;
  let ballSpeedY = 5;

  // Game loop
  app.ticker.add(() => {
    // Ball movement
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    // Bounce ball off the walls
    if (ball.y <= 0 || ball.y >= app.screen.height) {
      ballSpeedY *= -1; // Reverse vertical direction
    }

    // Paddle collision logic
    if (
      ball.x <= paddle.x + paddle.width &&
      ball.y >= paddle.y &&
      ball.y <= paddle.y + paddle.height
    ) {
      ballSpeedX *= -1; // Reverse horizontal direction on collision
    }

    // Reset ball if it goes off the screen
    if (ball.x <= 0 || ball.x >= app.screen.width) {
      ball.x = app.screen.width / 2; // Reset to the center
      ball.y = app.screen.height / 2;
    }
  });

  // Creating an interactive text to show the game title
  const text = new PIXI.Text("PixiJS Pong Game", {
    fontFamily: "Arial",
    fontSize: 36,
    fill: 0xffffff, // White text color
    align: "center",
  });
  text.x = app.screen.width / 2 - text.width / 2; // Center the text horizontally
  text.y = 20; // Position the text at the top of the screen

  // Adding the text to the stage
  app.stage.addChild(text);

  // Log to confirm that the PixiJS application has been initialized
  console.log("PixiJS Application initialized and canvas attached!");
});
