// Sets the _next hidden input so the contact-form Worker redirects the user
// back to this page after submission. Degrades gracefully: without JS the
// field stays empty and the Worker falls back to its own default redirect.
const nextField = document.querySelector('input[name="_next"]');
if (nextField) {
    nextField.value = window.location.href;
}
