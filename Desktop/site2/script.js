const precious = document.getElementById('precious');
const gollum2 = document.getElementById('gollum2');
const sauronContainer = document.getElementById('sauron-container');
const sauron = document.getElementById('sauron');
const gandalf = document.getElementById('gandalf');
const lightBeam = document.getElementById('light-beam');
const explosion = document.getElementById('explosion');
const sauronSound = document.getElementById('sauronSound');
const lightningSound = document.getElementById('lightningSound');
const winSound = document.getElementById('winSound');

let count = 0;
let activeRings = [];

createMovingRing();

precious.addEventListener('click', () => {
  precious.classList.add('pulse');
  setTimeout(() => precious.classList.remove('pulse'), 400);

  count++;
  addRing();

  if (count === 10) {
    gollum2.classList.add('run');
  }

  if (count === 20) {
    precious.style.display = 'none';
    sauronContainer.style.display = 'block';
    sauronSound.play();

    let ringCheck = setInterval(() => {
      activeRings.forEach((ring, index) => {
        if (isColliding(ring, sauron)) {
          ring.remove();
          activeRings.splice(index, 1);
          let scale = parseFloat(sauron.style.transform?.replace(/[^\d.]/g, '') || 1) + 0.05;
          sauron.style.transform = `scale(${scale})`;
        }
      });

      if (activeRings.length === 0) {
        clearInterval(ringCheck);
        setTimeout(() => {
          lightningSound.play();
          setTimeout(() => {
            gandalf.classList.add('show');
            lightBeam.classList.add('show');

            setTimeout(() => {
              explosion.style.display = 'block';
              sauronContainer.style.display = 'none';
              winSound.play();

              setTimeout(() => {
                explosion.style.display = 'none';
                lightBeam.style.display = 'none';
              }, 1500);
            }, 1000);
          }, 1000);
        }, sauronSound.duration * 1000 - 1000);
      }
    }, 100);
  }
});

function createMovingRing() {
  const ring = document.createElement('img');
  ring.src = 'gollum.png';
  ring.className = 'ring static-ring';
  document.body.appendChild(ring);
  activeRings.push(ring);
  startBouncing(ring);
}

function addRing() {
  const ring = document.createElement('img');
  ring.src = 'gollum.png';
  ring.className = 'ring static-ring';
  document.body.appendChild(ring);
  activeRings.push(ring);
  startBouncing(ring);
}

function startBouncing(el, speed = 2) {
  el.style.left = Math.random() * (window.innerWidth - 100) + 'px';
  el.style.top = Math.random() * (window.innerHeight - 100) + 'px';
  let dx = (Math.random() < 0.5 ? -1 : 1) * speed;
  let dy = (Math.random() < 0.5 ? -1 : 1) * speed;

  function move() {
    const rect = el.getBoundingClientRect();
    if (rect.left <= 0 || rect.right >= window.innerWidth) dx *= -1;
    if (rect.top <= 0 || rect.bottom >= window.innerHeight) dy *= -1;

    el.style.left = (el.offsetLeft + dx) + 'px';
    el.style.top = (el.offsetTop + dy) + 'px';

    requestAnimationFrame(move);
  }

  move();
}

function isColliding(a, b) {
  const ar = a.getBoundingClientRect();
  const br = b.getBoundingClientRect();
  return !(ar.right < br.left || ar.left > br.right || ar.bottom < br.top || ar.top > br.bottom);
}
