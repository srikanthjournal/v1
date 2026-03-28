(() => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = current === '' || current === 'index.html' || current === 'Home.html';

  const showToast = (message, type = 'success') => {
    let container = document.querySelector('.toast-stack');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-stack';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 240);
    }, 2600);
  };

  const setActiveLinks = (root) => {
    root.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === current || (current.toLowerCase() === 'home.html' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  };

  const initHeaderRefine = () => {
    const topRow = document.querySelector('.top-row');
    if (topRow && !topRow.querySelector('.top-auth')) {
      const auth = document.createElement('div');
      auth.className = 'top-auth';
      auth.innerHTML = '<a href="#">Login</a><a href="#">Register</a>';
      topRow.appendChild(auth);
    }

    const headerRow = document.querySelector('.header-row');
    const header = document.querySelector('.main-header');
    headerRow?.querySelector('.header-search')?.remove();
    const logoHeading = document.querySelector('.logo-group h1');
    const logoGroup = document.querySelector('.logo-group');
    const logoSubline = document.querySelector('.logo-group p');
    const logoImage = document.querySelector('.logo-mark');
    if (logoHeading) logoHeading.textContent = 'International Journal of Scientific Research and Innovation';
    if (logoSubline) logoSubline.remove();
    if (logoImage) logoImage.remove();
    if (logoGroup && !logoGroup.querySelector('.logo-inline-icon')) {
      const icon = document.createElement('span');
      icon.className = 'logo-inline-icon';
      icon.innerHTML = '<img src="header-icon.svg" alt="Journal icon">';
      logoGroup.insertBefore(icon, logoGroup.firstChild);
    }

    if (header && !header.nextElementSibling?.classList.contains('ticker-bar')) {
      const ticker = document.createElement('div');
      ticker.className = 'ticker-bar';
      ticker.innerHTML = '<div class="ticker-track"><span>Call for Papers - Volume 14 | Indexed in Scopus | Impact Factor 8.76 | Fast Publication | </span><span>Call for Papers - Volume 14 | Indexed in Scopus | Impact Factor 8.76 | Fast Publication | </span></div>';
      header.insertAdjacentElement('afterend', ticker);
    }
  };

  const initNav = () => {
    const headers = document.querySelectorAll('.main-header');

    headers.forEach((header) => {
      const toggle = header.querySelector('.menu-toggle');
      const nav = header.querySelector('.nav-row');
      setActiveLinks(header);

      nav?.querySelectorAll('.has-submenu').forEach((item) => {
        const parentBtn = item.querySelector('.nav-parent');
        const links = item.querySelectorAll('.submenu a');
        const hasActiveChild = Array.from(links).some((a) => a.classList.contains('active'));
        if (hasActiveChild) item.classList.add('active');

        parentBtn?.addEventListener('click', (e) => {
          e.preventDefault();
          const willOpen = !item.classList.contains('open');
          nav.querySelectorAll('.has-submenu').forEach((el) => {
            if (el !== item) {
              el.classList.remove('open');
              el.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
            }
          });
          item.classList.toggle('open', willOpen);
          parentBtn.setAttribute('aria-expanded', String(willOpen));
        });
      });

      const closeMenu = () => {
        header.classList.remove('menu-open');
        toggle?.setAttribute('aria-expanded', 'false');
        nav?.querySelectorAll('.has-submenu').forEach((el) => {
          el.classList.remove('open');
          el.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
        });
      };

      toggle?.addEventListener('click', () => {
        const isOpen = header.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
      window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
      document.addEventListener('click', (e) => { if (!header.contains(e.target) && window.innerWidth <= 900) closeMenu(); });
      document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && window.innerWidth > 900) {
          nav?.querySelectorAll('.has-submenu').forEach((el) => {
            el.classList.remove('open');
            el.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
          });
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        nav?.querySelectorAll('.has-submenu').forEach((el) => {
          el.classList.remove('open');
          el.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
        });
      });
    });
  };

  const initHeroRefine = () => {
    if (!isHome) return;
    const hero = document.querySelector('.hero-band');
    const content = hero?.querySelector('.hero-content');
    if (!hero || !content) return;

    if (!content.querySelector('.hero-meta')) {
      const h2 = content.querySelector('h2');
      if (h2) {
        const meta = document.createElement('p');
        meta.className = 'hero-meta';
        meta.textContent = 'Peer Reviewed | Open Access | Monthly Journal';
        h2.insertAdjacentElement('afterend', meta);
      }
    }

    const oldChips = content.querySelector('.status-chips');
    if (oldChips) oldChips.remove();

    content.querySelector('.hero-actions')?.remove();
    content.querySelector('.hero-trust')?.remove();
    content.querySelector('.btn-light')?.remove();
    if (!content.querySelector('.hero-slider')) {
      const title = content.querySelector('h2');
      if (title) {
        const slider = document.createElement('div');
        slider.className = 'hero-slider';
        slider.setAttribute('role', 'region');
        slider.setAttribute('aria-label', 'Hero highlights');
        slider.innerHTML = `
          <article class="hero-slide is-active"><h2>International Journal<br>of Scientific Research<br>& Innovation</h2></article>
          <article class="hero-slide"><h2>International Journal<br>of Scientific Research<br>& Innovation</h2></article>
          <article class="hero-slide"><h2>International Journal<br>of Scientific Research<br>& Innovation</h2></article>
        `;
        title.replaceWith(slider);
      }
    }
    if (!document.querySelector('.quick-stats')) {
      const section = document.createElement('section');
      section.className = 'quick-stats';
      section.innerHTML = `
        <div class="container quick-stats-grid">
          <article><i data-lucide="file-text"></i><h3>24</h3><p>Published Papers</p></article>
          <article><i data-lucide="users"></i><h3>38</h3><p>Authors</p></article>
          <article><i data-lucide="globe-2"></i><h3>6</h3><p>Countries</p></article>
          <article><i data-lucide="clock-3"></i><h3>18</h3><p>Review Hours</p></article>
        </div>`;
      hero.insertAdjacentElement('afterend', section);
    }
  };

  const initHomeEnhancements = () => {
    if (!isHome) return;

    document.body.classList.add('home-plus');

    const quickStats = document.querySelector('.quick-stats');
    if (quickStats && !document.querySelector('.feature-banner')) {
      const banner = document.createElement('section');
      banner.className = 'feature-banner';
      banner.innerHTML = `
        <div class="container">
          <div class="feature-banner-slider" role="region" aria-label="Featured journal highlights">
            <article class="feature-banner-slide is-active">
              <small>Call For Papers</small>
              <h2>Submit original research for our upcoming quarterly issue.</h2>
              <p>Open access publishing with peer review, editorial support, and visibility for accepted papers.</p>
            </article>
            <article class="feature-banner-slide">
              <small>Scope Of Journal</small>
              <h2>Science, engineering, innovation, and interdisciplinary research publication.</h2>
              <p>A professional platform for scholars, faculty members, and early-career researchers.</p>
            </article>
            <article class="feature-banner-slide">
              <small>Publishing Support</small>
              <h2>Clear author guidelines, responsive updates, and issue-based publication workflow.</h2>
              <p>Designed to keep submission, review, and final publication structured and straightforward.</p>
            </article>
          </div>
          <div class="feature-banner-controls">
            <button type="button" class="fb-prev" aria-label="Previous banner slide"><</button>
            <button type="button" class="fb-next" aria-label="Next banner slide">></button>
          </div>
        </div>`;
      quickStats.insertAdjacentElement('beforebegin', banner);
    }

    const featureBanner = document.querySelector('.feature-banner-slider');
    const featureSlides = featureBanner ? Array.from(featureBanner.querySelectorAll('.feature-banner-slide')) : [];
    const featureControls = document.querySelector('.feature-banner-controls');
    if (featureBanner && featureControls && featureSlides.length > 1) {
      let featureIndex = 0;
      let featureTimer;

      const renderFeature = () => {
        featureSlides.forEach((slide, i) => {
          slide.classList.toggle('is-active', i === featureIndex);
        });
      };

      const nextFeature = () => {
        featureIndex = (featureIndex + 1) % featureSlides.length;
        renderFeature();
      };

      const prevFeature = () => {
        featureIndex = (featureIndex - 1 + featureSlides.length) % featureSlides.length;
        renderFeature();
      };

      const startFeature = () => {
        clearInterval(featureTimer);
        featureTimer = window.setInterval(nextFeature, 4200);
      };

      featureControls.querySelector('.fb-next')?.addEventListener('click', () => { nextFeature(); startFeature(); });
      featureControls.querySelector('.fb-prev')?.addEventListener('click', () => { prevFeature(); startFeature(); });
      featureBanner.addEventListener('mouseenter', () => clearInterval(featureTimer));
      featureBanner.addEventListener('mouseleave', startFeature);

      renderFeature();
      startFeature();
    }

    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = heroSlider ? Array.from(heroSlider.querySelectorAll('.hero-slide')) : [];
    if (heroSlider && heroSlides.length > 1 && !heroSlider.nextElementSibling?.classList.contains('hero-slider-controls')) {
      const controls = document.createElement('div');
      controls.className = 'hero-slider-controls';
      controls.innerHTML = '<button type="button" class="hero-prev" aria-label="Previous slide"><</button><button type="button" class="hero-next" aria-label="Next slide">></button>';
      heroSlider.insertAdjacentElement('afterend', controls);

      let heroIndex = 0;
      let heroTimer;

      const renderHero = () => {
        heroSlides.forEach((slide, i) => {
          slide.classList.toggle('is-active', i === heroIndex);
        });
      };

      const nextHero = () => {
        heroIndex = (heroIndex + 1) % heroSlides.length;
        renderHero();
      };

      const prevHero = () => {
        heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
        renderHero();
      };

      const startHero = () => {
        clearInterval(heroTimer);
        heroTimer = window.setInterval(nextHero, 3600);
      };

      controls.querySelector('.hero-next')?.addEventListener('click', () => { nextHero(); startHero(); });
      controls.querySelector('.hero-prev')?.addEventListener('click', () => { prevHero(); startHero(); });
      heroSlider.addEventListener('mouseenter', () => clearInterval(heroTimer));
      heroSlider.addEventListener('mouseleave', startHero);

      renderHero();
      startHero();
    }

    if (quickStats && !document.querySelector('.pub-highlights')) {
      const strip = document.createElement('section');
      strip.className = 'pub-highlights';
      strip.innerHTML = `
        <div class="container pub-highlights-grid">
          <article><strong>12 Days</strong><span>Avg. First Decision</span></article>
          <article><strong>31%</strong><span>Acceptance Rate</span></article>
          <article><strong>DOI Active</strong><span>Crossref Registration</span></article>
          <article><strong>2-3 Weeks</strong><span>Fast Publication Window</span></article>
        </div>`;
      quickStats.insertAdjacentElement('afterend', strip);
    }

    const testimonials = document.querySelector('.testimonials');
    const cards = testimonials ? Array.from(testimonials.querySelectorAll('article')) : [];
    if (!testimonials || cards.length < 2 || testimonials.classList.contains('testimonials-slider')) return;

    testimonials.classList.add('testimonials-slider');
    testimonials.setAttribute('role', 'region');
    testimonials.setAttribute('aria-label', 'Author testimonials');

    const controls = document.createElement('div');
    controls.className = 'testimonial-controls';
    controls.innerHTML = '<button type="button" class="t-prev" aria-label="Previous testimonial">\u2039</button><button type="button" class="t-next" aria-label="Next testimonial">\u203A</button>';
    testimonials.insertAdjacentElement('afterend', controls);

    let index = 0;
    let timer;

    const render = () => {
      cards.forEach((card, i) => {
        card.classList.toggle('is-active', i === index);
      });
    };

    const next = () => {
      index = (index + 1) % cards.length;
      render();
    };

    const prev = () => {
      index = (index - 1 + cards.length) % cards.length;
      render();
    };

    const start = () => {
      clearInterval(timer);
      timer = window.setInterval(next, 4800);
    };

    controls.querySelector('.t-next')?.addEventListener('click', () => { next(); start(); });
    controls.querySelector('.t-prev')?.addEventListener('click', () => { prev(); start(); });

    testimonials.addEventListener('mouseenter', () => clearInterval(timer));
    testimonials.addEventListener('mouseleave', start);

    render();
    start();
  };

  const initBreadcrumbs = () => {
    const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (path === 'index.html' || path === 'home.html' || path === '') return;

    const map = {
      'currentissue.html': 'Current Issue',
      'archives.html': 'Archives',
      'issueview.html': 'Issue View',
      'articleview.html': 'Article View',
      'article-deeplearning.html': 'Deep Learning Article',
      'article-smartcities.html': 'Smart Cities Article',
      'article-nlp.html': 'NLP Article',
      'submitpaper.html': 'Submit Paper',
      'aimscope.html': 'Aim & Scope',
      'editorialboard.html': 'Editorial Board',
      'authorguidelines.html': 'Author Guidelines',
      'reviewprocess.html': 'Review Process',
      'publicationethics.html': 'Publication Ethics',
      'openaccess.html': 'Open Access Policy',
      'reviewersignup.html': 'Reviewer Signup',
      'reviewerrecognition.html': 'Reviewer Recognition',
      'contact.html': 'Contact'
    };

    const label = map[path] || 'Page';
    const target = document.querySelector('.ticker-bar') || document.querySelector('.main-header');
    if (!target || document.querySelector('.breadcrumbs-wrap')) return;

    const wrap = document.createElement('div');
    wrap.className = 'breadcrumbs-wrap';
    wrap.innerHTML = `<div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span>${label}</span></nav></div>`;
    target.insertAdjacentElement('afterend', wrap);
  };
  const initReveal = () => {
    const revealItems = document.querySelectorAll('.section-space, .page-content, .card, .article-list article');
    revealItems.forEach((el) => el.classList.add('reveal'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((el) => obs.observe(el));
  };

  const initSkeleton = () => {
    const blocks = document.querySelectorAll('.card, .article-list article, .announce-grid article');
    blocks.forEach((b) => b.classList.add('is-loading'));
    setTimeout(() => blocks.forEach((b) => b.classList.remove('is-loading')), 650);
  };

  const initProgress = () => {
    let wrap = document.querySelector('.scroll-progress');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'scroll-progress';
      wrap.innerHTML = '<span></span>';
      document.body.appendChild(wrap);
    }
    const bar = wrap.querySelector('span');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  const initBackToTop = () => {
    let btn = document.querySelector('.back-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-top';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = '<i data-lucide="arrow-up"></i>';
      document.body.appendChild(btn);
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const onScroll = () => btn.classList.toggle('show', window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  const initForms = () => {
    document.querySelectorAll('form').forEach((form) => {
      const submit = form.querySelector('button[type="submit"], .btn-primary');
      if (!submit) return;

      const handler = (e) => {
        e.preventDefault();
        const fields = form.querySelectorAll('input, textarea, select');
        let valid = true;

        fields.forEach((f) => {
          const required = f.hasAttribute('required') || f.type === 'email';
          if (!required) return;
          const value = (f.value || '').trim();
          const emailOK = f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          const fieldValid = value.length > 0 && emailOK;
          f.classList.toggle('field-error', !fieldValid);
          if (!fieldValid) valid = false;
        });

        if (!valid) {
          showToast('Please fill all required fields correctly.', 'error');
          return;
        }

        showToast('Submitted successfully (demo).', 'success');
        form.reset();
      };

      submit.addEventListener('click', handler);
      form.addEventListener('submit', handler);
    });
  };
  const initPageTransitions = () => {
    document.body.classList.add('page-enter');
    requestAnimationFrame(() => {
      document.body.classList.remove('page-enter');
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      if (link.hasAttribute('download') || link.target === '_blank') return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      e.preventDefault();
      document.body.classList.add('page-exit');
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 190);
    });
  };

  const injectSkipLink = () => {
    if (!document.querySelector('.skip-link')) {
      const skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#main-content';
      skip.textContent = 'Skip to main content';
      document.body.insertBefore(skip, document.body.firstChild);
    }

    const main = document.querySelector('main') || document.querySelector('.page-content') || document.body;
    if (!main.id) main.id = 'main-content';
  };

  initPageTransitions();
  injectSkipLink();
  initHeaderRefine();
  initNav();
  initBreadcrumbs();
  initHeroRefine();
  initHomeEnhancements();
  initForms();
  initReveal();
  initSkeleton();
  initProgress();
  initBackToTop();

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
})();








