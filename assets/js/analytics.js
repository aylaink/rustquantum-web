// Google Analytics 4 with GDPR-compliant Consent Mode v2.
//
// Default: analytics_storage = 'denied' — gtag.js loads but no tracking
// cookies are set and no user data is sent until the visitor clicks
// "Accept" in the cookie banner.
//
// Visitor choice (granted / denied) is persisted in localStorage so the
// banner appears only on first visit; subsequent visits respect the
// previous decision without prompting.

const GA_ID = 'G-RKXTH8PTT5';
const STORAGE_KEY = 'rq-consent';

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Defaults — everything denied. wait_for_update gives the user 500 ms
// to click before the first page-view fires (granted or denied).
gtag('consent', 'default', {
    ad_storage:           'denied',
    ad_user_data:         'denied',
    ad_personalization:   'denied',
    analytics_storage:    'denied',
    wait_for_update:      500
});

// Load gtag.js — respects the consent state set above.
const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
document.head.appendChild(gtagScript);

gtag('js', new Date());
gtag('config', GA_ID, { anonymize_ip: true });

// Restore previous decision, if any.
let stored = null;
try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

if (stored === 'granted') {
    grant();
} else if (stored !== 'denied') {
    showBanner();
}

function grant() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch (e) {}
}

function deny() {
    try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch (e) {}
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
