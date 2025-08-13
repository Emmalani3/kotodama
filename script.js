// Dynamic year in footer
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// Friendly toast when the page loads
window.addEventListener('DOMContentLoaded', () => {
  const note = document.createElement('div');
  note.textContent = '✨ You found a kotodama!';
  Object.assign(note.style, {
    position:'fixed',left:'50%',top:'14px',transform:'translateX(-50%)',
    background:'#0b3b46',color:'#fff',padding:'10px 14px',borderRadius:'999px',
    boxShadow:'0 10px 20px rgba(0,0,0,.15)',zIndex:100
  });
  document.body.appendChild(note);
  setTimeout(()=> note.remove(), 2600);
});
// Confetti burst inside the #welcome section every 5 seconds
(function () {
  const section = document.getElementById('welcome');
  if (!section || !window.confetti) return;

  // Create an overlay canvas just for this section
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti';
  section.appendChild(canvas);

  // Confetti instance bound to that canvas
  const shoot = window.confetti.create(canvas, { resize: true, useWorker: true });

  function burst() {
    // Left + right bursts for nice coverage
    shoot({ particleCount: 60, startVelocity: 35, spread: 55, angle: 60, origin: { x: 0,   y: 0.2 } });
    shoot({ particleCount: 60, startVelocity: 35, spread: 55, angle: 120, origin: { x: 1,  y: 0.2 } });
  }

  burst();                    // fire once on load
  setInterval(burst, 10000);   // then every 10 seconds
})();

// Confetti on demand for the Welcome section
(function () {
  if (!window.confetti) return;               // requires canvas-confetti
  const section = document.getElementById('welcome');
  const btn = document.getElementById('celebrate');
  if (!section || !btn) return;

  let instance;
  function getInstance() {
    if (instance) return instance;
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti';
    section.appendChild(canvas);
    instance = window.confetti.create(canvas, { resize: true, useWorker: true });
    return instance;
  }

  function burst() {
    const shoot = getInstance();
    // symmetric bursts for nice coverage
    shoot({ particleCount: 90, startVelocity: 40, spread: 70, origin: { x: 0.2, y: 0.2 } });
    shoot({ particleCount: 90, startVelocity: 40, spread: 70, origin: { x: 0.8, y: 0.2 } });
  }

  btn.addEventListener('click', burst);
})();

// Mobile nav toggle
(function(){
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('site-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close menu when a link is clicked or Escape is pressed
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
