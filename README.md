# 10th Ave VM Outsource Website

One-page website for 10th Ave Visual Merchandising Outsource.
Plain HTML, CSS and JavaScript. No install or build step.

## Run

Open `index.html` in a browser, or use the VS Code **Live Server** extension.

## Structure

```
index.html          page content
css/styles.css      styles (brand colors at the top)
js/main.js          menu, scroll effects, gallery, contact form
js/projects.js      project photo groups
images/             logos, banner, favicons and project photos
```

Images used by the page: `logo-symbol.png`, `logo-symbol-sm.png`, `banner.jpg`,
`banner-store.jpg`, `favicon-32.png`, `apple-touch-icon.png`.

## Add project photos

1. Save the photos in `images/`.
2. List them in `js/projects.js` under the matching group:

```js
{title:'Brand kiosks and displays', images:['images/kiosk-1.jpg','images/kiosk-2.jpg']}
```

Use photos without visible client names or logos.

## Brand

- Colors: cyan `#00ecf9`, ink `#231f20`
- Font: Arial

## Before going live

- Replace the Instagram link in `index.html` (search for `TODO`).
- Add project photos.
- Upload the folder to a host such as Netlify or GitHub Pages.

---

Website by [Percival Ignacio Jr](https://github.com/Shir-hue)