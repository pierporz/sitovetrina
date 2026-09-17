# Sito vetrina — Pierporz

Sito statico: nessuna dipendenza, nessun build. La home elenca i lavori,
filtrabili su tre assi indipendenti.

```
index.html            vetrina: hero, griglia filtrabile, contatti
assets/css/style.css  stile della vetrina
assets/js/app.js      logica dei filtri
demo/                 le pagine vere e proprie (autonome, CSS e JS inline)
```

## Tassonomia

| Asse | Valori attuali |
|---|---|
| Scopo | Pagina personale · Strumento interattivo |
| Stile | Disegno tecnico |
| Interazione | Scroll-driven · Click & hover · Input dati |

| Lavoro | Scopo | Stile | Interazione |
|---|---|---|---|
| `demo/pierporz-cervello.html` | Pagina personale | Disegno tecnico | Scroll-driven |
| `demo/pierporz-disegno.html` | Pagina personale | Disegno tecnico | Click & hover |
| `demo/massimali.html` | Strumento interattivo | Disegno tecnico | Input dati + Scroll-driven |

## Aggiungere un lavoro

1. Metti la pagina in `demo/` (deve reggersi da sola: niente dipendenze dal resto del repo).
2. In `index.html` duplica una `<article class="card">` e compila
   `data-purpose`, `data-style`, `data-interaction`.
   Un asse accetta **più valori separati da spazio**: `data-interaction="input scroll"`.
3. Se introduci un valore nuovo, aggiungi il `<button class="chip" data-value="...">`
   nella riga di filtro corrispondente.

Il contatore e lo stato "nessun risultato" si aggiornano da soli.

## Prima di pubblicare

Sostituire email (`ciao@pierporz.it`) e telefono (`+39 000 000 0000`) in `index.html`.

## Anteprima locale

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```
