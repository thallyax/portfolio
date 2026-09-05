/* ==========================================================================
   CONTACT.JS — validation du formulaire de contact
   Chargé uniquement sur contact.html
   Remplacez la fonction `sendMessage` par votre logique d'envoi réelle
   (ex : appel vers un endpoint PHP/Node, Formspree, EmailJS...)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  const rules = {
    name:    v => v.trim().length >= 2 || "Merci d'indiquer votre nom.",
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Cette adresse e-mail ne semble pas valide.",
    subject: v => v.trim().length >= 3 || "Un petit mot sur le sujet ?",
    message: v => v.trim().length >= 10 || "Votre message est un peu court (10 caractères minimum).",
  };

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const wrapper = field.closest('.field');
    const errorEl = wrapper.querySelector('.field-error');

    if (result === true) {
      wrapper.classList.remove('has-error');
      errorEl.textContent = '';
      return true;
    } else {
      wrapper.classList.add('has-error');
      errorEl.textContent = result;
      return false;
    }
  }

  // Validation en direct à la sortie de chaque champ
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll('input[name], textarea[name]')];
    const isValid = fields.map(validateField).every(Boolean);

    if (!isValid) {
      status.textContent = "Merci de corriger les champs signalés avant d'envoyer votre message.";
      status.className = 'form-status is-visible err';
      return;
    }

    sendMessage(Object.fromEntries(new FormData(form)));
  });

  function sendMessage(data) {
    // 🔧 À REMPLACER : branchez ici votre envoi réel (API, mailto, service tiers…)
    // Exemple avec un endpoint personnel :
    // fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })

    console.log('Formulaire prêt à être envoyé :', data);

    status.textContent = 'Merci ! Votre message a bien été envoyé, je vous réponds rapidement.';
    status.className = 'form-status is-visible ok';
    form.reset();
  }
});
