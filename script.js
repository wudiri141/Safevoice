const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const counters = document.querySelectorAll('.stat-box h2[data-count]');
const escapeCard = document.querySelector('[data-escape-page]');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const animateCounter = (counter) => {
  const target = Number(counter.getAttribute('data-count') || '0');
  const suffix = counter.textContent?.includes('+') ? '+' : '';
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(target * progress);
    counter.textContent = `${value.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = `${target.toLocaleString()}${suffix}`;
    }
  };

  requestAnimationFrame(tick);
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach(animateCounter);
}

if (escapeCard) {
  const targets = [
    'https://www.wikipedia.org/',
    'https://www.mozilla.org/',
    'https://www.un.org/',
    'https://www.nationalgeographic.com/'
  ];

  const target = targets[Math.floor(Math.random() * targets.length)];
  document.querySelectorAll('[data-escape-link]').forEach((link) => {
    if (link instanceof HTMLAnchorElement) {
      link.href = target;
    }
  });

  window.setTimeout(() => {
    window.location.replace(target);
  }, 700);
}
