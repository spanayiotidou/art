# Art Gallery Site

A simple, no-build-step website for showcasing paintings. Plain HTML/CSS/JS —
no frameworks, no npm install, nothing to compile. Works directly on GitHub Pages.

## Structure

```
index.html        The whole site (hero, gallery, about, contact, lightbox markup)
css/style.css      All styling
js/paintings.js    <-- YOUR PAINTING DATA GOES HERE. Edit this file to add/remove/update work.
js/script.js       Renders the gallery + runs the lightbox. You shouldn't need to touch this.
images/            Put your painting image files here (replace the sample-*.svg files)
```

## Adding your own paintings

1. Add your image file(s) to the `images/` folder (jpg, png, or webp all work).
2. Open `js/paintings.js`.
3. Copy one of the existing entries, give it a new unique `id`, and fill in:
   - `title`, `year`, `medium`, `dimensions`
   - `status` — must be exactly `"available"`, `"sold"`, or `"inquire"`
   - `price` — only shown if `status` is `"available"`; leave as `""` to hide it
   - `description` — a short paragraph
   - `image` — path to your file, e.g. `"images/coastal-drift.jpg"`
4. Save and refresh the page. No build step, no restart needed.

Delete the five sample entries (and sample-*.svg files) once you've added your own work.

## Image tips

- Keep images reasonably compressed (a few hundred KB, not multiple MB) so the
  site loads quickly — most phone photos of paintings can be resized down to
  ~1500px on the long edge without losing meaningful quality for web viewing.
- `.jpg` is fine for photos of paintings; `.webp` is smaller if your image
  editor supports exporting it.
- Use a consistent aspect ratio if you want the grid to look tidy, though it's
  not required — the grid crops thumbnails to fit, and the lightbox always
  shows the full uncropped image.

## Editing site text

- Studio name / nav: top of `index.html`, inside `<header class="site-header">`.
- Hero headline and subtext: `<section class="hero">`.
- About paragraph: `<section id="about">`.
- Contact email: `<section id="contact">` — it's a plain `mailto:` link, so no
  backend or form service is required. Update the address there.

## Changing colors / fonts

All design tokens are at the top of `css/style.css` under `:root`, e.g.:

```css
:root {
  --bg:      #15171A;   /* background */
  --ink:     #F2EDE4;   /* text color */
  --accent:  #B08D57;   /* accent color used for labels, links, highlights */
  ...
}
```

Change a value there and it updates everywhere it's used.

## Running locally

Just open `index.html` in a browser — everything is static, no server required.
(Some browsers restrict local file access slightly; if images don't load, run
a tiny local server instead, e.g. `python3 -m http.server` from this folder,
then visit `http://localhost:8000`.)

## Publishing to GitHub Pages

1. Create a new GitHub repository and push all these files to it.
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   choose your default branch (e.g. `main`) and the `/ (root)` folder.
4. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.
5. Optional: add a custom domain later under the same Pages settings.
