/**
 * contact-form.js
 * Gère la soumission du formulaire de contact.
 *
 * Aucun backend n'est branché par défaut : la fonction `sendMessage`
 * ci-dessous est le seul point à modifier pour connecter un service réel
 * (endpoint API, Formspree, EmailJS, etc.) sans toucher au reste du site.
 */

/**
 * Envoie le message vers Formspree.
 * Utilise l'URL configurée sur le formulaire et les champs name="..."
 * pour un envoi compatible avec l'API Formspree.
 *
 * @param {HTMLFormElement} form
 * @returns {Promise<void>}
 */
async function sendMessage(form) {
  const endpoint = form.action || 'https://formspree.io/f/xdenbdzv';

  const response = await fetch(endpoint, {
    method: form.method || 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: new FormData(form),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.error || `HTTP ${response.status}`);
  }

  return response.json().catch(() => ({}));
}

export function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
      name: document.getElementById('cf-name').value.trim(),
      email: document.getElementById('cf-email').value.trim(),
      message: document.getElementById('cf-msg').value.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setNote(note, "Merci de renseigner tous les champs.", 'error');
      return;
    }

    try {
      await sendMessage(form);
      setNote(note, "Votre message a bien été envoyé. Je vous répondrai rapidement.", 'ok');
      form.reset();
    } catch (err) {
      console.error('Formspree submit failed:', err);
      setNote(note, "L'envoi a échoué. Merci de réessayer ou de m'écrire directement par e-mail.", 'error');
    }
  });
}

function setNote(el, text, state) {
  el.textContent = text;
  el.classList.remove('ok', 'error');
  el.classList.add(state);
}
