$(document).click(function(){
  window.requestAnimationFrame(draw)
})

$(window).keydown(function(event){
  keys[event.key] = true
})

$(window).keyup(function(event){
  delete keys[event.key]
})

console.log("Hello")
                  
var prevT=undefined
var paddle = new Paddle(0,"ArrrowUp","ArrowRight")
var keys = {}


function draw(t) {
  console.log('draw')
  if(prevT==undefined) {
    prevT = t
    window.requestAnimationFrame(draw)
  }
  
  if (prevT != undefined) {
  var deltaT = t - prevT
  prevT = t 
  console.log('deltaT')
  
  var ctx = document.getElementById('canvas').getContext('2d')
  
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillRect(0, 0, 500, 250)
  ctx.fillStyle = 'black'
  ctx.clearRect(0, 0, 500, 250)
  ctx.save()
  
  
  paddle.updatePosition(deltaT)
  paddle.draw(ctx)
  ball.updatePosition(deltaT)
  ball.draw(ctx)
  
  }
  
  ctx.restore()
  
  
  window.requestAnimationFrame(draw)
}

var ball = {
  x:200,
  y:100,
  vx:0.1,
  vy:0.1,
  radius: 14,
  draw: function(ctx){
    console.log('gty')
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.radius, 0, Math.PI*2)
    ctx.fill()
  },
  updatePosition: function(deltaT){
    this.checkBorderCollision()
    
    this.x = this.x + this.vx*deltaT
    this.y = this.y + this.vy*deltaT
  },
  
  checkBorderCollision: function(){
    //makes the ball rebound off of the bottom
    if(this.y+this.radius >= 600)
      this.vy = -this.vy
    //makes ball rebound off of the right wall
    if(this.x+this.radius >= 750)
      this.vx = -this.vx
    //makes the ball rebound off of the top
    if(this.y+this.radius <= 20)
      this.vy = -this.vy
    //makes the ball rebound off of the left wall
    if(this.x+this.radius <= 20)
      this.vx = -this.vx
  }


}

function Paddle(x, upKey, rightKey) {
  this.y = 230
  this.x = 220
  this.rightKey = rightKey
  this.upKey = upKey
  
  
  this.updatePosition = function(deltaT) {
    if (keys[this.rightKey]) {
      this.x = Math.min(440, this.x + 0.3 * deltaT )
    }
    if (keys[this.upKey]) {
      console.log('Swag')
      this.x = Math.max(0, this.x - 0.3 * deltaT)
    }
  }
  
  this.draw = function(ctx) {
    ctx.fillRect(this.x, this.y, 60, 20)
    
  }
  
  
}

