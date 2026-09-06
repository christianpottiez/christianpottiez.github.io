
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
