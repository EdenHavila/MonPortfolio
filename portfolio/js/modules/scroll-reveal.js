/**
 * scroll-reveal.js
 * Fait apparaître progressivement les éléments marqués `.reveal`
 * lorsqu'ils entrent dans le viewport, via IntersectionObserver.
 */
export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}
