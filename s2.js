function raycast() {

  window.addEventListener('keydown', input, false);
  var dir = 0,
      n = 100,
      rays = [],
      mousePos = {x : 0, y : 0},
      walls = [{x1 : 100, y1 : 10, x2 : 200, y2 : 200},
               {x1 : 700, y1 : 200, x2 : 500, y2 : 300},
               {x1 : 400, y1 : 10, x2 : 300, y2 : 300},
               {x1 : 600, y1 : 10, x2 : 500, y2 : 200}];

  main();

  function main() {
    if (s.rc) {
      requestAnimationFrame(main);
    }
    createpoints()
    for (var i = 0; i < rays.length; i ++){
      var ray = rays[i]
      ray.x1 = mousePos.x;
      ray.y1 = mousePos.y;
      ray.x2 = mousePos.x + ray.dx;
      ray.y2 = mousePos.y + ray.dy;
    }
    for (var i = 0; i < rays.length; i ++){
      var points = [],
          minpoint = []

      for (var j = 0; j < walls.length; j ++){
        if (intersectionPoint(rays[i], walls[j])){
          points.push(intersectionPoint(rays[i], walls[j]));
          minpoint.push(distance(intersectionPoint(rays[i], walls[j])[0],
                                 intersectionPoint(rays[i], walls[j])[1],
                                 mousePos.x, mousePos.y))
        }
      }
      for (var j = 0; j < minpoint.length; j ++){
        if (minpoint[j] == Math.min.apply(Math, minpoint)){
          rays[i].x2 = points[j][0];
          rays[i].y2 = points[j][1];
        }
      }
    }

    c.font = "15px sans-serif";
    c.fillStyle = "white";
    c.fillText("Up / Down: Increase / Decrease rays       Left / Right: Rotate", 1, 15);

    /*for (var i = 0; i < rays.length; i ++){
      var ray = rays[i],
          dist = distance(ray.x1, ray.y1, ray.x2, ray.y2)
      render(300 + i * 5, 600 - Math.sqrt(dist * dist / 57.3) + Math.sqrt(dist), 300 + i * 5, Math.sqrt(dist * dist / 57.3) + Math.sqrt(dist))
    }*/
  }

  function createpoints() {
    draw();
    rays = []
    var degree = 1,
        number = n;
    for (var i = 0; i < number; i ++){
      var a = i / 100 + dir
      rays.push({
        x1 : 0,
        y1 : 0,
        x2 : 0,
        y2 : 0,
        dx : 2000 * Math.cos(a),
        dy : 2000 * Math.sin(a)
      })
    }
  }

  function input(key) {
      if (key.key == 'ArrowLeft'){
        dir -= 0.1
      } else if (key.key == 'ArrowRight'){
        dir += 0.1
      }
      if (key.key == 'ArrowUp'){
        n += 3
      } else if (key.key == 'ArrowDown'){
        n -= 3
      }
  }

  function intersectionPoint(ray, wall) {
    var x = (line(ray)[1] - line(wall)[1]) / (line(wall)[0] - line(ray)[0]),
        y = x * line(ray)[0] + line(ray)[1]
    if ((y >= ray.y1 && y <= ray. y2) || (y >= ray.y2 && y <= ray. y1)){
      if ((x >= ray.x1 && x <= ray. x2) || (x >= ray.x2 && x <= ray. x1)){
        if (wall.x1 > wall.x2){
          if (x >= wall.x2 && x <= wall.x1){
            return [x, y]
          }
        } else if (wall.x1 < wall.x2){
            if (x <= wall.x2 && x >= wall.x1){
              return [x, y]
          }
        }
      }
    }
  }

  function line(line) {
    var gradient = (line.y2 - line.y1) / (line.x2 - line.x1),
        intercept = line.y1 - (gradient * line.x1)

     return [gradient, intercept];
  }

  function draw(){
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < rays.length; i ++){
      var ray = rays[i];
      drawLine(ray);
    }
    for (var i = 0; i < walls.length; i ++){
      var wall = walls[i]
      drawLine(wall);
    }
  }

  function drawLine(line) {
    c.strokeStyle = "#ffffff";
    c.lineWidth = "1";
    c.beginPath();
    c.moveTo(line.x1, line.y1);
    c.lineTo(line.x2, line.y2);
    c.stroke();
  }

  function render(x1, y1, x2, y2) {
    var dis = 256 - y2
    c.strokeStyle = "rgb(" + dis + ", " + dis + ", " + dis + ")"
    c.lineWidth = "10";
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
  }

  function distance(x1, y1, x2, y2) {
    var dx = x2 - x1,
        dy = y2 - y1

    return Math.sqrt(dx * dx + dy * dy);
  }

  canvas.addEventListener("mousemove", function (evt) {
      mousePos = MousePos(canvas, evt);
  }, false);

  function MousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
      };
  }
}
