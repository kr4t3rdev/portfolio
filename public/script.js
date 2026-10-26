/**
 * @description Motor de animaciones del portfolio: reveals con variantes,
 *   grupos escalonados, barra de progreso de scroll, header con blur y
 *   parallax sutil. Compatible con las View Transitions de Astro:
 *   se reinicializa en cada astro:page-load sin duplicar listeners.
 * @returns {void}
 */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const THEME_BG = { light: '#e7e1d4', dark: '#191b17' };

  /**
   * @description Aplica un tema al documento: fija data-theme, persiste la
   *   elección, sincroniza meta theme-color y el botón, con transición suave
   *   opcional (desactivada si el usuario prefiere movimiento reducido).
   * @param {'light'|'dark'} theme - Tema a aplicar.
   * @param {{ persist?: boolean, animate?: boolean }} [options] - Persistir en
   *   localStorage y animar el cambio de tema.
   * @returns {void}
   */
  const applyTheme = (theme, { persist = false, animate = false } = {}) => {
    const root = document.documentElement;
    if (animate && !prefersReduced.matches) {
      root.classList.add('theme-anim');
      window.setTimeout(() => root.classList.remove('theme-anim'), 300);
    }
    root.dataset.theme = theme;
    if (persist) window.localStorage.setItem('theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_BG[theme] ?? THEME_BG.light);
    syncToggle();
  };

  /**
   * @description Sincroniza el estado del botón de tema (aria-pressed y
   *   etiqueta descriptiva) con el tema actual del documento.
   * @returns {void}
   */
  const syncToggle = () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const isDark = document.documentElement.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  };

  /**
   * @description Enlaza el botón de tema una sola vez por elemento y deja el
   *   estado accesible en orden.
   * @returns {void}
   */
  const initTheme = () => {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle && !toggle.__themeBound) {
      toggle.__themeBound = true;
      toggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next, { persist: true, animate: true });
      });
    }
    syncToggle();
  };

  const revealObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    return observer;
  };
  let activeRevealObserver = null;
  let activeGroupObserver = null;

  /**
   * @description Inicializa el motor sobre el documento actual: observa
   *   reveals y grupos escalonados, y refresca progreso, header y parallax
   *   en cada frame de scroll (con trótele rAF).
   * @returns {void}
   */
  const initMotion = () => {
    initTheme();
    activeRevealObserver?.disconnect();
    activeGroupObserver?.disconnect();
    const year = document.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    const reduced = prefersReduced.matches;
    const hasIO = 'IntersectionObserver' in window;

    /* Reveals individuales (.reveal, con data-motion y data-delay opcionales). */
    const reveals = document.querySelectorAll('.reveal');
    if (hasIO && !reduced) {
      activeRevealObserver = revealObserver();
      reveals.forEach((element) => {
        const delay = element.dataset.delay;
        if (delay) element.style.transitionDelay = `${delay}ms`;
        activeRevealObserver.observe(element);
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
      activeGroupObserver = groupObserver;
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
    if (hasIO && !reduced) document.documentElement.classList.add('motion-ready');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
  document.addEventListener('astro:page-load', initMotion);
})();
