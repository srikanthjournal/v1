const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.entry-card');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;
    cards.forEach((card) => {
      const category = card.dataset.category;
      const visible = filter === 'all' || filter === category;
      card.classList.toggle('hidden', !visible);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const animateCounter = (element, target) => {
  const duration = 1300;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const metricObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const element = entry.target;
      const target = Number(element.dataset.counter);
      animateCounter(element, target);
      obs.unobserve(element);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('[data-counter]').forEach((counter) => metricObserver.observe(counter));
