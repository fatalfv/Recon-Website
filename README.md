# Gilded static website

A no-build HTML/CSS/JavaScript recreation of the supplied Gilded screenshots.

## Files

- `index.html` — site structure and content
- `styles.css` — dark navy/gold design
- `script.js` — pack purchase modal and validation

## Before publishing

1. Replace the Discord URL in `index.html`.
2. Replace the launcher download URL.
3. Replace the PayPal URL in `script.js` with your own official PayPal checkout/payment link.
4. Add your real Terms of Service and refund policy.
5. Do not collect Discord passwords, tokens, gift-card codes, or other credentials.
6. If you add order/Discord-webhook automation, put it in a Cloudflare Pages Function/Worker and keep webhook secrets in Cloudflare environment variables.

## GitHub + Cloudflare Pages

This is a static site, so there is no npm install/build command.

### GitHub

Create a repository, for example `gilded-site`, then upload these files to the repository root.

### Cloudflare Pages

In Cloudflare:
- Workers & Pages → Create application → Pages → Connect to Git
- Select GitHub and choose the repository
- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/` (or leave the default if Cloudflare accepts the root)
- Deploy

Cloudflare will give you a free `*.pages.dev` address.

For example, if the project is named `gilded-site`, your address can be:
`https://gilded-site.pages.dev`

If that exact name is already taken, choose another project name.

## Payments

The included PayPal button intentionally points to PayPal's public site until you configure your own checkout. A real payment flow should use your own PayPal account/integration and a server-side order endpoint. Never put private API credentials or Discord webhook secrets in `script.js`.
