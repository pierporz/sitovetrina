(function () {
  'use strict';

  // Ogni card può dichiarare più valori per asse (es. data-interaction="input scroll").
  var state = { purpose: 'all', style: 'all', interaction: 'all' };
  var cards = Array.prototype.slice.call(document.querySelectorAll('#grid .card'));
  var count = document.getElementById('filterCount');
  var empty = document.getElementById('empty');

  function has(card, axis, value) {
    if (value === 'all') return true;
    return (card.dataset[axis] || '').split(/\s+/).indexOf(value) !== -1;
  }

  function apply() {
    var visible = 0;
    cards.forEach(function (card) {
      var ok = has(card, 'purpose', state.purpose) &&
               has(card, 'style', state.style) &&
               has(card, 'interaction', state.interaction);
      card.hidden = !ok;
      if (ok) visible++;
    });
    var word = cards.length === 1 ? ' lavoro' : ' lavori';
    if (count) {
      count.textContent = visible === cards.length
        ? cards.length + word
        : visible + ' di ' + cards.length + word;
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
      state = { purpose: 'all', style: 'all', interaction: 'all' };
      document.querySelectorAll('.chips').forEach(function (group) {
        group.querySelectorAll('.chip').forEach(function (c) {
          c.classList.toggle('is-active', c.dataset.value === 'all');
        });
      });
      apply();
    });
  }

  apply();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
