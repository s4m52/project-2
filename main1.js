$(document).click(function(){
  window.requestAnimationFrame(draw)
})


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height- 100;
var dx = 2;
var dy = 2;
var radius = 12;

var paddleHeight = 12;
var paddleWidth = 100;
var paddleX = canvas.width/2;

var rightPressed = false;
var leftPressed = false;

var levelCount=1

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
}

function drawCanvas(){
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall(){
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
  ctx.fill();
  ctx.closePath();
}

function hitPaddle(){
  return (x < paddleX+100 && x > paddleX && y >= canvas.height-paddleHeight)
}

function setLevel(count){
  if(count === 1)
    jQuery.getJSON(Level1.json)
  else if (count === 2)
    jQuery.getJSON(Level2.json)
  else if (count === 3)
    jQuery.getJSON(Level3.json)
  else if (count === 4)
    jQuery.getJSON(Level3.json)
  else
    conosle.log('You\'ve won!')


}

function draw() {
  drawCanvas();
  drawBall();
  drawPaddle();

  x += dx;
  y += dy;

  if (x + dx < radius || x + dx > canvas.width-radius) {
    dx *= -1;
  }
  if (y + dy < radius || hitPaddle()) {
    dy *= -1;
  }
  if (rightPressed && paddleX < canvas.width-100) {
      paddleX += 5;
    }
  else if (leftPressed && paddleX > 0) {
      paddleX -= 5;
  }
}

setInterval(draw, 10);
