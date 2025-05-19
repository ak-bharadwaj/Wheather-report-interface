const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Added more neon colors here
const colors = ['#00ffff', '#ff00ff', '#ff77ff', '#00ffcc', '#ff4500', '#ffa500', '#7fff00', '#00ff7f'];

class NeonCircle {
  constructor() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.radius = 10 + Math.random() * 15;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.003 + Math.random() * 0.005;
    this.amplitude = 20 + Math.random() * 30;
    this.baseY = this.y;
  }

  update() {
    this.angle += this.speed;
    this.y = this.baseY + Math.sin(this.angle) * this.amplitude;
  }

  draw() {
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const neonCircles = [];
for(let i = 0; i < 60; i++) {
  neonCircles.push(new NeonCircle());
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  neonCircles.forEach(c => {
    c.update();
    c.draw();
  });
  requestAnimationFrame(animate);
}
animate();