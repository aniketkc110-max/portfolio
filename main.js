/* =========================================
   ANIKET CHAUDHARI PORTFOLIO - MAIN.JS
   ========================================= */

// ---- CUSTOM CURSOR ----
(function () {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
  document.body.appendChild(cursor);

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();

// ---- NAVBAR SCROLL ----
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();

// ---- HAMBURGER MENU ----
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    hamburger.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '1';
    hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
})();

// ---- ACTIVE NAV LINK ----
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- SCROLL REVEAL ----
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ---- COUNTER ANIMATION ----
function animateCount(el, end, duration = 1500) {
  let start = 0;
  const step = Math.ceil(end / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= end) { start = end; clearInterval(timer); }
    el.textContent = start + (el.dataset.suffix || '');
  }, 16);
}

(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target, parseInt(e.target.dataset.count));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();

// ---- SKILL BAR ANIMATION ----
(function () {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => { b.style.width = '0'; obs.observe(b); });
})();

// ---- TYPEWRITER ----
function typeWriter(el, texts, speed = 80, pause = 2000) {
  let i = 0, j = 0, deleting = false;

  function tick() {
    el.textContent = texts[i].substring(0, j);
    if (!deleting) {
      j++;
      if (j > texts[i].length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      j--;
      if (j < 0) {
        deleting = false;
        i = (i + 1) % texts.length;
        j = 0;
        setTimeout(tick, 400);
        return;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

const typeEl = document.getElementById('typewriter');
if (typeEl) {
  typeWriter(typeEl, ['Student 📚', 'Learner 🔍', 'Chess Player ♟️', 'Sitar Player 🎵', 'Explorer 🚀']);
}

// ---- FLOATING PARTICLES ----
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    o: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '26,79,214' : '232,44,44'
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.o})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();

// ---- FORM SUBMIT (contact.html) ----
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();
