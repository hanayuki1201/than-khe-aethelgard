// THẦN KHẾ AETHELGARD - WEB APPLICATION JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSmartNavbar();
  initMobileDrawer();
  initMagicParticles();
  initLightbox();
  initMapSwitcher();
  initGalleryFilters();
  initCharacterBuilder();
  initChapterSearch();
});

// 1. TAB NAVIGATION (DESKTOP & MOBILE)
function initTabs() {
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .btn[data-target]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;
      e.preventDefault();

      // Update Nav Active State across desktop & mobile
      document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(nl => {
        nl.classList.toggle('active', nl.getAttribute('data-target') === targetId);
      });

      // Switch Tab Pane
      tabPanes.forEach(pane => {
        pane.classList.toggle('active', pane.id === targetId);
      });

      // Close mobile drawer if open
      closeMobileDrawer();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// 2. SMART NAVBAR (SCROLL UP REVEAL, SCROLL DOWN HIDE ON MOBILE)
function initSmartNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 60) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    // Auto-hide when scrolling down on small screens, show on scroll up
    if (window.innerWidth <= 900) {
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

// 3. MOBILE DRAWER TOGGLE
function initMobileDrawer() {
  const navToggle = document.getElementById('nav-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.classList.contains('open');
    if (isOpen) {
      closeMobileDrawer();
    } else {
      openMobileDrawer();
    }
  });

  drawerClose?.addEventListener('click', closeMobileDrawer);
  drawerBackdrop?.addEventListener('click', closeMobileDrawer);
}

function openMobileDrawer() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  navToggle?.classList.add('open');
  mobileDrawer?.classList.add('open');
  drawerBackdrop?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  navToggle?.classList.remove('open');
  mobileDrawer?.classList.remove('open');
  drawerBackdrop?.classList.remove('open');
  document.body.style.overflow = '';
}

// 4. DYNAMIC MAGIC PARTICLES CANVAS
function initMagicParticles() {
  const canvas = document.getElementById('magic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ['#d4af37', '#f3e5ab', '#8338ec', '#48cae4', '#9e2a2b'];
  const particleCount = window.innerWidth < 768 ? 24 : 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.2),
      alpha: Math.random() * 0.6 + 0.2,
      dAlpha: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.dAlpha;
      if (p.alpha <= 0.1 || p.alpha >= 0.85) p.dAlpha *= -1;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(render);
  }
  render();
}

// 5. IMAGE LIGHTBOX MODAL
function initLightbox() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (!modal || !modalImg) return;

  const targetImages = document.querySelectorAll('.map-view-box img, .beast-card-img');
  targetImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalCaption.textContent = img.alt || img.getAttribute('title') || 'Phóng to ảnh';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// 6. MAP SWITCHER
function initMapSwitcher() {
  const mapImg = document.getElementById('active-map-img');
  const mapTitle = document.getElementById('active-map-title');
  const mapButtons = document.querySelectorAll('.map-btn');

  const maps = {
    world: {
      src: 'assets/images/map_world.jpg',
      title: 'Bản Đồ Toàn Cảnh Đại Lục Aethelgard (Tọa độ ma pháp & Các đại cấm vực)'
    },
    campus: {
      src: 'assets/images/map_campus.jpg',
      title: 'Sơ Đồ Mặt Bằng Chi Tiết 8 Phân Khu Học Viện Kael-Varn & Bán Đảo Sương Mù'
    }
  };

  mapButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      mapButtons.forEach(b => b.classList.remove('btn-primary'));
      mapButtons.forEach(b => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      const mapType = btn.getAttribute('data-map');
      if (maps[mapType]) {
        mapImg.src = maps[mapType].src;
        mapTitle.textContent = maps[mapType].title;
      }
    });
  });
}

// 7. BEAST GALLERY FILTERS
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const beastCards = document.querySelectorAll('.beast-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      const filter = btn.getAttribute('data-filter');
      beastCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 8. INTERACTIVE CHARACTER BUILDER
function initCharacterBuilder() {
  const inputs = {
    name: document.getElementById('char-name'),
    age: document.getElementById('char-age'),
    gender: document.getElementById('char-gender'),
    appearance: document.getElementById('char-appearance'),
    origin: document.getElementById('char-origin'),
    mana: document.getElementById('char-mana'),
    gear: document.getElementById('char-gear'),
    relation: document.getElementById('char-relation'),
    beastEncounter: document.getElementById('char-beast')
  };

  const previewBox = document.getElementById('char-preview-box');
  const copyBtn = document.getElementById('copy-profile-btn');

  function updatePreview() {
    if (!previewBox) return;

    const nameVal = inputs.name?.value.trim() || '[Chưa đặt tên]';
    const ageVal = inputs.age?.value.trim() || '18';
    const genderVal = inputs.gender?.value || 'Nam';
    const appearanceVal = inputs.appearance?.value.trim() || 'Mái tóc đen, vóc dáng phong trần, ánh mắt sắc lạnh.';
    const originVal = inputs.origin?.value || 'Quý Tộc Sa Sút';
    const manaVal = inputs.mana?.value || 'Ma lực dồi dào';
    const gearVal = inputs.gear?.value.trim() || 'Áo choàng thô, túi ma dược, dao găm săn thú.';
    const relationVal = inputs.relation?.value || 'Đồng đội tri kỷ thuần khiết';
    const encounterVal = inputs.beastEncounter?.value || 'Bước lên Vòng Tròn Khế Ước tại Quảng Trường';

    const templateText = 
`[HỒ SƠ KHỞI TẠO NHÂN VẬT: THẦN KHẾ AETHELGARD]
* Họ & Tên: ${nameVal}
* Tuổi & Giới tính: ${ageVal} tuổi | ${genderVal}
* Ngoại hình & Khí chất: ${appearanceVal}
* Xuất thân: ${originVal}
* Ma Lực & Sở Trường: ${manaVal}
* Trang Phục & Hành Trang Ban Đầu: ${gearVal}
* Khuynh Hướng Quan Hệ Với Khế Thú: ${relationVal}
* Cơ Duyên Gặp Thú Ban Đầu: ${encounterVal}`;

    previewBox.textContent = templateText;
  }

  // Bind events
  Object.values(inputs).forEach(input => {
    if (input) {
      input.addEventListener('input', updatePreview);
      input.addEventListener('change', updatePreview);
    }
  });

  updatePreview();

  // Copy functionality
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!previewBox) return;
      navigator.clipboard.writeText(previewBox.textContent).then(() => {
        showToast('Đã sao chép hồ sơ nhân vật vào bộ nhớ tạm!');
      }).catch(() => {
        showToast('Lỗi khi sao chép, vui lòng bôi đen và copy thủ công.');
      });
    });
  }
}

// 9. CHAPTER SEARCH
function initChapterSearch() {
  const searchInput = document.getElementById('chapter-search');
  const chapterItems = document.querySelectorAll('.chapter-nav-item');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    chapterItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'block' : 'none';
    });
  });

  chapterItems.forEach(item => {
    item.addEventListener('click', () => {
      chapterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const targetHeaderId = item.getAttribute('data-chapter-id');
      const targetElement = document.getElementById(targetHeaderId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// TOAST NOTIFICATION
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
