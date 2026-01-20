// END NF Website Scripts

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // Mobile Navigation
  // ========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // ========================================
  // Mobile Dropdown Menu Toggle
  // ========================================
  const navItems = document.querySelectorAll('.nav-item');
  const isMobile = () => window.innerWidth <= 768;

  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (link && dropdown) {
      link.addEventListener('click', (e) => {
        if (isMobile()) {
          e.preventDefault();

          // Close other open dropdowns
          navItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('open');
            }
          });

          // Toggle current dropdown
          item.classList.toggle('open');
        }
      });
    }
  });

  // Close menu when clicking a dropdown link (on mobile)
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile()) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navItems.forEach(item => item.classList.remove('open'));
      }
    });
  });

  // Close menu when clicking a nav-link without dropdown
  document.querySelectorAll('.nav-link').forEach(link => {
    const parentItem = link.closest('.nav-item');
    const hasDropdown = parentItem && parentItem.querySelector('.dropdown-menu');

    if (!hasDropdown) {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    }
  });

  // Close dropdowns when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (isMobile() && !e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
      navItems.forEach(item => item.classList.remove('open'));
    }
  });

  // Reset dropdowns on window resize
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      navItems.forEach(item => item.classList.remove('open'));
    }
  });

  // ========================================
  // Scroll Animation with Intersection Observer
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optional: stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  };

  const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

  // Auto-apply animation classes to common elements
  const animateElements = () => {
    // Section titles
    document.querySelectorAll('.section-title').forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      scrollObserver.observe(el);
    });

    // Cards with staggered animation
    document.querySelectorAll('.card').forEach((el, index) => {
      el.classList.add('animate-on-scroll', `stagger-${(index % 3) + 1}`);
      scrollObserver.observe(el);
    });

    // Grid containers
    document.querySelectorAll('.grid').forEach(el => {
      el.classList.add('animate-fade-in');
      scrollObserver.observe(el);
    });

    // Section containers (not hero) - disabled for press page
    // document.querySelectorAll('.section .container').forEach(el => {
    //   if (!el.closest('.hero')) {
    //     el.classList.add('animate-on-scroll');
    //     scrollObserver.observe(el);
    //   }
    // });

    // Any element with explicit animation class
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
      if (!el.classList.contains('animated')) {
        scrollObserver.observe(el);
      }
    });
  };

  // Initialize animations
  animateElements();

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ========================================
  // Header Shadow on Scroll
  // ========================================
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // Active Nav Link Highlight
  // ========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ========================================
  // Parallax Effect for Hero (subtle)
  // ========================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      hero.style.backgroundPositionY = `calc(center + ${rate}px)`;
    });
  }

  // ========================================
  // Button Ripple Effect
  // ========================================
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation keyframes
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========================================
  // Typing Effect for Hero Title (optional)
  // ========================================
  // Uncomment below to enable typing effect
  /*
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 500);
  }
  */

  // ========================================
  // Counter Animation for Statistics
  // ========================================
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  };

  // Find and animate any counter elements
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(el);
  });

  console.log('END NF website loaded with animations ✨');
});
