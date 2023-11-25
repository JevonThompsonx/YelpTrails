"use strict";
const button = document.querySelector('.mobile-menu-button'), mobileMenu = document.querySelector('.mobile-menu');
button?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
});
