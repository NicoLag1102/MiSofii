const boton = document.getElementById('botonCarta');
const carta = document.getElementById('carta');
const cerrar = document.getElementById('cerrarCarta');
const musica = document.getElementById('musica');

boton.addEventListener('click', () => {
  carta.classList.add('abierta');
  musica.play();
});
cerrar.addEventListener('click', () => {
  carta.classList.remove('abierta');
  musica.pause();
  musica.currentTime = 0;
});

// Animación de mariposas
const canvas = document.getElementById('mariposas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Mariposa {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 200;
    this.size = 20 + Math.random() * 20;
    this.speed = 1 + Math.random() * 2;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = -Math.sin(this.angle) * this.speed;
    this.alpha = 0.5 + Math.random() * 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.002;
    if (this.alpha <= 0) this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.alpha = 0.5 + Math.random() * 0.5;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = 'violet';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y - this.size, this.x + this.size, this.y + this.size, this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size, this.x - this.size, this.y - this.size, this.x, this.y);
    ctx.fill();
    ctx.restore();
  }
}

const mariposas = Array.from({length: 40}, () => new Mariposa());

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mariposas.forEach(m => { m.update(); m.draw(); });
  requestAnimationFrame(animar);
}
animar();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
