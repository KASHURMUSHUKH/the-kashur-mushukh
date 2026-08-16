# The Kashur Mushukh — Website

A professional, responsive static website for The Kashur Mushukh perfume brand.

## Files

- `index.html` — website structure/content
- `style.css` — design and responsive styling
- `script.js` — WhatsApp order link, Instagram link, mobile menu
- `assets/kashur-mushukh-concept.png` — concept/product visual

## Before publishing

Open `script.js` and change:

1. `WHATSAPP_NUMBER` to your real business WhatsApp number.
2. `INSTAGRAM_URL` to your real Instagram profile.

Open `index.html` in a browser to preview it.

## Free hosting

### Option A — GitHub Pages
1. Create a free GitHub account.
2. Create a new public repository, e.g. `the-kashur-mushukh`.
3. Upload all files and the `assets` folder.
4. Open repository Settings → Pages.
5. Choose "Deploy from a branch", select `main`, folder `/root`, and save.
6. GitHub will give you a free `github.io` website address.

### Option B — Cloudflare Pages
1. Create a free Cloudflare account.
2. Create a Pages project.
3. Connect your GitHub repository.
4. Use the default build settings for a plain static HTML site.
5. Deploy.

## Important

This is a static marketing/catalogue website. It does not yet process card/UPI payments, calculate shipping, manage stock, or store customer orders in a database.

Those features can be added later without redesigning the brand.
