# QR Forge

> A free, open-source QR code generator with Ghanaian Adinkra symbols, Kente cloth patterns, and cultural motifs from around the world — built entirely in the browser.

**[Try it live →](https://mbaffour.github.io/qr-forge)** &nbsp;|&nbsp; **[Read the blog →](https://mbaffour.github.io/qr-forge/blog.html)**

---

## Features

- **10 content types** — Website (with UTM tracking), Plain Text, Phone Call, Social Profile (9 platforms), App Store (iOS/Android/Both), WiFi Login, Contact Card (vCard), Email, SMS, Location
- **Cultural finder patterns** — 8 Adinkra symbols + 6 world symbols drawn into the QR corner squares
- **Themed presets** — Kente, Ashanti Gold, Sankofa, Taoist, Egyptian, Celtic, Māori, Norse, Buddhist, and more
- **Print-ready business cards** — Contact Card type generates a 3.5 × 2 in card, downloadable as PNG or printable directly
- **Day / Night / Ambient modes**
- **Download as PNG, SVG, JPEG, or WebP** — up to 4096px for print, with a custom filename you set before downloading (saved across sessions)
- **100% client-side** — no server, no account, no data uploaded

## Cultural Symbols

### 🇬🇭 Adinkra — Ghana
| Symbol | Meaning |
|--------|---------|
| Adinkrahene | Chief of Adinkra symbols — leadership |
| Gye Nyame | Except for God — supremacy of the divine |
| Sankofa | Go back and fetch it — learning from the past |
| Nyame Dua | Altar of God — presence and protection |
| Akoma | Heart — patience and goodwill |
| Dwennimmen | Ram's horns — strength with humility |
| Aya | Fern — endurance and resilience |
| Fawohodie | Freedom star — independence |

### 🌍 World Symbols
| Symbol | Origin | Meaning |
|--------|--------|---------|
| Yin Yang | China · Taoism | Balance and duality |
| Ankh | Ancient Egypt | Life and immortality |
| Triquetra | Celtic Europe | Trinity and eternity |
| Koru | Māori · New Zealand | New life and growth |
| Vegvísir | Norse · Iceland | Wayfinding and guidance |
| Endless Knot | Tibetan · Buddhist | Interconnectedness |

## Usage

Just open `index.html` in any modern browser. No build step, no dependencies to install.

```bash
git clone https://github.com/mbaffour/qr-forge.git
cd qr-forge
open index.html   # or double-click it
```

## Analytics

Visitor stats are tracked via [GoatCounter](https://www.goatcounter.com) — privacy-friendly, no cookies, GDPR-compliant. View stats at `https://qr-forge.goatcounter.com`.

> **To use your own analytics:** sign up at [goatcounter.com](https://www.goatcounter.com), create a site with code `qr-forge` (or any code), and the tracking script in both `index.html` and `blog.html` will start sending data to your dashboard.

## Contributing

Pull requests welcome. If you know an Adinkra symbol we missed, or want to add a cultural motif from your tradition, open an issue or PR — finder patterns are drawn in the `drawFinder()` function using the Canvas 2D API.

## License

MIT — do whatever you want with it.
