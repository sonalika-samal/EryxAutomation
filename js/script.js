// Initialize Icons
lucide.createIcons();

// Scroll Animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
};

// Header Shadow on Scroll
const handleScroll = () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = 'var(--shadow-sm)';
    header.style.background = 'rgba(255, 255, 255, 0.95)';
  } else {
    header.style.boxShadow = 'none';
    header.style.background = 'rgba(255, 255, 255, 0.8)';
  }
};

// Pricing Logic
const initPricingToggle = () => {
  const toggles = document.querySelectorAll('.toggle-btn');
  const amounts = document.querySelectorAll('.amount');

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      toggles.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      const duration = parseInt(btn.getAttribute('data-duration'));
      let discount = 0;
      if (duration === 3) discount = 0.10;
      if (duration === 6) discount = 0.20;
      if (duration === 12) discount = 0.30;

      amounts.forEach(amt => {
        const base = parseFloat(amt.getAttribute('data-base'));
        const discounted = base - (base * discount);
        // Format with commas
        amt.innerHTML = discounted.toLocaleString('en-IN');
      });
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initPricingToggle();
  observeElements();
  window.addEventListener('scroll', handleScroll);
  
  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll('.hero .animate-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 100);
});
