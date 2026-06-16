document.getElementById('year').textContent = new Date().getFullYear();

(function () {
  var nav = document.querySelector('.nav') || document.querySelector('nav');
  if (!nav) return;
  function checkScroll() {
    var scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    nav.classList.toggle('scrolled', scrollY > 60);
  }
  window.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('load', checkScroll);
  checkScroll();
})();

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    let valid = true;

    [name, email, message].forEach(f => f.closest('.form-group')?.classList.remove('has-error'));

    if (!name.value.trim()) {
      name.closest('.form-group')?.classList.add('has-error');
      valid = false;
    }
    if (!email.value.trim() || !email.value.includes('@')) {
      email.closest('.form-group')?.classList.add('has-error');
      valid = false;
    }
    if (!message.value.trim()) {
      message.closest('.form-group')?.classList.add('has-error');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');
      } else {
        alert('Something went wrong. Please email me directly at oladeeayo@gmail.com');
      }
    }).catch(() => {
      alert('Something went wrong. Please email me directly at oladeeayo@gmail.com');
    });
  });
}
