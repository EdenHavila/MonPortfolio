/**
 * contact-form.js
 * Gère la soumission du formulaire de contact.
 *
 * Aucun backend n'est branché par défaut : la fonction `sendMessage`
 * ci-dessous est le seul point à modifier pour connecter un service réel
 * (endpoint API, Formspree, EmailJS, etc.) sans toucher au reste du site.
 */

/**
 * Point d'intégration à personnaliser.
 * Remplacer le corps de cette fonction par un appel réseau réel, par ex. :
 *
 *   return fetch('/api/contact', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload)
 *   });
 *
 * @param {{name: string, email: string, message: string}} payload
 * @returns {Promise<void>}
 */
async function sendMessage(payload) {
  return Promise.resolve(payload);
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
      await sendMessage(payload);
      setNote(
        note,
        "Message prêt à être envoyé — connectez sendMessage() dans contact-form.js à votre service d'envoi pour l'activer.",
        'ok'
      );
      form.reset();
    } catch (err) {
      setNote(note, "Une erreur est survenue. Merci de réessayer.", 'error');
    }
  });
}

function setNote(el, text, state) {
  el.textContent = text;
  el.classList.remove('ok', 'error');
  el.classList.add(state);
}
