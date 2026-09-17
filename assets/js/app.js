(function () {
  'use strict';

  var state = { purpose: 'all', style: 'all' };
  var cards = Array.prototype.slice.call(document.querySelectorAll('#grid .card'));
  var count = document.getElementById('filterCount');
  var empty = document.getElementById('empty');

  function apply() {
    var visible = 0;
    cards.forEach(function (card) {
      var ok =
        (state.purpose === 'all' || card.dataset.purpose === state.purpose) &&
        (state.style === 'all' || card.dataset.style === state.style);
      card.hidden = !ok;
      if (ok) visible++;
    });
    if (count) {
      count.textContent = visible === cards.length
        ? cards.length + ' progetti'
        : visible + ' di ' + cards.length + ' progetti';
    }
    if (empty) empty.hidden = visible !== 0;
  }

  document.querySelectorAll('.chips').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      state[group.dataset.group] = chip.dataset.value;
      apply();
    });
  });

  var reset = document.getElementById('resetFilters');
  if (reset) {
    reset.addEventListener('click', function () {
      state = { purpose: 'all', style: 'all' };
      document.querySelectorAll('.chips').forEach(function (group) {
        group.querySelectorAll('.chip').forEach(function (c) {
          c.classList.toggle('is-active', c.dataset.value === 'all');
        });
      });
      apply();
    });
  }

  apply();

  // Contatti: senza backend apre il client di posta con il messaggio precompilato.
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').trim();
      var email = (data.get('email') || '').trim();
      var message = (data.get('message') || '').trim();

      if (!name || !email || !message) {
        note.textContent = 'Compila nome, email e messaggio.';
        note.classList.add('error');
        return;
      }
      note.classList.remove('error');
      note.textContent = 'Apro il tuo programma di posta con la richiesta già pronta…';

      var body =
        'Nome: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Tipo di sito: ' + (data.get('type') || '—') + '\n\n' +
        message;
      window.location.href =
        'mailto:ciao@pierporz.it?subject=' + encodeURIComponent('Richiesta consulenza — ' + name) +
        '&body=' + encodeURIComponent(body);
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
