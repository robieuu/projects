function cloth() {
  var points = [],
      sticks = [],
      bounce = 0.9;
      gravity = 0.098,
      friction = 0.99,
      len = 10,
      lx = 10,
      ly = 10,
      mousePos = {x : 0, y : 0},

  fcloth();
  main();

  canvas.addEventListener("mousemove", function (evt) {
      mousePos = MousePos(canvas, evt);
  }, false);

  function main(){
    if(s.cl)requestAnimationFrame(main);
    updatePoints();
    updateSticks();
    render();
    points[0].x = mousePos.x;
    points[0].y = mousePos.y;
    points[lx - 1].x = mousePos.x + 100;
    points[lx - 1].y = mousePos.y;
  }

  function MousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
      };
  }

  function fcloth(){
    for (var cy = 0; cy < ly; cy ++){
      for (var cx = 0; cx < lx; cx ++){
        points.push({
          x : cx * 10 + 10,
          y : cy * 10,
          oldx : cx * 10,
          oldy : cy * 10,
          static : false
        })
      }
    }


    for (var i = 0; i < ly; i ++){
      for (var j = 0; j < lx - 1; j ++){
        sticks.push({
          point1 : points[j + i * lx],
          point2 : points[j + i * lx + 1],
          length : len
        })
      }
    }

    for (var i = 0; i < ly - 1; i ++){
      for (var j = 0; j < lx; j ++){
        sticks.push({
          point1 : points[j + (i * lx)],
          point2 : points[j + (i * lx) + lx],
          length : len
        })
      }
    }

    points[0].static = true;
    points[lx - 1].static = true;
  }

  function updatePoints(){
    for (var i = 0; i < points.length; i ++){
      if (points[i].static == false){
        var point = points[i],
            vx = point.x - point.oldx,
            vy = point.y - point.oldy

        if (point.x > canvas.width){
          point.x = canvas.width;
          vx *= -bounce;
        } else if (point.x < 0){
          point.x = 0;
          vx = Math.abs(vx * bounce);
        }

        if (point.y > canvas.height){
          point.y = canvas.height;
          vy *= -bounce;
        } else if (point.y < 0){
          point.y = 0;
          vy = Math.abs(vy * bounce);
        }

        point.oldx = point.x;
        point.oldy = point.y;
        point.x += vx * friction;
        point.y += vy * friction + gravity;
      }
    }
  }

  function updateSticks(){
    for (var i = 0; i < sticks.length; i ++){
      var stick = sticks[i];
          dx = stick.point2.x - stick.point1.x,
          dy = stick.point2.y - stick.point1.y,
          distance = Math.sqrt(dx * dx + dy * dy),
          difference = stick.length - distance,
          percent = difference / distance / 2,
          offx = dx * percent,
          offy = dy * percent
      if (!stick.point1.static){
        stick.point1.x -= offx;
        stick.point1.y -= offy;
      }
      if (!stick.point2.static){
        stick.point2.x += offx;
        stick.point2.y += offy;
      }
    }
  }

  function render(){
    c.strokeStyle = "black"
    var a = 0,
        b = 0,
        d = lx - 2,
        e = 0,
        f = 0
    c.clearRect(0, 0, innerWidth, innerHeight);

    /*for (var i = 0; i < points.length; i ++){
      c.beginPath();
      var p = points[i];
      c.beginPath();
      c.arc(p.x, p.y, 5, 0, Math.PI * 2);
      c.fill();
    }*/

    for (var i = 0; i < sticks.length; i ++){
      if (i > ((lx - 1) * (lx * 2) / 2) + 1){
          if (a == 0 && b < d){
            b ++;
          } else if(a == 0 && b == d){
            a = 1;
            b = 0;
          } else if(a == 1){
            a = 0;
          }
      }
      if (i > ((lx - 1) * (lx * 2) / 2)){
          if (e == 0 && f < d){
            f ++;
          } else if(e == 0 && f == d){
            e = 1;
            f = 0;
          } else if(e == 1){
            e = 0;
          }
      }

      if (true || e == 1 || a == 1 || i < lx - 1 || (i > (lx - 1) * (lx * 2) / 2 - lx && i < (lx - 1) * (lx * 2) / 2)){
        c.beginPath();
        c.moveTo(sticks[i].point1.x, sticks[i].point1.y);
        c.lineTo(sticks[i].point2.x, sticks[i].point2.y);
        c.stroke();
      }
    }
  }

  function distance(point1, point2){
    var dx = Math.pow((point2.x - point1.x), 2),
        dy = Math.pow((point2.y - point1.y), 2)
    return Math.sqrt(dx * dy)
  }
}
