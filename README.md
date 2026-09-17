# Sito vetrina — Pierporz

Sito vetrina personale per mostrare i tipi di siti che posso realizzare e raccogliere
richieste di consulenza. HTML/CSS/JS statico: nessuna dipendenza, nessun build.

## Struttura

```
index.html              vetrina: hero, portfolio filtrabile, servizi, processo, contatti
assets/css/style.css    stile della vetrina + barra "torna alla vetrina" delle demo
assets/js/app.js        filtri per scopo/stile e invio del modulo contatti
demo/                   9 demo navigabili, ognuna con il proprio stile grafico
```

## Le demo

| Demo | Scopo | Stile |
|---|---|---|
| `demo/osteria.html` | Ristorazione | Elegante |
| `demo/nordic.html` | Creativi | Minimal |
| `demo/atelier.html` | E-commerce | Editoriale |
| `demo/studio-legale.html` | Studi professionali | Elegante |
| `demo/flowbase.html` | Startup & SaaS | Dark / Tech |
| `demo/vita-yoga.html` | Benessere & sport | Colorato |
| `demo/iron-gym.html` | Benessere & sport | Bold |
| `demo/casa-milano.html` | Immobiliare | Minimal |
| `demo/fiori-darancio.html` | Eventi | Editoriale |

I contenuti delle demo sono inventati e servono solo da esempio.

## Aggiungere un progetto

1. Crea `demo/nome.html` (copia la demo più vicina come base).
2. In `index.html` duplica una `<article class="card">` e imposta
   `data-purpose` e `data-style` con uno dei valori già usati dai filtri
   (oppure aggiungi un nuovo `<button class="chip" data-value="...">`).
3. Aggiungi la classe dell'anteprima (`.thumb-nome`) in `assets/css/style.css`.

I filtri e il contatore si aggiornano da soli.

## Prima di pubblicare

- Sostituisci l'indirizzo email `ciao@pierporz.it` in `index.html` e in `assets/js/app.js`.
- Aggiorna prezzi e testi dei servizi.
- Il modulo contatti non ha backend: apre il client di posta con il messaggio precompilato.
  Per ricevere le richieste via web, collega un servizio tipo Formspree impostando
  `action` e `method` sul form.

## Anteprima locale

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Pubblicazione

Va bene qualsiasi hosting statico. Con GitHub Pages: Settings → Pages →
Deploy from a branch → branch `main`, cartella `/ (root)`.
