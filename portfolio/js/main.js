/**
 * main.js
 * Point d'entrée unique du site. Importe et initialise chaque module
 * indépendamment — pour retirer une fonctionnalité (ex. l'animation
 * réseau), il suffit de commenter son import et son appel ici.
 */
import { initNavigation } from './modules/navigation.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initNetworkAnimation } from './modules/network-animation.js';
import { initContactForm } from './modules/contact-form.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initNetworkAnimation('netCanvas');
  initContactForm();
});
