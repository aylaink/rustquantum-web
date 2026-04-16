// Contact form helpers.
//
// 1. Sets the _next hidden input so the contact-form Worker redirects the
//    user back to this page after submission. Degrades gracefully: without
//    JS the field stays empty and the Worker falls back to its own default.
//
// 2. Overrides HTML5 validation messages with English text. Browsers show
//    native validation tooltips in the OS/browser locale, ignoring
//    <html lang="en">; setCustomValidity is the only way to force English.

const nextField = document.querySelector('input[name="_next"]');
if (nextField) {
    nextField.value = window.location.href;
}

const EN_MESSAGE = {
    valueMissing:    'Please fill out this field.',
    typeMismatch:    'Please enter a valid email address.',
    tooShort:        'Please use at least the minimum required length.',
    tooLong:         'Please use no more than the maximum allowed length.',
    patternMismatch: 'Please match the requested format.',
    badInput:        'Please enter a valid value.',
    rangeUnderflow:  'Value is too small.',
    rangeOverflow:   'Value is too large.',
    stepMismatch:    'Please enter a valid value.',
};

function applyEnglishMessage(field) {
    const v = field.validity;
    let msg = '';
    if      (v.valueMissing)    msg = EN_MESSAGE.valueMissing;
    else if (v.typeMismatch)    msg = EN_MESSAGE.typeMismatch;
    else if (v.tooShort)        msg = EN_MESSAGE.tooShort;
    else if (v.tooLong)         msg = EN_MESSAGE.tooLong;
    else if (v.patternMismatch) msg = EN_MESSAGE.patternMismatch;
    else if (v.badInput)        msg = EN_MESSAGE.badInput;
    else if (v.rangeUnderflow)  msg = EN_MESSAGE.rangeUnderflow;
    else if (v.rangeOverflow)   msg = EN_MESSAGE.rangeOverflow;
    else if (v.stepMismatch)    msg = EN_MESSAGE.stepMismatch;
    field.setCustomValidity(msg);
}

document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
    field.addEventListener('invalid', () => applyEnglishMessage(field));
    field.addEventListener('input',   () => field.setCustomValidity(''));
});
