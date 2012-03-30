(function() {
  var Turtle, onload;

  Turtle = (function() {

    function Turtle(w, h, angle, id) {
      if (w == null) w = 600;
      if (h == null) h = 600;
      this.angle = angle != null ? angle : 0;
      if (id == null) id = "canvas";
      this.canvas = document.getElementById(id);
      this.canvas.width = w;
      this.canvas.height = h;
      this.x = w / 2;
      this.y = h / 2;
      this.home.x = w / 2;
      this.home.y = h / 2;
      this.home.angle = 0;
      this.isPendown = true;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.lineWidth = 3;
    }

    Turtle.prototype.forwardPos = function(distance) {
      var x, y;
      x = (Math.sin(this.angle / 180 * Math.PI) * distance) + this.x;
      y = (Math.cos(this.angle / 180 * Math.PI) * (-distance)) + this.y;
      return {
        x: x,
        y: y
      };
    };

    Turtle.prototype.setAngle = function(angle) {
      return this.angle = angle;
    };

    Turtle.prototype.drawLine = function(to) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.closePath();
      return this.ctx.stroke();
    };

    Turtle.prototype.forward = function(distance) {
      var to;
      to = this.forwardPos(distance);
      if (this.isPendown) this.drawLine(to);
      this.x = to.x;
      this.y = to.y;
    };

    Turtle.prototype.fd = function(d) {
      return this.forward(d);
    };

    Turtle.prototype.backward = function(distance) {
      return this.forward(-distance);
    };

    Turtle.prototype.back = function(d) {
      return this.forward(-d);
    };

    Turtle.prototype.bk = function(d) {
      return this.forward(-d);
    };

    Turtle.prototype.left = function(angle) {
      return this.angle -= angle;
    };

    Turtle.prototype.lt = function(angle) {
      return this.angle -= angle;
    };

    Turtle.prototype.right = function(angle) {
      return this.angle += angle;
    };

    Turtle.prototype.rt = function(angle) {
      return this.angle += angle;
    };

    Turtle.prototype.pendown = function() {
      return this.isPendown = true;
    };

    Turtle.prototype.penup = function() {
      return this.isPendown = false;
    };

    Turtle.prototype.pencolor = function(color) {
      return this.ctx.strokeStyle = color;
    };

    Turtle.prototype.pensize = function(x) {
      return this.ctx.lineWidth = x;
    };

    Turtle.prototype.clear = function() {
      this.ctx.fillStyle = "#FFFFFF";
      return this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Turtle.prototype.home = function() {
      this.x = this.home.x;
      this.y = this.home.y;
      return this.angle = this.home.angle;
    };

    return Turtle;

  })();

  onload = function() {
    var back, backward, bd, clear, fd, forward, home, left, lt, pencolor, pendown, pensize, penup, right, rt, run, turtle,
      _this = this;
    turtle = new Turtle(480, 480);
    forward = function(x) {
      return turtle.forward(x);
    };
    fd = forward;
    back = function(x) {
      return turtle.back(x);
    };
    backward = back;
    bd = back;
    right = function(angle) {
      return turtle.right(angle);
    };
    rt = right;
    left = function(angle) {
      return turtle.left(angle);
    };
    lt = left;
    pendown = function() {
      return turtle.pendown();
    };
    penup = function() {
      return turtle.penup();
    };
    pencolor = function(color) {
      return turtle.pencolor(color);
    };
    pensize = function(x) {
      return turtle.pensize(x);
    };
    clear = function() {
      return turtle.clear();
    };
    home = function() {
      return turtle.home();
    };
    turtle.ctx.fillStyle = '#FFFFFF';
    turtle.ctx.fillRect(0, 0, turtle.canvas.width, turtle.canvas.height);
    run = document.getElementById("run");
    return run.addEventListener("click", function(e) {
      var source;
      source = document.getElementById("source").value;
      try {
        window.compiledJS = CoffeeScript.compile(source, {
          bare: true
        });
      } catch (error) {
        console.log(error + "\nCompile Error");
      }
      try {
        eval(window.compiledJS);
      } catch (error) {
        console.log(error + "\n実行できなかったよ、ごめんね＞＜");
      }
    });
  };

  onload();

}).call(this);
