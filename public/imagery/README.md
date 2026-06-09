# Imagery — drag-and-drop workflow

The website looks for three image files in this folder. As long as a file lives
at the exact path listed below, the page will pick it up automatically. If a
file is missing, that slot renders a Light Gray "Image pending" placeholder
instead — no broken-image icons, no JSX errors.

**You never have to touch any code.** Just save the image at the path shown.

---

## The three image slots

### 1. Home page — Services bento (Google Ads card)

| Field | Value |
|---|---|
| **Save to** | `public/imagery/services/google-ads.webp` |
| **Aspect ratio** | 16 : 9 |
| **Min dimensions** | 1280 × 720 |
| **Where it appears** | Home page, "What we build" section, Google Ads card (the wide one on the left) |
| **Prompt seed** | *"Strategist reviewing a Google Ads dashboard for a Florida roofing campaign. Bright modern office, natural daylight from window, clean composition, no harsh shadows, authentic B2B editorial photography, shallow depth of field, no overlay text, no logos."* |

### 2. Home page — Detail Block 05 (CTA summary)

| Field | Value |
|---|---|
| **Save to** | `public/imagery/proof/before-after.webp` |
| **Aspect ratio** | 16 : 9 |
| **Min dimensions** | 1280 × 720 |
| **Where it appears** | Home page, end of "The Audit" section, Detail Block 05 |
| **Prompt seed** | *"Side-by-side residential roof before-and-after. Left frame: aging asphalt shingles with weathering. Right frame: same roof, freshly installed clean shingles. Daylight, Florida home with palm tree, no overlay text, documentary photography, clean composition."* |

### 3. Free Audit page — Hero right column

| Field | Value |
|---|---|
| **Save to** | `public/imagery/audit-hero/owner-laptop.webp` |
| **Aspect ratio** | 5 : 6 (portrait) |
| **Min dimensions** | 1000 × 1200 |
| **Where it appears** | `/free-audit` page, hero right column |
| **Prompt seed** | *"Roofing-business owner in his 40s reviewing a Google Ads dashboard on a laptop at a clean modern office desk. Natural daylight from window behind him. Focused expression, candid, authentic. B2B editorial portrait, shallow depth of field, no overlay text, no logos."* |

---

## How to actually do this

1. **Generate the image** in Midjourney, Sora (ChatGPT Plus), Flux, or Adobe Firefly using the prompt seed above.
2. **Convert to `.webp`** if your tool exports PNG or JPG. Free tool: [squoosh.app](https://squoosh.app) — drag your file in, pick WebP, download.
3. **Save the file** to the path shown above. Use Finder/Explorer; you don't need a terminal.
4. **Refresh the browser.** The image takes over the placeholder slot.

That's it. No JSX. No code. No rebuild needed if `npm run dev` is running.

---

## Other things to know

- **WebP** is required (or change the extension in the JSX to match what you saved). WebP is ~30% smaller than PNG/JPG at the same quality, which keeps the page fast.
- **Keep file size under 300 kb** per image. Squoosh.app shows the output size — aim for that.
- **Alt text** is already written into the JSX for accessibility. If you want to change what screen readers say about an image, edit the `alt=` value in the component file shown for each slot.
- **No image is a valid state.** The placeholder is honest design — it says "image pending" to sighted users and to screen readers. You can ship the site without imagery; the placeholders won't look broken.
- **Brand kit imagery direction** (from the brand-kit PDF): professional, authentic, daylight, no harsh shadows, clean composition. The prompts above follow this. Don't go cinematic / moody / dramatic.

---

## If you want to add more image slots later

The `AIImagePlate` component (in `src/motion/AIImagePlate.jsx`) takes `src` and `alt` props. To add a new slot somewhere on the page, drop `<AIImagePlate src="/imagery/some-new-slot/filename.webp" alt="..." />` into the JSX. Then save the file to that path and refresh. That's a code edit (one line) but the workflow above stays the same.
