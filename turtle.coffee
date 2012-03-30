class Turtle
  constructor: (w = 600, h = 600, @angle = 0, id = "canvas") ->
    @canvas = document.getElementById(id)
    @canvas.width = w
    @canvas.height = h
    @x = w/2
    @y = h/2
    @home.x = w/2
    @home.y = h/2
    @home.angle = 0
    #@img = new Image()
    #@img.src = "turtle.png"
    @isPendown = true
    @ctx = @canvas.getContext("2d")
    @ctx.lineWidth = 3

  forwardPos: (distance) ->
    x = (Math.sin(@angle / 180 * Math.PI) * distance) + @x
    y = (Math.cos(@angle / 180 * Math.PI) * (-distance)) + @y
    return {x:x,y:y}

  setAngle:(angle) ->
    @angle = angle

  drawLine: (to)->
    @ctx.beginPath()
    @ctx.moveTo(@x, @y)
    @ctx.lineTo(to.x, to.y)
    @ctx.closePath()
    @ctx.stroke()

  forward:(distance) ->
    to = @forwardPos(distance)
    if(@isPendown)
      @drawLine(to)
    @x = to.x
    @y = to.y
    return

  fd:(d) ->
    @forward d

  backward: (distance) ->
    @forward(-distance)

  back: (d) ->
    @forward -d

  bk: (d) ->
    @forward -d

  left: (angle)->
    @angle -= angle

  lt: (angle) ->
    @angle -= angle

  right: (angle)->
    @angle += angle

  rt: (angle) ->
    @angle += angle

  pendown: ->
    @isPendown = true

  penup: ->
    @isPendown = false

  pencolor: (color) ->
    @ctx.strokeStyle = color

  pensize: (x) ->
    @ctx.lineWidth = x

  clear: ->
    @ctx.fillStyle = "#FFFFFF"
    @ctx.fillRect(0, 0, @canvas.width, @canvas.height)

  home: ->
    @x = @home.x
    @y = @home.y
    @angle = @home.angle


#λ = (x) -> (s) -> (eval '(' + x + ')') s

onload = ->
  turtle = new Turtle 480, 480
  forward = (x) -> turtle.forward(x)
  fd = forward
  back = (x) -> turtle.back(x)
  backward = back
  bd = back
  right = (angle) -> turtle.right(angle)
  rt = right
  left = (angle) -> turtle.left(angle)
  lt = left
  pendown = -> turtle.pendown()
  penup = -> turtle.penup()
  pencolor = (color) -> turtle.pencolor(color)
  pensize = (x) -> turtle.pensize(x)
  clear = -> turtle.clear()
  home = -> turtle.home()
  turtle.ctx.fillStyle = '#FFFFFF'
  turtle.ctx.fillRect(0, 0, turtle.canvas.width, turtle.canvas.height)

  run = document.getElementById "run"
  run.addEventListener "click", (e) =>
    source = document.getElementById("source").value
    try
      window.compiledJS = CoffeeScript.compile source, bare: on
    catch error then console.log error + "\nCompile Error"
    try
      eval window.compiledJS
    catch error then console.log error + "\n実行できなかったよ、ごめんなさい＞＜"
    return

  #body = document.getElementsByTagName("body")[0]
  #code = document.getElementById("code")
  #body.addEventListener "keydown", ->
  #  code.innerHTML = document.getElementById("source").value

onload()
