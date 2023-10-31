// Create a canvas element
var canvas = document.getElementById("canvas");

// Create a context object
var ctx = canvas.getContext("2d");

// Create a ball object
var ball = {
x: 50,
y: 50,
radius: 20,
velocity: {
x: 10,
y: 10
},
color: "red"
};

// Create a function to draw the ball
function drawBall() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = ball.color;
ctx.fillRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

// Create a function to update the ball's position
function updateBall() {
ball.x += ball.velocity.x;
ball.y += ball.velocity.y;

// Check if the ball has hit the edges of the canvas
if (ball.x < 0 || ball.x > canvas.width) {
ball.velocity.x = -ball.velocity.x;
}

if (ball.y < 0 || ball.y > canvas.height) {
ball.velocity.y = -ball.velocity.y;
}

// Check if the ball has collided with another ball
for (var i = 0; i < balls.length; i++) {
if (balls[i] !== ball) {
var dx = ball.x - balls[i].x;
var dy = ball.y - balls[i].y;
var d = dx * dx + dy * dy;
if (d <= (ball.radius + balls[i].radius) * (ball.radius + balls[i].radius)) {
// The balls have collided
var vx = (ball.velocity.x * ball.radius * ball.radius + balls[i].velocity.x * balls[i].radius * balls[i].radius - dx * dx) / (2 * d);
var vy = (ball.velocity.y * ball.radius * ball.radius + balls[i].velocity.y * balls[i].radius * balls[i].radius - dy * dy) / (2 * d);
ball.velocity.x = vx;
ball.velocity.y = vy;
balls[i].velocity.x = -vx;
balls[i].velocity.y = -vy;
}
}
}
}

// Create an interval to call the updateBall function every 10 milliseconds
var interval = setInterval(updateBall, 10);

// Add an event listener to the window to stop the animation when the user clicks
window.addEventListener("click", function() {
clearInterval(interval);
});

// Draw the ball initially
drawBall();

// Add a function to add a new ball
function addBall() {
var ball = {
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
radius: 20,
velocity: {
x: 10,
y: 10
},
color: "red"
};

balls.push(ball);
}

// Add a button to add a new ball
var button = document.getElementById("add-ball");
button.addEventListener("click", addBall);

// Add a function to remove all balls
function removeBalls() {
balls = [];
}

// Add a button to remove all balls
var button = document.getElementById("remove-balls");
button.addEventListener("click", removeBalls);