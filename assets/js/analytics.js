// Strict consent: gtag.js is loaded only after the visitor clicks Accept.
// No Google script is fetched before consent, satisfying AEPD's strict
// interpretation of LSSI-CE Art. 22 (consent required before loading
// non-essential third-party scripts, not just before setting cookies).
//
// Visitor choice (granted / denied) is persisted in localStorage so the
// banner appears only on first visit; subsequent visits respect the
// previous decision without prompting and without loading gtag.js.

const GA_ID = 'G-RKXTH8PTT5';
const STORAGE_KEY = 'rq-consent';

let gtagLoaded = false;

function loadGtag() {
    if (gtagLoaded) return;
    gtagLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
}

function grant() {
    try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch (e) {}
    loadGtag();
}

function deny() {
    try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch (e) {}
}

// Restore previous decision, if any.
let stored = null;
try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

if (stored === 'granted') {
    loadGtag();
} else if (stored !== 'denied') {
    showBanner();
}

function showBanner() {
    const banner = document.createElement('aside');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');

    const inner = document.createElement('div');
    inner.className = 'cookie-banner-inner';

    const text = document.createElement('p');
    text.innerHTML = 'This site uses anonymous analytics cookies to understand how visitors use the pages. See <a href="/legal/cookies.html">Cookie Policy</a>.';

    const actions = document.createElement('div');
    actions.className = 'cookie-banner-actions';

    const reject = document.createElement('button');
    reject.type = 'button';
    reject.className = 'reject';
    reject.textContent = 'Reject';
    reject.addEventListener('click', () => { deny(); banner.remove(); });

    const accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'accept';
    accept.textContent = 'Accept';
    accept.addEventListener('click', () => { grant(); banner.remove(); });

    actions.appendChild(reject);
    actions.appendChild(accept);
    inner.appendChild(text);
    inner.appendChild(actions);
    banner.appendChild(inner);
    document.body.appendChild(banner);
}
