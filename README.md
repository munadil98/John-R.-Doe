# John R. Doe Portfolio Website

This repository contains a static portfolio website.

## Files

- `index.html` – Website structure and content.
- `styles.css` – Visual styling for the portfolio.
- `script.js` – Dynamic footer year.
- `CNAME` – Custom subdomain configuration (`john-r-doe.yourdomain.com`).

## Preview locally

1. Start a local static server from the project root:
   ```bash
   python3 -m http.server 8080
   ```
2. Open your browser to:
   - `http://localhost:8080`
3. Stop the server with `Ctrl + C`.

## Publish with custom subdomain

1. Host these files on GitHub Pages, Netlify, Vercel, or Cloudflare Pages.
2. Keep the `CNAME` file at the root.
3. In your DNS provider, create a CNAME record:
   - Host: `john-r-doe`
   - Points to: your hosting target domain (for GitHub Pages, this is usually `<username>.github.io`).
4. Enable HTTPS in your hosting provider settings.
