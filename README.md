# JD Properties – Website

Faqe interneti për agjencinë imobiliare JD Properties (React + Vite + React Router).

## Si ta nisësh

```bash
npm install
npm run dev
```

Hape në browser: http://localhost:5173

Për versionin final (për hosting): `npm run build`. Skedarët dalin te `dist/`.

## Faqet

- `/` – Kreu (hero me kërkim, prona të zgjedhura, shërbimet, klientët, CTA)
- `/properties` – Të gjitha pronat me filtra (shitje/qira, lloji, qyteti, renditja)
- `/properties/:id` – Detajet e pronës (galeri, karakteristika, formular, WhatsApp)
- `/about` – Rreth nesh
- `/contact` – Kontakti me hartë dhe formular

## Çfarë duhet të ndryshosh

| Çfarë | Ku |
|---|---|
| Telefoni, WhatsApp, email, adresa, Instagram | `src/data/site.js` |
| Pronat (titulli, çmimi, fotot, përshkrimi) | `src/data/properties.js` |
| Ngjyrat e faqes | `src/index.css` (variablat në krye, `--primary`) |
| Harta e zyrës | `src/pages/Contact.jsx` (iframe, `q=`) |
| Fotot tuaja | vendosi te `public/images/` dhe përdor `/images/emri.jpg` |

Formulari i kontaktit e hap mesazhin gati në WhatsApp (nuk ka nevojë për backend).

## Hosting (Netlify / Vercel)

Meqë faqja përdor React Router, që linket si `/properties/3` të hapen direkt:
- **Netlify**: skedari `public/_redirects` është gati.
- **Vercel**: skedari `vercel.json` është gati.
