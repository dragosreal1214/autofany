# AutoFany — Școală de șoferi în Iași

Site de prezentare pentru școala de șoferi **AutoFany** (Auto Fany ABC SRL) din Iași.
Construit ca site static, fără build step — HTML, CSS și JavaScript vanilla.

🔗 **Live:** _(se completează după deploy pe Vercel)_

## Despre școală

- 📍 Bd. Dacia nr. 57, bloc DD6, parter, Iași
- 📞 0755 336 464 · [www.autofany.ro](http://www.autofany.ro) · [facebook.com/autofany](https://www.facebook.com/autofany)
- 🚗 Categorii: **A, B, BE, CE, D**
- ⭐ Singura școală din Iași cu **simulator auto** pentru pregătirea practică
- Pregătire practică pe Volkswagen Polo Diesel · cursuri de reîmprospătare

## Secțiuni

Hero · Categorii · Cursuri · **Parc auto** · De ce noi · Pașii spre permis ·
Cifre · Prețuri · Despre · Testimoniale · Întrebări frecvente · Contact · Footer

## Tehnologii

- HTML5 semantic
- CSS3 (custom properties, grid, flexbox, responsive mobile-first)
- JavaScript vanilla (meniu mobil, animații la scroll, contoare, validare formular)
- Fonturi: Plus Jakarta Sans + Inter (Google Fonts)
- Identitate vizuală: navy `#0B1B3F` + accent galben `#F4B41A`

## Rulare locală

Site static — deschide `index.html` direct în browser sau pornește un server local:

```bash
# Python
python -m http.server 8000

# sau Node
npx serve
```

Apoi accesează `http://localhost:8000`.

## Deploy pe Vercel

Proiectul include `vercel.json` (cache headers + clean URLs). Nu există build step.

1. Importă repo-ul în [Vercel](https://vercel.com/new)
2. Framework Preset: **Other** (static)
3. Build Command: _(gol)_ · Output Directory: _(gol / root)_
4. Deploy

## Structură

```
.
├── index.html      # Pagina completă (toate secțiunile)
├── styles.css      # Stiluri + responsive
├── script.js       # Interacțiuni
├── vercel.json     # Configurare deploy
└── README.md
```
