// Cloudflare Web Analytics — cookieless, privacy-preserving.
// No consent banner required under GDPR/ePrivacy (no cookies, no
// fingerprinting, no identifiers persisted on the device).
//
// Manual Setup: the beacon is loaded here as an external script so the
// strict CSP does not need 'unsafe-inline' or rotating script hashes.

const CF_BEACON_TOKEN = 'd3cddc0be4cf424288a21c78e1f962b4';

const s = document.createElement('script');
s.defer = true;
s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
s.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_BEACON_TOKEN }));
document.head.appendChild(s);
