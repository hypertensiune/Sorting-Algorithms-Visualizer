const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [];
var FPS = 60;
var x = (canvas.width * canvas.width) / (1920 * 9.6);
var mouse = {
    x: 0, 
    y: 0
};

for(let i = 0; i < x; i++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
    });
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for(var i = 0; i < stars.length; i++){
        var s = stars[i];
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.beginPath();
    for(let i = 0; i < stars.length; i++){
        var starI = stars[i];
        ctx.moveTo(starI.x, starI.y);
        if(distance(mouse, starI) < 150)
            ctx.lineTo(mouse.x, mouse.y);
        for(let j = 0; j < stars.length; j++){
            var starII = stars[j];
            if(distance(starI, starII) < 150){
                ctx.lineTo(starII.x, starII.y);
            }
        }
    }
    
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = "lightblue";
    ctx.stroke();
}

function distance( point1, point2 ){
    var xs = 0;
    var ys = 0;
   
    xs = point2.x - point1.x;
    xs = xs * xs;
   
    ys = point2.y - point1.y;
    ys = ys * ys;
   
    return Math.sqrt( xs + ys );
}

function update() {
    for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
    
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;
      
        if (s.x < 0 || s.x > canvas.width) 
            s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) 
            s.vy = -s.vy;
    }
}

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

canvas.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("da");
});

function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}
  
tick();