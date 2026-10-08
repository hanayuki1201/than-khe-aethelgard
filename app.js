// THẦN KHẾ AETHELGARD - WEB APPLICATION JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initMapSwitcher();
  initGalleryFilters();
  initCharacterBuilder();
  initChapterSearch();
  initZoneExplorer();
  initAmbientParticles();
  initWorldHUD();
  initAmbientAudio();
  initSandboxSimulator();
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


// 6. ZONE EXPLORER
const ZONE_DATA = {
  "01": {
    "num": "01",
    "name": "Cổng Thành Tiền Trấn & Eo Đất Cổ",
    "placement": "Eo đất phía Bắc, nối bán đảo với lục địa",
    "description": "Trước khi nhìn thấy những tòa tháp của Kael-Varn, khách lữ hành phải bước qua cổng thành đá xám án ngữ eo đất. Những dòng cổ ngữ phủ trên vòm cổng đánh dấu ranh giới giữa lục địa và học viện. Tại trạm kiểm soát, Đội Hiệp Sĩ Giám Thị yêu cầu học sinh cùng khách vãng lai trình diện ấn ký khế ước.",
    "features": [
      "Cổng vòm đá xám khổng lồ khắc cổ ngữ",
      "Đội Hiệp Sĩ Giám Thị kiểm soát lối vào"
    ],
    "activities": [
      "Trình diện ấn ký khế ước",
      "Kiểm tra an ninh",
      "Ra vào học viện"
    ],
    "img": "assets/images/zone_01_cong_thanh.jpg",
    "driveUrl": "https://drive.google.com/file/d/19YPyyBJRdQbqsyZGvWWUKZh8OnTdClt9/view?usp=drivesdk"
  },
  "02": {
    "num": "02",
    "name": "Đại Quảng Trường Khế Ước Cổ Ngữ",
    "placement": "Trung tâm học viện",
    "description": "Đại quảng trường là nơi những lời khế ước đầu tiên cất lên giữa lòng Kael-Varn. Vòng Tròn Khế Ước Thần Thánh phát sáng trên nền đá hoa cương, được bao quanh bởi mười hai cột trụ khắc hình các chủng loài thủy tổ. Từ lễ khai giảng đến kỳ thi thức tỉnh và các lễ hội lớn, nhịp sống của học viện đều tìm về nơi này.",
    "features": [
      "Vòng Tròn Khế Ước Thần Thánh bằng đá hoa cương phát quang",
      "12 cột trụ khắc các chủng loài thủy tổ",
      "Tháp đồng hồ"
    ],
    "activities": [
      "Lễ khai giảng",
      "Thi thức tỉnh",
      "Lễ hội học viện"
    ],
    "img": "assets/images/zone_02_quang_truong.jpg",
    "driveUrl": "https://drive.google.com/file/d/1glSXZRjWkNa3AFpOHNem06gjYr2RuQYL/view?usp=drivesdk"
  },
  "03": {
    "num": "03",
    "name": "Tòa Tháp Kim Cương",
    "placement": "Mỏm đồi cao phía Đông, hướng ra biển",
    "description": "Nằm trên mỏm đồi cao phía Đông, Tòa Tháp Kim Cương đón ánh nắng đầu tiên trên bán đảo. Sau những hành lang cẩm thạch trắng là đời sống xa hoa của học sinh quý tộc: hồ nước biển riêng cho thủy tộc, sân đáp cho phi hành thú và người hầu túc trực. Cảnh biển rộng mở làm nổi bật đặc quyền mà nhiều cư dân Kael-Varn chỉ có thể nhìn thấy từ xa.",
    "features": [
      "Cẩm thạch trắng xa hoa",
      "Ký túc xá dành cho quý tộc thuần huyết",
      "Hồ nước biển riêng và sân đáp phi hành thú",
      "Người hầu phục vụ"
    ],
    "activities": [
      "Sinh hoạt ký túc xá quý tộc",
      "Chăm sóc thủy tộc trong hồ riêng",
      "Đáp và nghỉ cho phi hành thú"
    ],
    "img": "assets/images/zone_03_thap_kim_cuong.jpg",
    "driveUrl": "https://drive.google.com/file/d/1xjuLAyymliYVV1H9uFMf6cPXJVnJ3aAm/view?usp=drivesdk"
  },
  "04": {
    "num": "04",
    "name": "Dãy Tro Tàn",
    "placement": "Phía Tây, chân hẻm núi sát vách biển",
    "description": "Dưới chân hẻm núi phía Tây, Dãy Tro Tàn sống cùng tiếng sóng và hơi lạnh bám trên những bức tường đá xám. Học sinh diện học bổng, dân nghèo và những người bị kỷ luật tự tìm củi sưởi, rồi chia sẻ giường gỗ với khế thú. Những mái nhà rêu phong này cho thấy một đời sống rất khác với các tầng cẩm thạch phía Đông học viện.",
    "features": [
      "Nhà đá xám cũ kỹ, rêu phong và ẩm lạnh",
      "Sát biển và dưới chân hẻm núi",
      "Nơi ở của học sinh nghèo, học bổng và người bị kỷ luật"
    ],
    "activities": [
      "Sinh hoạt của học sinh học bổng và dân nghèo",
      "Tự kiếm củi và giữ ấm",
      "Chia sẻ chỗ nghỉ với khế thú"
    ],
    "img": "assets/images/zone_04_day_tro_tan.jpg",
    "driveUrl": "https://drive.google.com/file/d/17EFE6C-qgnQhPecce6HLrA6pMJiLsxbI/view?usp=drivesdk"
  },
  "05": {
    "num": "05",
    "name": "Giảng Đường Trung Tâm & Thư Viện Vạn Cuộn",
    "placement": "Giữa Tòa Tháp Kim Cương và Dãy Tro Tàn",
    "description": "Giữa Tòa Tháp Kim Cương và Dãy Tro Tàn, tòa tháp bát giác bảy tầng giữ một vị trí trung lập. Giảng đường, Thư Viện Vạn Cuộn, các bản đồ địa lý và phòng bào chế ma dược cùng nằm trong khối kiến trúc này. Với người học cổ ngữ, nhà thám hiểm hay người điều chế độc dược, đây là nơi tri thức của đại lục trở thành công cụ cho hành trình phía trước.",
    "features": [
      "Tòa tháp bát giác 7 tầng",
      "Hàng triệu cuộn sách cổ",
      "Bản đồ địa lý và phòng bào chế ma dược",
      "Không gian trung lập giữa hai khu ký túc xá"
    ],
    "activities": [
      "Học lý thuyết",
      "Tra cứu cổ thư và bản đồ",
      "Bào chế ma dược"
    ],
    "img": "assets/images/zone_05_giang_duong.jpg",
    "driveUrl": "https://drive.google.com/file/d/1N2GbjNyfjDz14R0IHI0sESa2lHr0fhDP/view?usp=drivesdk"
  },
  "06": {
    "num": "06",
    "name": "Đấu Trường Lôi Đài Ma Thú",
    "placement": "Lòng chảo phía Nam bán đảo",
    "description": "Ở lòng chảo phía Nam, những bậc khán đài đá ôm lấy Đấu Trường Lôi Đài Ma Thú. Kết giới nguyên tố ngăn những đợt công kích lan ra ngoài sân, nơi học sinh luyện phối hợp cùng khế thú và tham gia các trận quyết đấu phân hạng tháng. Những bài học về sức mạnh ở đây luôn đi cùng khả năng kiểm soát nó.",
    "features": [
      "Đấu trường đá dạng lòng chảo La Mã",
      "Kết giới nguyên tố kiên cố",
      "Nằm tại khu phía Nam"
    ],
    "activities": [
      "Quyết đấu 1v1 phân hạng tháng",
      "Huấn luyện thực chiến phối hợp"
    ],
    "img": "assets/images/zone_06_dau_truong.jpg",
    "driveUrl": "https://drive.google.com/file/d/1-VyvgdrOhBNubRlSFy4ODTpOlNUFY3Ff/view?usp=drivesdk"
  },
  "07": {
    "num": "07",
    "name": "Rừng Sinh Thái Thử Nghiệm & Trại Nuôi Dã Thú",
    "placement": "Phía Bắc bán đảo",
    "description": "Rừng Sinh Thái Thử Nghiệm là khu rừng nhân tạo khép kín phía Bắc học viện. Hàng rào ma thuật giữ dã thú cấp thấp trong phạm vi bảo tồn, còn các chuồng nuôi là nơi học sinh năm đầu bắt đầu học cách chăm sóc và thuần hóa ấu thú. Việc dọn chuồng, cho ăn và quan sát từng phản ứng nhỏ là một phần của đời sống thường ngày tại đây.",
    "features": [
      "Rừng nhân tạo khép kín",
      "Hàng rào ma thuật",
      "Nơi thực hành của học sinh năm đầu"
    ],
    "activities": [
      "Thuần hóa ấu thú",
      "Dọn chuồng",
      "Thực hành chăm sóc dã thú cấp thấp"
    ],
    "img": "assets/images/zone_07_rung_sinh_thai.jpg",
    "driveUrl": "https://drive.google.com/file/d/1XBZ9MEBmU8rR20nBW9R8IMdXaZ5u1XDo/view?usp=drivesdk"
  },
  "08": {
    "num": "08",
    "name": "Thị Trấn Cảng Oakhaven & Chợ Đen Thủy Triều Đen",
    "placement": "Sườn bờ biển phía Đông Nam",
    "description": "Oakhaven trải dần xuống bờ biển phía Đông Nam, nơi thuyền buồm cập bến giữa tửu quán thợ săn và những xưởng rèn ma khí. Khi thủy triều rút, các hang động bên dưới mở lối tới Chợ Đen Thủy Triều Đen. Phố cảng có đời sống giao thương công khai; dưới chân vách đá, trứng thú lậu và hàng cấm đổi chủ trong ánh đèn kín đáo.",
    "features": [
      "Thị trấn cảng sầm uất trên mặt đất",
      "Tửu quán thợ săn và xưởng rèn ma khí",
      "Chợ đen trong các hang động ngầm lúc thủy triều rút",
      "Buôn bán trứng thú lậu và hàng cấm"
    ],
    "activities": [
      "Giao thương tại bến cảng",
      "Ghé tửu quán thợ săn và xưởng rèn ma khí",
      "Khám phá chợ đen khi thủy triều rút"
    ],
    "img": "assets/images/zone_08_oakhaven.jpg",
    "driveUrl": "https://drive.google.com/file/d/11zhCNdEFErDE5xd6kn1KK9K87q39SStW/view?usp=drivesdk"
  }
};

function initZoneExplorer() {
  const zoneBtns = document.querySelectorAll('.zone-nav-btn');
  const spotlightImg = document.getElementById('spotlight-img');
  const spotlightBadge = document.getElementById('spotlight-badge');
  const spotlightTitle = document.getElementById('spotlight-title');
  const spotlightPlacement = document.getElementById('spotlight-placement');
  const spotlightDesc = document.getElementById('spotlight-desc');
  const spotlightFeatures = document.getElementById('spotlight-features');
  const spotlightActivities = document.getElementById('spotlight-activities');
  const spotlightDriveLink = document.getElementById('spotlight-drive-link');

  function selectZone(zoneKey) {
    const data = ZONE_DATA[zoneKey];
    if (!data) return;

    zoneBtns.forEach(btn => {
      const bKey = btn.getAttribute('data-zone');
      btn.classList.toggle('btn-primary', bKey === zoneKey);
      btn.classList.toggle('btn-secondary', bKey !== zoneKey);
      btn.classList.toggle('active', bKey === zoneKey);
    });

    if (spotlightImg) {
      spotlightImg.style.opacity = '0.4';
      setTimeout(() => {
        spotlightImg.src = data.img;
        spotlightImg.alt = data.name;
        spotlightImg.style.opacity = '1';
      }, 150);
    }

    if (spotlightBadge) spotlightBadge.textContent = `Phân Khu ${data.num} / 08`;
    if (spotlightTitle) spotlightTitle.textContent = `${data.num}. ${data.name}`;
    if (spotlightPlacement) spotlightPlacement.textContent = `📍 ${data.placement}`;
    if (spotlightDesc) spotlightDesc.textContent = data.description;
    
    if (spotlightFeatures) {
      spotlightFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    }
    
    if (spotlightActivities) {
      spotlightActivities.innerHTML = data.activities.map(a => `<li>${a}</li>`).join('');
    }

    if (spotlightDriveLink) {
      spotlightDriveLink.href = data.driveUrl;
    }
  }

  zoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const zoneKey = btn.getAttribute('data-zone');
      selectZone(zoneKey);
    });
  });

  // Link cards to spotlight when clicked
  const zoneCards = document.querySelectorAll('.zone-card');
  zoneCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return;
      const zoneKey = card.getAttribute('data-zone');
      selectZone(zoneKey);
      const spotlightEl = document.getElementById('zone-spotlight');
      if (spotlightEl) {
        spotlightEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
}

// ========================================================
// 7. AMBIENT PARTICLES (GOLDEN MAGIC EMBERS)
// ========================================================
function initAmbientParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.008 + 0.002,
      color: Math.random() > 0.3 ? '212, 175, 55' : '181, 23, 158'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.opacity += p.fadeSpeed;

      if (p.opacity > 0.8 || p.opacity < 0.15) {
        p.fadeSpeed = -p.fadeSpeed;
      }

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, p.opacity)})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ========================================================
// 8. WORLD HUD TIME & PHENOMENON
// ========================================================
function initWorldHUD() {
  const clockEl = document.getElementById('hud-clock');
  const phenomEl = document.getElementById('hud-phenomenon');
  if (!clockEl) return;

  const times = [
    '21:45 (Đêm Muộn - Giới Nghiêm)',
    '22:15 (Đêm Sâu - Rừng Cấm Mở)',
    '23:00 (Nửa Đêm - Thủy Triều Rút)',
    '00:30 (Giờ Săn Thú Của Dã Lang)'
  ];

  const phenoms = [
    'Đêm Trăng Máu (Dã Tính Ma Thú +30%)',
    'Sương Mù Bí Thuật (Tầm Nhìn 5 Mét)',
    'Triều Cường Biển Đen (Hải Quái Vực Sâu Thức Tỉnh)',
    'Giao Thoa Tinh Lực (Tốc Độ Hóa Hình Tăng Vọt)'
  ];

  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % times.length;
    clockEl.textContent = times[idx];
    if (phenomEl) phenomEl.textContent = phenoms[idx];
  }, 12000);
}

// ========================================================
// 9. SYNTH AMBIENT SOUND (WEB AUDIO API - ZERO EXTERNAL FILES)
// ========================================================
function initAmbientAudio() {
  const soundBtn = document.getElementById('hud-sound-btn');
  if (!soundBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let osc1 = null, osc2 = null, gainNode = null;

  soundBtn.addEventListener('click', () => {
    if (!isPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();

        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + 2);
        gainNode.connect(audioCtx.destination);

        // Mystical low drone (C#2 68.68Hz)
        osc1 = audioCtx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(68.68, audioCtx.currentTime);

        // Harmonic shimmer (G#2 103.83Hz)
        osc2 = audioCtx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(103.83, audioCtx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);

        osc1.start();
        osc2.start();

        isPlaying = true;
        soundBtn.textContent = '🔊 Âm Hưởng (Bật)';
        soundBtn.classList.add('btn-hud-highlight');
        showToast('Đã kích hoạt âm hưởng không gian ma mị');
      } catch (err) {
        console.error(err);
      }
    } else {
      if (gainNode && audioCtx) {
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
        setTimeout(() => {
          if (osc1) osc1.stop();
          if (osc2) osc2.stop();
          if (audioCtx) audioCtx.close();
          isPlaying = false;
          soundBtn.textContent = '🔇 Âm Hưởng';
          soundBtn.classList.remove('btn-hud-highlight');
          showToast('Đã tắt âm hưởng');
        }, 1000);
      }
    }
  });
}

// ========================================================
// 10. INTERACTIVE SANDBOX ENCOUNTER GENERATOR
// ========================================================
function initSandboxSimulator() {
  const rollBtn = document.getElementById('roll-encounter-btn');
  const rerollBtn = document.getElementById('reroll-btn');
  const copyBtn = document.getElementById('copy-encounter-btn');

  const locSelect = document.getElementById('sb-location');
  const timeSelect = document.getElementById('sb-time');
  const weatherSelect = document.getElementById('sb-weather');
  const beastSelect = document.getElementById('sb-beast');
  const stateSelect = document.getElementById('sb-state');

  const diceBadge = document.getElementById('dice-result');
  const outcomeType = document.getElementById('outcome-type');
  const encounterText = document.getElementById('encounter-text');
  const choicesContainer = document.getElementById('choices-container');
  const choicesBox = document.getElementById('encounter-choices');

  const SCENARIOS = [
    {
      type: "Kỳ Ngộ Cổ Ngữ (Thành Công Lớn)",
      desc: (loc, time, w, b, s) => `Tại ${loc}, khi bầu trời chuyển sang trạng thái ${w} vào lúc ${time}, bạn cùng ${b} đang lần theo dấu vết ma pháp bí mật. Bất ngờ, ${b} (${s}) khựng lại, đôi tai giật giật rồi dùng mõm hích mạnh vào tay bạn, hướng bạn nhìn về một hốc cây cổ thụ rực sáng phù văn thất truyền. Dưới gốc rễ là một bình huyết tinh ma thú tinh khiết còn nguyên vẹn, tỏa ra dao động Tinh Lực mãnh liệt khiến thú khế ước của bạn thèm thuồng cào cấu mặt đất...`,
      choices: [
        "1. Nhường bình huyết tinh cho khế thú hấp thụ để tăng vọt Tinh Lực (Kích hoạt ngưỡng biến thân).",
        "2. Cất giữ bình dược liệu làm vật phẩm trao đổi tại Chợ Đen Thủy Triều Đen.",
        "3. Dùng ma pháp phân tích cổ ngữ trên hốc cây để tìm lối vào mật đạo lòng đất."
      ]
    },
    {
      type: "Chạm Trán Dã Tính Nguy Hiểm (Biến Cố Bất Ngờ)",
      desc: (loc, time, w, b, s) => `Giữa không gian ${loc} u ám trong màn ${w} lúc ${time}, tiếng bước chân nặng nề vang lên từ phía sau hàng rào gai. Một phân đội Tuần Tra Hiệp Sĩ Kael-Varn cầm đèn lồng ma pháp đang tiến tới gần. Trong khi đó, ${b} lại đang ở trạng thái ${s}, đôi mắt đỏ rực phát quang và bắt đầu phát ra những tiếng gầm gừ đe dọa không thể kiềm chế. Chỉ còn chưa đầy 30 giây trước khi ánh sáng đèn tuần tra quét trúng vị trí của hai bạn...`,
      choices: [
        "1. Ôm chặt lấy thú cưng, áp dụng kỹ thuật xoa bóp hõm tai Cấp độ 2 để dỗ dành dã tính trước khi bị phát hiện.",
        "2. Kéo thú lẩn sâu vào bóng tối hẻm đá, nín thở chờ đoàn tuần tra đi qua.",
        "3. Lập tức tung một quả cầu huyễn thuật nghi binh đánh lạc hướng hiệp sĩ sang hướng ngược lại."
      ]
    },
    {
      type: "Dã Tính Bộc Phát & Đòi Hỏi Vuốt Ve (Tương Tác Xúc Giác)",
      desc: (loc, time, w, b, s) => `Dừng chân nghỉ lại tại ${loc} trong cảnh ${w} lúc ${time}, hơi lạnh ban đêm phả vào da thịt. Bất thình lình, ${b} (${s}) tiến lại gần, dùng cơ thể đồ sộ quấn chặt lấy bạn, vùi đầu vào lồng ngực bạn phát ra tiếng rên rỉ trầm đục. Hơi thở nóng hổi của nó mang theo mùi cỏ sương và ma lực cuồng bạo. Nó đòi hỏi bạn phải chạm vào các vùng nhạy cảm trên cơ thể để xoa dịu cơn đói Tinh Lực đang thiêu đốt bên trong...`,
      choices: [
        "1. Chậm rãi vuốt dọc từ sống lưng xuống gốc đuôi, giải phóng ma lực ấm áp để hòa giải dã tính.",
        "2. Đút cho nó một phần thịt tươi tẩm thảo dược an thần để làm dịu cơn cồn cào.",
        "3. Thiết lập kết giới cách âm tạm thời và tiến hành nghi thức dung hòa Tinh Lực cấp độ 3."
      ]
    },
    {
      type: "Khám Phá Di Tích & Giao Dịch Ngầm (Khám Phá Tự Do)",
      desc: (loc, time, w, b, s) => `Đang lang thang qua ${loc} vào lúc ${time} dưới hiện tượng ${w}, bạn vô tình bắt gặp một bóng đen khoác áo choàng rách rưới đang trao đổi một quả trứng thú phát sáng ánh kim với một quý tộc Tháp Kim Cương. ${b} đi bên cạnh bạn (${s}) bỗng nhiên giật giật vây/tai, nhận ra quả trứng kia mang huyết mạch cùng chủng tộc thủy tổ với chính mình. Kẻ buôn lậu dường như vừa đánh rơi một cuốn sổ da ghi chép bản đồ mật đạo ngầm...`,
      choices: [
        "1. Lợi dụng bóng đêm đoạt lấy cuốn sổ da rồi nhanh chóng rút lui an toàn.",
        "2. Tiếp cận kẻ buôn lậu để tra hỏi nguồn gốc của quả trứng huyết mạch thủy tổ.",
        "3. Báo cáo bí mật cho Giáo sư trực ban tại Thư Viện Vạn Cuộn để lập công chuộc phạt."
      ]
    }
  ];

  function rollEncounter() {
    const loc = locSelect?.value || 'Rừng Cấm Sylva';
    const time = timeSelect?.value || 'Đêm Cấm Giới 23:30';
    const weather = weatherSelect?.value || 'Sương Mù Bí Thuật Dày Đặc';
    const beast = beastSelect?.value || 'Sương Lang Nguyệt Ảnh';
    const state = stateSelect?.value || 'Dã tính bộc phát';

    const d20 = Math.floor(Math.random() * 20) + 1;
    const scenarioIdx = Math.floor(Math.random() * SCENARIOS.length);
    const scen = SCENARIOS[scenarioIdx];

    if (diceBadge) diceBadge.textContent = `🎲 D20: [${d20}]`;
    if (outcomeType) {
      if (d20 >= 16) outcomeType.textContent = `⭐ Đại Phát: ${scen.type}`;
      else if (d20 >= 8) outcomeType.textContent = `⚡ Bình Thường: ${scen.type}`;
      else outcomeType.textContent = `⚠️ Nguy Cấp: ${scen.type}`;
    }

    const narrative = scen.desc(loc, time, weather, beast, state);
    if (encounterText) encounterText.innerHTML = narrative;

    if (choicesContainer) {
      choicesContainer.innerHTML = scen.choices.map(c => `
        <div class="choice-item" onclick="selectChoice(this)">${c}</div>
      `).join('');
    }
    if (choicesBox) choicesBox.style.display = 'block';

    showToast(`Đã gieo xúc xắc D20: [${d20}] - Khởi tạo biến cố thành công!`);
  }

  if (rollBtn) rollBtn.addEventListener('click', rollEncounter);
  if (rerollBtn) rerollBtn.addEventListener('click', rollEncounter);

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = encounterText?.innerText || '';
      const prompt = `[BIẾN CỐ HỘP CÁT - THẦN KHẾ AETHELGARD]
${text}

[HÀNH ĐỘNG CỦA TÔI]: `;
      navigator.clipboard.writeText(prompt).then(() => {
        showToast('Đã sao chép kịch bản thám hiểm vào bộ nhớ tạm!');
      }).catch(() => {
        showToast('Lỗi khi sao chép, vui lòng copy thủ công.');
      });
    });
  }
}

function selectChoice(el) {
  document.querySelectorAll('.choice-item').forEach(c => c.style.borderColor = 'var(--border-color)');
  el.style.borderColor = 'var(--accent-gold)';
  el.style.background = 'rgba(212, 175, 55, 0.2)';
  showToast('Đã chọn hành động: ' + el.textContent.substring(0, 30) + '...');
}
