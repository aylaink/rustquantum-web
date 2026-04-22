// Close any open <details class="nav-dropdown"> on outside pointer or Escape.
//
// pointerdown fires before the native <summary> click toggle, so there is
// no race between "click opens dropdown" and "click closes dropdown".

console.log('[nav-dropdown] loaded');

document.addEventListener('pointerdown', (event) => {
    document.querySelectorAll('details.nav-dropdown[open]').forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
            dropdown.open = false;
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('details.nav-dropdown[open]').forEach((dropdown) => {
        dropdown.open = false;
    });
});
