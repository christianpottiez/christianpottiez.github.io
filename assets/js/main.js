
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// Optional company-personalised share page.
const params = new URLSearchParams(window.location.search);
const company = params.get('company');
document.querySelectorAll('[data-company]').forEach(el => {
  if(company) el.textContent = company;
});

const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

if (lightboxTriggers.length) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-label', 'Enlarged image');
  lightbox.innerHTML = `
    <button class="image-lightbox-close" type="button" aria-label="Close enlarged image">×</button>
    <figure>
      <img src="" alt="">
      <figcaption></figcaption>
    </figure>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('figcaption');
  const closeButton = lightbox.querySelector('.image-lightbox-close');
  let activeTrigger = null;

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const sourceImage = trigger.querySelector('img');
      activeTrigger = trigger;
      lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
      lightboxImage.alt = sourceImage.alt;
      lightboxCaption.textContent = trigger.dataset.caption || sourceImage.alt;
      lightbox.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    lightboxImage.src = '';
    activeTrigger?.focus();
  });
}
