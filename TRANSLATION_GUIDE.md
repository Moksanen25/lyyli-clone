# 🌍 Käännösopas - Translation Guide

## ✅ Valmis tekninen infrastruktuuri

Sivuston tekninen infrastruktuuri on nyt valmis tukemaan viittä kieltä:

- 🇬🇧 English (en) - default
- 🇫🇮 Finnish (fi)
- 🇩🇪 German (de) - **UUSI**
- 🇪🇪 Estonian (et) - **UUSI**
- 🇸🇪 Swedish (sv) - **UUSI**

### Päivitetyt tiedostot:

- ✅ `next-intl.config.js` - Kielimääritykset
- ✅ `src/middleware.ts` - Reititys
- ✅ `src/lib/canonical.ts` - SEO & hreflang
- ✅ `src/app/sitemap.ts` - Sitemap
- ✅ `src/lib/blog.ts` - Blog-logiikka
- ✅ `scripts/generate-sitemap.mjs` - Sitemap-generaattori
- ✅ `rules/15-i18n.mdc` - Dokumentaatio

---

## 📝 Käännettävät tiedostot

### 1. UI-käännökset (KRIITTISTÄ)

**Tiedostot:**

- `src/translations/de.json` (672 käännösavainta)
- `src/translations/et.json` (672 käännösavainta)
- `src/translations/sv.json` (672 käännösavainta)

**Status:** ⚠️ Sisältää englanninkieliset placeholder-tekstit  
**Prioriteetti:** KORKEA - Ilman näitä sivusto näyttää englantia kaikilla kielillä

**Käännettävät kategoriat:**

- Navigaatio ja yleiset tekstit
- Kaikki sivujen sisällöt (about, features, pricing, contact, jne.)
- Lomakkeet ja validointiviestit
- SEO-metatiedot
- Virheviestit ja ilmoitukset

**Esimerkki avaimista:**

```json
{
  "hero.headline": "Stop losing critical messages — communicate clearly, confidently, and on time",
  "cta.startTrial": "Start free 30-day trial",
  "pricing.title": "Simple, transparent pricing"
}
```

---

### 2. FAQ-sisältö

**Tiedostot:**

- `content/faq/de.json`
- `content/faq/et.json`
- `content/faq/sv.json`

**Status:** ⚠️ Sisältää englanninkieliset placeholder-tekstit  
**Prioriteetti:** KESKITASO - FAQ-sivu toimii mutta englanninkielisellä sisällöllä

**Rakenne:**

```json
{
  "categories": [
    {
      "id": "general",
      "title": "General Questions",
      "questions": [
        {
          "id": "what-is-lyyli",
          "question": "What is Lyyli?",
          "answer": "Lyyli is an AI-powered..."
        }
      ]
    }
  ]
}
```

---

### 3. Blog-sisältö (Valinnaista alussa)

**Kansiot:**

- `content/blog/de/` (tyhjä)
- `content/blog/et/` (tyhjä)
- `content/blog/sv/` (tyhjä)

**Status:** ⚠️ Tyhjät kansiot  
**Prioriteetti:** MATALA - Voidaan lisätä myöhemmin tarpeen mukaan

**Format:** MDX-tiedostot (Markdown + frontmatter)

**Esimerkki:**

```mdx
---
title: 'Artikkelin otsikko'
description: 'Artikkelin kuvaus'
date: '2024-11-12'
category: 'Communication'
author: 'Lyyli Team'
readTime: 5
---

Artikkelin sisältö Markdown-muodossa...
```

---

### 4. Juridiset dokumentit

**Kansiot:**

- `content/legal/de/` (tyhjä)
- `content/legal/et/` (tyhjä)
- `content/legal/sv/` (tyhjä)

**Status:** ⚠️ Tyhjät kansiot  
**Prioriteetti:** KESKITASO - Tarvitaan ennen tuotantokäyttöä

**Tarvittavat dokumentit (8 kpl per kieli):**

1. `annex-1-service-description.mdx` - Palvelukuvaus
2. `annex-2-sla.mdx` - Palvelutasosopimus
3. `annex-3-dpa.mdx` - Data Processing Agreement
4. `annex-4-toms.mdx` - Technical & Organizational Measures
5. `annex-5-subprocessors.mdx` - Alaprosessorit
6. `annex-6-retention-deletion.mdx` - Tietojen säilytys ja poisto
7. `annex-7-it2022-terms.mdx` - IT2022-ehdot
8. `order-confirmation.mdx` - Tilausvahvistus

**Huom:** Nämä ovat juridisia dokumentteja, käännökset pitää tarkistaa lakimiehen kanssa!

---

## 🚀 Miten sivusto toimii nyt?

### Toimivat URL-rakenteet:

- `https://lyyli.ai/de` → Saksan etusivu
- `https://lyyli.ai/et/pricing` → Viron hinnoittelusivu
- `https://lyyli.ai/sv/features` → Ruotsin ominaisuudet
- `https://lyyli.ai/de/blog` → Saksan blogi (tyhjä)

### SEO & Hreflang:

Jokainen sivu sisältää automaattisesti hreflang-tagit kaikille kielille:

```html
<link rel="alternate" hreflang="en" href="https://lyyli.ai/en/pricing" />
<link rel="alternate" hreflang="fi" href="https://lyyli.ai/fi/pricing" />
<link rel="alternate" hreflang="de" href="https://lyyli.ai/de/pricing" />
<link rel="alternate" hreflang="et" href="https://lyyli.ai/et/pricing" />
<link rel="alternate" hreflang="sv" href="https://lyyli.ai/sv/pricing" />
<link rel="alternate" hreflang="x-default" href="https://lyyli.ai/en/pricing" />
```

### Help & Support:

**Huom:** Help & Support -sivut tarjotaan vain englanniksi ja suomeksi ohjeesi mukaisesti.

- DE/ET/SV: → Ohjautuu englanninkieliseen versioon

---

## 📋 Käännösprosessin suositus

### Vaihe 1: Yksi kieli kerrallaan

1. **Aloita yhdestä kielestä** (esim. Saksa tai Ruotsi)
2. Käännä UI-tekstit (`src/translations/de.json`)
3. Käännä FAQ (`content/faq/de.json`)
4. Testaa että sivusto toimii oikein
5. Siirry seuraavaan kieleen

### Vaihe 2: Käännöstyökalut

- **Suositus:** Käytä ammattikääntäjää tai käännöstoimistoa
- **Vaihtoehto:** DeepL Pro tai vastaava laadukas käännöspalvelu
- **Tärkeää:** Teknisten termien johdonmukaisuus

### Vaihe 3: Laadunvarmistus

- Natiivipuhujan tarkistus
- Teknisten termien oikeellisuus
- Brändiäänen säilyminen
- UI:n testaus (mahtuvatko tekstit layouttiin?)

---

## 🔧 Kehittäjille: Käännösten lisääminen

### Kun käännökset ovat valmiit:

1. **Korvaa placeholder-tekstit** käännöstiedostoissa
2. **Testaa paikallisesti:**
   ```bash
   npm run dev
   # Avaa http://localhost:3000/de
   ```
3. **Generoi sitemap:**
   ```bash
   npm run sitemap:generate
   ```
4. **Commitoi muutokset:**
   ```bash
   git add src/translations/ content/
   git commit -m "Add German/Estonian/Swedish translations"
   ```

### Uuden blogiartikkelin lisääminen:

```bash
# Luo uusi MDX-tiedosto
touch content/blog/de/artikkelini.mdx

# Lisää frontmatter ja sisältö
# Katso esimerkit content/blog/en/ kansiosta
```

---

## ⚠️ Kriittiset huomiot

1. **JSON-syntax:** Varmista että JSON on validi (ei puuttuvia pilkkuja, lainausmerkkejä jne.)
2. **Muuttujat:** Säilytä muuttujat kuten `{amount}`, `{start}`, `{end}` käännöksissä
3. **HTML-tagit:** Säilytä HTML-tagit jos sellaisia on
4. **Erikoismerkit:** Käytä Unicode-escape sequencea jos tarpeen
5. **Rivivaihto:** JSON-tiedostoissa `\n` rivinvaihdolle

### Esimerkki muuttujista:

```json
{
  "pricing.savePerYear": "Save {amount}€ per year",
  "blog.pagination.showing": "Showing {start} to {end} of {total} posts"
}
```

---

## 📊 Työmäärän arvio

### UI-käännökset (per kieli):

- **Tekstimäärä:** ~50,000 sanaa (672 avainta)
- **Arvioitu aika:** 15-20 tuntia ammattikääntäjälle
- **Kustannus:** n. 800-1200€ per kieli

### FAQ-sisältö (per kieli):

- **Tekstimäärä:** ~2,000 sanaa
- **Arvioitu aika:** 2-3 tuntia
- **Kustannus:** n. 100-150€ per kieli

### Juridiset dokumentit (per kieli):

- **Tekstimäärä:** ~15,000 sanaa (8 dokumenttia)
- **Arvioitu aika:** 10-15 tuntia + lakimiehen tarkistus
- **Kustannus:** n. 600-900€ + lakitarkistus per kieli

---

## 🆘 Tuki

Jos tarvitset apua käännösprosessin kanssa:

- **Tekninen tuki:** Kehittäjät voivat auttaa JSON-rakenteessa ja testauksessa
- **Käännökset:** Suosittelen ammattikääntäjää tai käännöstoimistoa
- **Lakitekstit:** Yhteistyö lakimiehen kanssa välttämätöntä

---

**Luotu:** 2024-11-12  
**Versio:** 1.0  
**Status:** Tekninen infrastruktuuri valmis, odottaa käännöksiä

