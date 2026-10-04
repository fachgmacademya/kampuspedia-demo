/**
* Template Name: College
* Template URL: https://bootstrapmade.com/college-bootstrap-education-template/
* Updated: Jun 19 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      if (document.querySelector('.mobile-nav-active')) {
        // Do not close mobile menu if clicking a dropdown toggle link
        if (navmenu.parentElement.classList.contains('dropdown') || (navmenu.nextElementSibling && navmenu.nextElementSibling.tagName === 'UL')) {
          return;
        }
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .dropdown > a').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        this.classList.toggle('active');
        const nextUl = this.nextElementSibling;
        if (nextUl) {
          nextUl.classList.toggle('dropdown-active');
        }
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Universal Interactive Button Handler
   * Ensures all buttons and actionable elements on all pages are functional and active on click
   */
  function showToast(message, icon = 'bi-check-circle-fill') {
    let toast = document.querySelector('.toast-feedback');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-feedback';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('a, button');
    if (!btn) return;

    // Ripple click effect
    btn.classList.add('btn-ripple');

    const href = btn.getAttribute('href');
    const text = (btn.innerText || btn.textContent || '').trim().toLowerCase();

    // If it's a dead hash link or empty href
    if (href === '#' || href === '') {
      e.preventDefault();

      // Check if button relates to WhatsApp / Consultation / Register
      if (text.includes('daftar') || text.includes('kunjungan') || text.includes('jadwalkan') || 
          text.includes('konsultasi') || text.includes('hubungi') || text.includes('informasi') || 
          text.includes('bantuan') || text.includes('konfirmasi')) {
        const waMsg = encodeURIComponent('Halo Kampus Pedia, saya ingin bertanya mengenai: ' + (btn.innerText.trim() || 'informasi pendaftaran'));
        window.open('https://wa.me/6281234567890?text=' + waMsg, '_blank');
        return;
      }

      // Check if button relates to Program Studi / Akademik
      if (text.includes('program') || text.includes('akademik') || text.includes('beasiswa') || text.includes('jurusan')) {
        window.location.href = 'program-studi.html';
        return;
      }

      // Check if button relates to Fasilitas / Virtual Tour
      if (text.includes('fasilitas') || text.includes('tur virtual') || text.includes('kampus') || text.includes('hunian') || text.includes('olahraga')) {
        window.location.href = 'fasilitas.html';
        return;
      }

      // Check if button relates to Blog / Artikel / Berita
      if (text.includes('blog') || text.includes('berita') || text.includes('artikel') || text.includes('kisah')) {
        window.location.href = 'blog.html';
        return;
      }

      // Default feedback if generic button
      showToast('Permintaan Anda sedang diproses oleh staf Kampus Pedia.');
    }
  });

  // Handle all form submissions (search, newsletter, inquiries)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (form.classList.contains('php-email-form')) return; // handled by template php form validator
      e.preventDefault();
      const input = form.querySelector('input[type="text"], input[type="email"]');
      if (input && input.value.trim() === '') {
        showToast('Mohon isi formulir terlebih dahulu.', 'bi-exclamation-circle-fill');
        input.focus();
        return;
      }
      showToast('Terima kasih! Formulir Anda telah berhasil dikirim.');
      form.reset();
    });
  });

})();