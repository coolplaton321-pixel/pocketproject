# QR Redirect Operations

## Stable QR URL
Print this URL in your QR code and keep it forever:

`https://mydomain.com/qr`

## How to change destination later
1. Open `config/redirects.json`.
2. Change `qr_target` to the new HTTPS page.
3. Deploy.
4. Test `https://mydomain.com/qr` from a phone scan.

Example:

```json
{
  "qr_target": "https://mydomain.com/spring-campaign"
}
```

## What breaks redirect
- Invalid JSON in `config/redirects.json`
- Missing `qr_target`
- Non-HTTPS value in `qr_target`
- Missing `/qr` route files

## Current files
- `qr/index.html` (entry page)
- `js/qr-redirect.js` (redirect logic)
- `config/redirects.json` (editable target)
- `fallback/qr-unavailable.html` (failsafe page)
