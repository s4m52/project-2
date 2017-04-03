var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var x = canvas.width/3
var y = canvas.height- 100
var dx = 2
var dy = 2
var radius = 12

var paddleHeight = 12
var paddleWidth = 100
var paddleX = canvas.width/2

var rightPressed = false
var leftPressed = false

var lives = 5

var levelCount=1

var bricks = []

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true
    }
    else if(e.keyCode === 37) {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false
    }
    else if(e.keyCode === 37) {
        leftPressed = false
    }
}

function makeBricks(count) {
	var posX = 10
	var posY = 10
	var countY = count/8
	var ix = 0
	for (var i = 0; i < countY; i++){
    	for (var j = 0; j < 8; j++){
      		bricks[ix++] = new brick(posX, posY, 1)
      		posX += 60
    	}
    	posX = 10
    	posY += 30
	}
}

function brick(brickX, brickY, strength) {

	this.brickX = brickX
	this.brickY = brickY
	this.strength = strength
	this.isHit = false

	var height = 10
	var width = 20


}


function drawBricks() {
	for (var i = 0; i < bricks.length; i++) {

			ctx.beginPath()
			ctx.rect(bricks[i].brickX, bricks[i].brickY, 50, 20)
  			ctx.fill()
  			ctx.closePath()

	}
}



function drawCanvas(){
  ctx.fillStyle = "lightgrey"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawBall(){
  ctx.fillStyle = "black"
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI*2)
  ctx.fill()
  //ctx.closePath()
}

function drawPaddle() {
  ctx.fillStyle = "black"
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
  ctx.fill()
  ctx.closePath()
}

function hitPaddle() {
  return (x < paddleX+100 && x > paddleX
          && y >= canvas.height-paddleHeight
          && y < canvas.height)
}

function loseLife() {
  x = canvas.width/2
  y = canvas.height-100
  dx = 2
  dy = 2
  lives--
}

function drawLives() {
  ctx.font = '16px Arial Black'
  ctx.fillStyle = 'white'
  ctx.fillText(lives, canvas.width-20, canvas.height-10)

}

function setLevel(levelCount){
  if(levelCount === 1)
  $.getJSON("http:\/\/localhost:8000/https:\/\/github.com/s4m52/ponggame.git", function(json) {
    makeBricks(json.numOfBlocks)
});

  else if (levelCount === 2)
    jQuery.getJSON(Level2.json)
  else if (levelCount === 3)
    jQuery.getJSON(Level3.json)
  else if (levelCount === 4)
    jQuery.getJSON(Level3.json)
  else
    conosle.log('You\'ve won!')

  //makeBricks(json.numOfBlocks)
}

function draw(levelCount) {
  drawCanvas()
  drawBall()
  drawPaddle()
  drawLives()
  setLevel(levelCount)
  //makeBricks(32)
  drawBricks()


  x += dx
  y += dy

  if (x + dx < radius || x + dx > canvas.width-radius) {
    dx *= -1
  }
  if (y + dy < radius || hitPaddle()) {
    dy *= -1
  }
  if (rightPressed && paddleX < canvas.width-100) {
    paddleX += 7
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }
   if(y + dy > canvas.height*1.5) loseLife()
}

setInterval(draw(levelCount), 10)
