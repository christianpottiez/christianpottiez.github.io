
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

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = [...track.children];
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const indexLabel = carousel.querySelector('[data-carousel-index]');
  let activeIndex = 0;
  let scrollFrame = null;

  const updateControls = () => {
    const slide = slides[0];
    if (!slide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = slide.getBoundingClientRect().width + gap;
    activeIndex = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / step)));
    indexLabel.textContent = `${activeIndex + 1} / ${slides.length}`;
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;
  };

  const moveTo = index => {
    const slide = slides[0];
    if (!slide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = slide.getBoundingClientRect().width + gap;
    track.scrollTo({ left: step * Math.max(0, Math.min(slides.length - 1, index)), behavior: 'smooth' });
  };

  previousButton.addEventListener('click', () => moveTo(activeIndex - 1));
  nextButton.addEventListener('click', () => moveTo(activeIndex + 1));
  track.addEventListener('scroll', () => {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(updateControls);
  }, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();
});
