# Pierporz — indice dei lavori

Sito statico: nessuna dipendenza, nessun build, nessun framework.
La home è un indice tipografico; ogni riga apre una pagina vera.

```
index.html            home: hero, indice filtrabile, contatti
assets/css/style.css  stile della home
assets/js/app.js      filtri, anteprima live, orologio, reveal
demo/                 le pagine (autonome: CSS e JS inline)
```

## Tassonomia

| Asse | Valori |
|---|---|
| Scopo | Pagina personale · Strumento interattivo · Sito per attività |
| Stile | Disegno tecnico · Interfaccia app · Minimal moderno · Scuro industriale · HUD immersivo |
| Interazione | Scroll-driven · Click & hover · Input dati · Trascinamento · Fisica al cursore · Audio & ritmo |

| # | Lavoro | Scopo | Stile | Interazione |
|---|---|---|---|---|
| 01 | `demo/pierporz-cervello.html` | Pagina personale | Disegno tecnico | Scroll-driven |
| 02 | `demo/pierporz-disegno.html` | Pagina personale | Disegno tecnico | Click & hover |
| 03 | `demo/massimali.html` | Strumento interattivo | Disegno tecnico | Input dati + Scroll-driven |
| 04 | `demo/pierporz-nodi.html` | Pagina personale | Interfaccia app | Trascinamento + Click |
| 05 | `demo/pierporz-nodale.html` | Pagina personale | Minimal moderno | Fisica al cursore + Click |
| 06 | `demo/cadenza-palestra.html` | Sito per attività | Interfaccia app | Audio & ritmo + Input dati + Click |
| 07 | `demo/molteni-elettricisti.html` | Sito per attività | Scuro industriale | Click & hover + Input dati |
| 08 | `demo/ponzio-idraulica.html` | Sito per attività | HUD immersivo | Scroll-driven + Click + Input dati |

## Aggiungere un lavoro

1. Metti la pagina in `demo/`: deve reggersi da sola, senza dipendenze dal resto del repo.
2. In `index.html` duplica un `<li class="row">` dell'indice e compila
   `data-purpose`, `data-style`, `data-interaction`.
   Ogni asse accetta **più valori separati da spazio**: `data-interaction="input scroll"`.
3. Il titolo va ripetuto tre volte dentro `.slide` (`<b>…</b><em>↗</em>` ×3):
   da fermo si legge una volta sola, al passaggio del cursore diventa un marquee.
4. `data-src` sul link è la pagina caricata nell'anteprima che segue il cursore.
5. Valore nuovo su un asse → aggiungi il `<button class="chip" data-value="...">` nella riga di filtro.

Contatore e stato "nessun risultato" si aggiornano da soli.

## Note di design

- Display **Bricolage Grotesque** (variabile: `wght`, `wdth`, `opsz`), meta in **JetBrains Mono**.
- Anteprima live: `<iframe>` della pagina reale scalato a 0.3, caricato solo al primo hover,
  disattivato sotto i 1024px e sui dispositivi senza puntatore fine.
- Tutte le animazioni rispettano `prefers-reduced-motion`.

## Prima di pubblicare

Sostituire email (`ciao@pierporz.it`) e telefono (`+39 000 000 0000`) in `index.html`.

## Anteprima locale

```bash
python3 -m http.server 8000
```

## Pubblicazione (Cloudflare Pages)

Build command: **vuoto** · Build output directory: **`/`** · Framework preset: **None**.
