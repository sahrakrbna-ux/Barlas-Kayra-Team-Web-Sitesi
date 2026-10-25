// Barlas Kayra Team | Ortak JavaScript kodları
// Yarışma tarihi ve başvuru e-postasını bu alandan düzenleyebilirsiniz.
const SITE_CONFIG = {
  teknofestDeadline: '',
  teknofestLabel: 'TEKNOFEST yarışma tarihi',
  applicationEmail: ''
};

// Mobil menü: belge hazır olduğunda güvenilir biçimde bağlanır.
function initializeMobileMenu() {
  const menuButton = document.querySelector('.menu');
  const navigationLinks = document.querySelector('.navlinks');
  if (!menuButton || !navigationLinks) return;

  const setOpen = (open) => {
    navigationLinks.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    menuButton.textContent = open ? '✕' : '☰';
  };
  menuButton.addEventListener('click', () => {
    setOpen(!navigationLinks.classList.contains('open'));
  });
  navigationLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) setOpen(false);
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMobileMenu);
} else {
  initializeMobileMenu();
}

// Ana sayfadaki TEKNOFEST geri sayımını oluştur.
const countdown = document.getElementById('countdown');

if (countdown) {
  const targetDate = SITE_CONFIG.teknofestDeadline
    ? new Date(SITE_CONFIG.teknofestDeadline)
    : null;

  const renderCountdown = () => {
    if (!targetDate || Number.isNaN(targetDate.getTime())) {
      countdown.innerHTML =
        '<div class="notice">Resmî yarışma tarihi henüz eklenmedi. ' +
        'Tarih açıklandığında geri sayım burada başlayacak.</div>';
      return;
    }

    let remaining = Math.max(0, targetDate - new Date());
    const days = Math.floor(remaining / 86400000);
    remaining %= 86400000;

    const hours = Math.floor(remaining / 3600000);
    remaining %= 3600000;

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    const timeParts = [
      ['GÜN', days],
      ['SAAT', hours],
      ['DAKİKA', minutes],
      ['SANİYE', seconds]
    ];

    countdown.innerHTML = timeParts
      .map(([label, value]) => `
        <div class="timebox">
          <strong>${String(value).padStart(2, '0')}</strong>
          <small>${label}</small>
        </div>
      `)
      .join('');
  };

  renderCountdown();
  setInterval(renderCountdown, 1000);
}


// Alt bilgide kullanılan telif yılını güncel tut.
const copyrightYear = document.getElementById('year');
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}
