# Improvements

A focused, low-risk pass over QR Forge: production-readiness fixes, an honest
privacy story, a license, and one additive convenience feature. No build step
was introduced and no runtime behavior was changed beyond the items below.

## Fixes

- **Dropped the `cdn.tailwindcss.com` dev/play build.** That CDN is a
  just-in-time compiler intended for prototyping and prints a console warning
  telling you not to use it in production. Replaced it with a small, self-hosted
  stylesheet, [`assets/tw.css`](assets/tw.css), that contains **only** the
  Tailwind utility classes actually used in `index.html` (extracted by scanning
  every `class="…"` attribute and the class strings built in JS), plus the
  custom theme colors and font families that previously lived in the inline
  `tailwind.config`. Values mirror Tailwind's defaults (rem spacing scale,
  640/768/1024 px breakpoints) so the page renders the same. The runtime
  compiler `<script>` and the `tailwind.config` block were removed from the
  `<head>`. _(`index.html` head; `assets/tw.css`.)_

- **Removed the tracking that contradicted "0 tracking".** The footer advertised
  "0 tracking" / "100% client-side · no tracking" while the page loaded a
  GoatCounter beacon (`//gc.zgo.at/count.js`). Removed the beacon from both
  `index.html` and `blog.html` so the claim is literally true. Updated the
  `blog.html` footer note and the `README.md` "Analytics" section (now
  "Privacy") to match reality. _(Removed from `index.html` `<head>` and
  `blog.html` `<head>`; copy updated in `blog.html`, `README.md`.)_

- **De-duplicated Google Fonts.** Google Fonts was requested twice in
  `index.html`: once in the main `<head>` and again inside the print/business-card
  popup document (`printCard` handler). Syne and Space Mono are already loaded —
  and therefore browser-cached — by the opener, so the popup's second
  `<link>` was a redundant request. Removed it; the card still renders in those
  fonts from cache, with the existing Arial / monospace fallbacks. _(`index.html`,
  `printCard` popup markup.)_

## New features

The originally-suggested feature set — **SVG (vector) download**, an
**error-correction level selector (L/M/Q/H)**, and a **size + quiet-margin
control** — turned out to be **already implemented** in the app, so re-adding
them would have been redundant and risky:

- SVG download: the format chips include `SVG` and `#dlCta` calls `renderSVG()`.
- Error-correction selector: the "advanced" panel has L/M/Q/H chips
  (`[data-ec]`) wired to `state.ec`.
- Size control: the download `#resolution` select (512–4096 px).
- Quiet-margin control: the `#margin` range slider (0–12) in the same panel.

Rather than duplicate those, this pass adds one genuinely new, self-contained,
low-risk convenience feature:

- **Copy SVG code to clipboard.** A new `</> copy svg code` button in the
  Download panel copies the vector SVG markup straight to the clipboard, so it
  can be pasted inline into a web page, an email template, or a design tool
  without a download round-trip. It reuses the existing `renderSVG()` function
  and the app's established clipboard + `setStatus` patterns, and falls back to
  a `.svg` download if the clipboard is blocked. _(`#copySvgCode` button in the
  download panel + its click handler in the main script.)_

## License

Added a standard MIT `LICENSE` (`Copyright (c) 2026 Michael Baffour Awuah`).
The `README` already stated the project is MIT but the repository shipped no
license file; this makes the license explicit and machine-detectable. No
existing license was present, so nothing was overwritten.

## Verification

- Extracted the inline `<script>` blocks from `index.html` and ran
  `node --check` on them — no syntax errors.
- Re-scanned the markup to confirm every used utility class is now provided by
  `assets/tw.css` (the only unmatched names are JS marker/hook classes and
  component classes defined in the page's own inline `<style>`).
- Grepped to confirm no `cdn.tailwindcss.com`, `tailwind.config`, or
  `goatcounter` / `gc.zgo.at` references remain.
