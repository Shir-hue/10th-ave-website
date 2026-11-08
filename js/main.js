/* 10th Ave VM Outsource: page behavior
   Needs js/projects.js loaded first (defines CLOUD_NAME and PROJECTS). */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var byId = function (id) { return document.getElementById(id); };

  /* ---------- Project gallery ---------- */
  var gallery = byId('gallery');
  var lightbox = byId('lb');
  var lightboxImg = lightbox.querySelector('img');

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  /* Adds photos tagged for this project from Cloudinary (only if CLOUD_NAME is set). */
  function loadCloudinaryPhotos(project) {
    if (!CLOUD_NAME) return Promise.resolve();
    var base = 'https://res.cloudinary.com/' + CLOUD_NAME + '/image/';
    var tag = project.tag || slugify(project.title);
    return fetch(base + 'list/' + tag + '.json')
      .then(function (res) { return res.ok ? res.json() : { resources: [] }; })
      .then(function (data) {
        (data.resources || []).forEach(function (r) {
          project.images.push(base + 'upload/f_auto,q_auto,w_1400/v' + r.version + '/' + r.public_id + '.' + r.format);
        });
      })
      .catch(function () { /* keep the page working if the photo service is unreachable */ });
  }

  function renderGallery() {
    PROJECTS.forEach(function (project) {
      var group = document.createElement('div');
      group.className = 'grp';

      var title = document.createElement('h3');
      title.textContent = project.title;
      group.appendChild(title);

      var grid = document.createElement('div');
      grid.className = 'grid';

      if (!project.images.length) {
        var placeholder = document.createElement('div');
        placeholder.className = 'ph';
        placeholder.textContent = 'Photos coming soon';
        grid.appendChild(placeholder);
      }

      project.images.forEach(function (src, i) {
        var button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', project.title + ' photo ' + (i + 1));

        var img = document.createElement('img');
        img.src = src;
        img.alt = project.title + ' project photo ' + (i + 1);
        img.loading = 'lazy';

        button.appendChild(img);
        button.addEventListener('click', function () {
          lightboxImg.src = src;
          lightboxImg.alt = img.alt;
          lightbox.showModal();
        });
        grid.appendChild(button);
      });

      group.appendChild(grid);
      gallery.appendChild(group);
    });
  }

  lightbox.addEventListener('click', function (e) {
    if (e.target !== lightboxImg) lightbox.close();
  });

  Promise.all(PROJECTS.map(loadCloudinaryPhotos)).then(renderGallery);

  /* ---------- Contact form: opens the visitor's email app ---------- */
  byId('f').addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(this);
    var subject = 'Project inquiry from ' + data.get('name');
    byId('form-note').textContent = 'Opening your email app. If nothing opens, please email 10thavenue.vmsd@gmail.com directly.';
    var body = 'Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\n\n' + data.get('msg');
    window.location.href = 'mailto:10thavenue.vmsd@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  /* ---------- Mobile menu ---------- */
  var menuButton = byId('menu');
  var nav = byId('nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', open);
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuButton.addEventListener('click', function () {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) setMenu(false);
  });

  /* ---------- Header shadow and back-to-top visibility ---------- */
  var header = document.querySelector('header');
  var toTopButton = byId('totop');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
    toTopButton.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Back to top: slow start, fast middle, soft landing ---------- */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  toTopButton.addEventListener('click', function () {
    var start = window.scrollY;
    if (!start) return;
    if (reduceMotion) { window.scrollTo(0, 0); return; }

    var root = document.documentElement;
    var duration = Math.min(1400, Math.max(700, start * 0.35));
    var startTime = null;
    var cancelled = false;

    function cancel() { cancelled = true; }
    function finish() {
      root.style.scrollBehavior = '';
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    }
    function step(now) {
      if (startTime === null) startTime = now;
      var progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
      if (progress < 1 && !cancelled) requestAnimationFrame(step);
      else finish();
    }

    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    root.style.scrollBehavior = 'auto'; /* stop CSS smooth-scroll fighting the animation */
    requestAnimationFrame(step);
  });

  /* ---------- Scroll reveal ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.head, .about .txt, .svc, .step, .band .wrap > *, .person, .contact .wrap > *'
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('in');
        observer.unobserve(el);
        /* Remove helper classes afterwards so hover effects work normally */
        setTimeout(function () {
          el.classList.remove('reveal', 'in');
          el.style.removeProperty('--d');
        }, 1500);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      var index = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--d', (index % 6) * 0.08 + 's');
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();