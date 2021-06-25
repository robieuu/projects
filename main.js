var canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d');

canvas.width = window.innerWidth / 10 * 8;
canvas.height = window.innerHeight / 10 * 8 / 2;

canvas.style.position = 'absolute';
canvas.style.left = (window.innerWidth / 10).toString() + 'px';
canvas.style.top = (window.innerHeight / 4).toString() + 'px';

var s = {ss : true,
         rc : false,
         cl : false,
         cg : false,
         td : false},
         proj = 0;
sandsim();
document.getElementById("proj").innerHTML = "Sand";
function choose(d) {
  for (var i = 0; i < Object.keys(s).length; i ++) {
    s[Object.keys(s)[i]] = false;
  }
  if (proj == 0 && d == 'l') proj = Object.keys(s).length - 1;
  else if (proj == Object.keys(s).length - 1 && d == 'r') proj = 0;
  else if (d == 'r') proj ++;
  else proj --;
  s[Object.keys(s)[proj]] = true;
  if (proj == 0) {sandsim(); document.getElementById("proj").innerHTML = "Sand";}
  else if (proj == 1) {raycast(); document.getElementById("proj").innerHTML = "Raycast";}
  else if (proj == 2) {cloth(); document.getElementById("proj").innerHTML = "Cloth";}
  else if (proj == 3) {cgol(); document.getElementById("proj").innerHTML = "Cellular automaton";}
  else if (proj == 4) {render3d(); document.getElementById("proj").innerHTML = "3D Renderer";}
}
