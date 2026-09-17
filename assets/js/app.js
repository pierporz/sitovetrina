(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- filtri (ogni asse accetta più valori per riga) ---------- */
  var state = { purpose: 'all', style: 'all', interaction: 'all' };
  var rows = [].slice.call(document.querySelectorAll('#index .row'));
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };

  function has(row, axis, value) {
    return value === 'all' || (row.dataset[axis] || '').split(/\s+/).indexOf(value) !== -1;
  }

  function apply() {
    var visible = 0;
    rows.forEach(function (row) {
      var ok = has(row, 'purpose', state.purpose) &&
               has(row, 'style', state.style) &&
               has(row, 'interaction', state.interaction);
      row.hidden = !ok;
      if (ok) visible++;
    });
    if (count) count.textContent = pad(visible) + ' / ' + pad(rows.length);
    if (empty) empty.hidden = visible !== 0;
    if (!visible) hidePeek();
  }

  document.querySelectorAll('.chips').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
      chip.classList.add('on');
      state[group.dataset.group] = chip.dataset.value;
      apply();
    });
  });

  var reset = document.getElementById('reset');
  if (reset) reset.addEventListener('click', function () {
    state = { purpose: 'all', style: 'all', interaction: 'all' };
    document.querySelectorAll('.chips').forEach(function (group) {
      group.querySelectorAll('.chip').forEach(function (c) {
        c.classList.toggle('on', c.dataset.value === 'all');
      });
    });
    apply();
  });

  apply();

  /* ---------- anteprima live che insegue il cursore ---------- */
  var peek = document.getElementById('peek');
  var frame = document.getElementById('peekFrame');
  var peekName = document.getElementById('peekName');
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches && innerWidth > 1024;
  var target = { x: 0, y: 0 }, at = { x: 0, y: 0 }, raf = null, loaded = '';

  function follow() {
    at.x += (target.x - at.x) * 0.16;
    at.y += (target.y - at.y) * 0.16;
    peek.style.translate = at.x.toFixed(1) + 'px ' + at.y.toFixed(1) + 'px';
    raf = Math.abs(target.x - at.x) + Math.abs(target.y - at.y) > 0.4
      ? requestAnimationFrame(follow) : null;
  }

  function moveTo(x, y) {
    // resta dentro la finestra
    target.x = Math.max(240, Math.min(innerWidth - 240, x));
    target.y = Math.max(170, Math.min(innerHeight - 170, y));
    if (!raf) raf = requestAnimationFrame(follow);
  }

  function hidePeek() { if (peek) peek.classList.remove('on'); }

  if (fine && peek && frame) {
    rows.forEach(function (row) {
      var link = row.querySelector('.row-a');
      var src = link.dataset.src;
      var name = row.querySelector('.slide b').textContent.trim();

      link.addEventListener('pointerenter', function (e) {
        if (loaded !== src) { frame.src = src; loaded = src; }
        peekName.textContent = name;
        frame.title = 'Anteprima: ' + name;
        at.x = e.clientX; at.y = e.clientY;   // parte dal cursore, senza scivolata iniziale
        moveTo(e.clientX, e.clientY);
        peek.classList.add('on');
      });
      link.addEventListener('pointermove', function (e) { moveTo(e.clientX, e.clientY); });
      link.addEventListener('pointerleave', hidePeek);
      link.addEventListener('blur', hidePeek);
    });
    addEventListener('scroll', hidePeek, { passive: true });
  }

  /* ---------- orologio ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var tick = function () {
      clock.textContent = new Intl.DateTimeFormat('it-IT', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'Europe/Rome'
      }).format(new Date());
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- rivelazione in scroll ---------- */
  var toReveal = [].slice.call(document.querySelectorAll('.works > *, .contact > *, .hero-foot'));
  if (!reduce && 'IntersectionObserver' in window) {
    toReveal.forEach(function (el) { el.classList.add('rev'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    toReveal.forEach(function (el) { io.observe(el); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
