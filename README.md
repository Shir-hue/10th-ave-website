# 10th Ave VM Outsource Website

One-page website for 10th Ave Visual Merchandising Outsource.
Plain HTML, CSS and JavaScript. No install or build step.

## Run

Open `index.html` in a browser, or use the VS Code **Live Server** extension.

## Structure

```
index.html          page content
css/styles.css      styles and brand colors (top of file)
js/main.js          gallery, menu, scroll effects, contact form
js/projects.js      project photo list
images/             logos, favicons and project photos
```

## Add project photos

1. Save the photos in `images/`.
2. List them in `js/projects.js`:

```js
{title:'VIVAIA', images:['images/vivaia-1.jpg','images/vivaia-2.jpg']}
```

## Brand

- Colors: cyan `#00ecf9`, ink `#231f20`
- Font: Arial

## Before going live

- Replace the Instagram link in `index.html` (search for `TODO`).
- Add project photos.
- Upload the folder to a host such as Netlify or GitHub Pages.

---

Website by [Percival Ignacio Jr](https://github.com/Shir-hue)