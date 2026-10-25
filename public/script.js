/**
 * @description Motor de animaciones del portfolio: reveals con variantes,
 *   grupos escalonados, barra de progreso de scroll, header con blur y
 *   parallax sutil. Compatible con las View Transitions de Astro:
 *   se reinicializa en cada astro:page-load sin duplicar listeners.
 * @returns {void}
 */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const revealObserver = () =>
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserverCache.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

  let revealObserverCache = null;

  /**
   * @description Inicializa el motor sobre el documento actual: observa
   *   reveals y grupos escalonados, y refresca progreso, header y parallax
   *   en cada frame de scroll (con trótele rAF).
   * @returns {void}
   */
  const initMotion = () => {
    const year = document.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    const reduced = prefersReduced.matches;
    const hasIO = 'IntersectionObserver' in window;

    /* Reveals individuales (.reveal, con data-motion y data-delay opcionales). */
    const reveals = document.querySelectorAll('.reveal');
    if (hasIO && !reduced) {
      revealObserverCache = revealObserver();
      reveals.forEach((element) => {
        const delay = element.dataset.delay;
        if (delay) element.style.transitionDelay = `${delay}ms`;
        revealObserverCache.observe(element);
      });
    } else {
      reveals.forEach((element) => element.classList.add('is-visible'));
    }

    /* Grupos escalonados: los hijos entran con retardo progresivo. */
    const groups = document.querySelectorAll('[data-stagger]');
    if (hasIO && !reduced) {
      const groupObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-staggered');
              groupObserver.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 },
      );
      groups.forEach((group) => {
        Array.from(group.children).forEach((child, index) => {
          child.style.transitionDelay = `${Math.min(index * 85, 600)}ms`;
        });
        groupObserver.observe(group);
      });
    } else {
      groups.forEach((group) => group.classList.add('is-staggered'));
    }

    /* Capa de scroll: progreso, header y parallax en un solo listener. */
    if (!window.__motionScrollBound) {
      window.__motionScrollBound = true;
      let ticking = false;
      window.addEventListener(
        'scroll',
        () => {
          if (ticking) return;
          ticking = true;
          window.requestAnimationFrame(() => {
            ticking = false;
            const doc = document.documentElement;
            const max = doc.scrollHeight - window.innerHeight;
            const bar = document.querySelector('.scroll-progress i');
            if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

            const header = document.querySelector('.site-header');
            if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);

            if (!prefersReduced.matches) {
              document.querySelectorAll('[data-parallax]').forEach((element) => {
                const rect = element.getBoundingClientRect();
                const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
                element.style.setProperty('--py', `${(-offset * parseFloat(element.dataset.parallax)).toFixed(1)}px`);
              });
            }
          });
        },
        { passive: true },
      );
    }
    window.dispatchEvent(new Event('scroll'));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
  document.addEventListener('astro:page-load', initMotion);
})();
