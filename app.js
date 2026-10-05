// THẦN KHẾ AETHELGARD - WEB APPLICATION JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initMapSwitcher();
  initGalleryFilters();
  initCharacterBuilder();
  initChapterSearch();
});

// 1. TAB NAVIGATION
function initTabs() {
  const navLinks = document.querySelectorAll('.nav-link, .btn[data-target]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      if (!targetId) return;
      e.preventDefault();

      // Update Nav Active State
      document.querySelectorAll('.nav-link').forEach(nl => {
        nl.classList.toggle('active', nl.getAttribute('data-target') === targetId);
      });

      // Switch Tab Pane
      tabPanes.forEach(pane => {
        pane.classList.toggle('active', pane.id === targetId);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// 2. MAP SWITCHER
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

// 3. BEAST GALLERY FILTERS
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

// 4. INTERACTIVE CHARACTER BUILDER
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

// 5. CHAPTER SEARCH
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
