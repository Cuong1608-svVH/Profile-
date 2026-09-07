/**
 * DevProfile Pro - Core Application Logic
 * State Management, Dynamic Rendering, Theme Switcher & Profile Studio
 */

// Default rich developer profile data
const DEFAULT_PROFILE = {
  name: "Nguyễn Văn Cường",
  title: "Senior Fullstack Developer & Cloud Architect",
  status: "Sẵn sàng nhận dự án mới (Available for Hire)",
  location: "Đà Nẵng , Việt Nam",
  email: "hoangminh.dev@example.com",
  phone: "+84 905 966 212 ",
  website: "https://github.com/Cuong1608-svVH",
  bio: "Kỹ sư phần mềm với hơn 5 năm kinh nghiệm chuyên sâu về React, Node.js, TypeScript và Cloud Architecture (AWS/GCP). Đam mê xây dựng các sản phẩm số có độ tải cao, tối ưu trải nghiệm người dùng (UX) và hiệu năng web vượt trội.",
  avatar: "Untitled.png",
  stats: {
    experience: "5+ Năm",
    projects: "38+ Dự án",
    satisfaction: "99.8% Hài lòng"
  },
  socials: {
    github: "https://github.com/Cuong1608-svVH",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    facebook: "https://facebook.com"
  },
  skills: [
    {
      category: "Frontend & PWA",
      items: [
        { name: "React / Next.js", percent: 95 },
        { name: "TypeScript / ESNext", percent: 92 },
        { name: "PWA & Offline Web", percent: 98 },
        { name: "Vanilla CSS3 / Tailwind", percent: 90 }
      ]
    },
    {
      category: "Backend & Database",
      items: [
        { name: "Node.js & NestJS", percent: 92 },
        { name: "PostgreSQL & Prisma", percent: 88 },
        { name: "Redis & WebSockets", percent: 85 },
        { name: "Python / FastAPI", percent: 80 }
      ]
    },
    {
      category: "DevOps & Cloud",
      items: [
        { name: "Docker & Containerization", percent: 88 },
        { name: "AWS Cloud (S3, ECS, Lambda)", percent: 84 },
        { name: "CI/CD & GitHub Actions", percent: 90 },
        { name: "Linux & Security Best Practices", percent: 85 }
      ]
    }
  ],
  projects: [
    {
      title: "SaaS Analytics Hub & Realtime Monitoring",
      desc: "Nền tảng SaaS phân tích và giám sát dữ liệu người dùng theo thời gian thực với hơn 100,000 sự kiện mỗi giây, kiến trúc Microservices và giao diện tương tác trực quan.",
      image: "assets/project-saas.jpg",
      tags: ["React", "TypeScript", "Node.js", "Redis", "WebSockets"],
      liveUrl: "https://github.com/Cuong1608-svVH",
      repoUrl: "https://github.com/Cuong1608-svVH"
    },
    {
      title: "Neonex - Crypto & Fintech Mobile Web App",
      desc: "Ứng dụng ví thanh toán kỹ thuật số thế hệ mới, hỗ trợ giao dịch đa tài sản, thẻ ảo tương tác 3D và chuẩn xác thực sinh trắc học PWA cài đặt trực tiếp trên di động.",
      image: "assets/project-fintech.jpg",
      tags: ["PWA", "JavaScript", "Vue.js", "Tailwind", "REST API"],
      liveUrl: "https://github.com/Cuong1608-svVH",
      repoUrl: "https://github.com/Cuong1608-svVH"
    }
  ],
  experiences: [
    {
      role: "Lead Fullstack Engineer",
      company: "VinaTech Global Solutions",
      period: "2022 - Hiện tại",
      desc: "Chỉ đạo kỹ thuật đội ngũ 8 kỹ sư, kiến tạo hệ thống eCommerce đa nền tảng phục vụ hơn 1.2 triệu người dùng thường xuyên. Tối ưu hiệu năng tải trang từ 3.2s xuống 0.8s."
    },
    {
      role: "Senior Software Engineer",
      company: "FPT Software Digital",
      period: "2020 - 2022",
      desc: "Xây dựng các module thanh toán số và microservices core banking cho các đối tác tài chính quốc tế. Áp dụng chuẩn PWA cho ứng dụng khách hàng."
    },
    {
      role: "Frontend Developer",
      company: "NextGen Creative Studio",
      period: "2018 - 2020",
      desc: "Phát triển giao diện web đơn trang (SPA), tối ưu tương thích đa thiết bị và xây dựng thư viện thành phần dùng chung."
    }
  ],
  education: [
    {
      role: "Kỹ sư Khoa học Máy tính",
      company: "Đại học Bách Khoa Hà Nội",
      period: "2014 - 2018",
      desc: "Tốt nghiệp loại Giỏi. Chuyên ngành Công nghệ phần mềm & Hệ thống thông tin."
    },
    {
      role: "Chứng chỉ Cloud & DevOps",
      company: "AWS & Linux Foundation",
      period: "2021 - 2023",
      desc: "AWS Certified Solutions Architect Associate, CKA (Certified Kubernetes Administrator)."
    }
  ]
};

// Application State
let currentProfile = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadProfileData();
  initThemeManager();
  initModals();
  initFormHandlers();
  initQrCode();
  renderApp();
});

// 1. Data Management (LocalStorage & URL Sync)
function encodeProfileToHash(data) {
  try {
    const json = JSON.stringify(data);
    const utf8Bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < utf8Bytes.byteLength; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Error encoding profile to hash:', e);
    return '';
  }
}

function decodeProfileFromHash(hashStr) {
  try {
    let base64 = hashStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (e) {
    console.error('Error decoding profile from hash:', e);
    return null;
  }
}

function getShareableUrl() {
  const baseUrl = window.location.origin + window.location.pathname;
  if (!currentProfile) return baseUrl;

  // If current profile matches default profile, clean base URL is the share URL
  if (JSON.stringify(currentProfile) === JSON.stringify(DEFAULT_PROFILE)) {
    return baseUrl;
  }

  // Clone profile data
  const shareData = JSON.parse(JSON.stringify(currentProfile));

  // If avatar is huge raw base64 (> 15000 chars), fall back to default avatar to keep QR code scannable
  if (shareData.avatar && shareData.avatar.startsWith('data:') && shareData.avatar.length > 15000) {
    shareData.avatar = 'Untitled.png';
  }

  const hash = encodeProfileToHash(shareData);
  return `${baseUrl}#data=${hash}`;
}

function loadProfileData() {
  try {
    // Check if URL contains share data in hash or query param
    let urlData = null;
    const hash = window.location.hash;
    if (hash && hash.includes('data=')) {
      const paramStr = hash.split('data=')[1].split('&')[0];
      urlData = decodeProfileFromHash(paramStr);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const queryData = searchParams.get('data') || searchParams.get('p');
      if (queryData) {
        urlData = decodeProfileFromHash(queryData);
      }
    }

    if (urlData && urlData.name) {
      currentProfile = { ...DEFAULT_PROFILE, ...urlData };
      saveProfileData(false); // Automatically persist on this new device!
      setTimeout(() => {
        if (window.showNotification) {
          window.showNotification('🎉 Đã đồng bộ thành công hồ sơ vào thiết bị này!', 'success');
        }
      }, 600);
      return;
    }

    // Otherwise load from localStorage
    const saved = localStorage.getItem('devprofile_data');
    if (saved) {
      currentProfile = JSON.parse(saved);
    } else {
      currentProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
      saveProfileData(false);
    }
  } catch (e) {
    console.error('Error loading profile:', e);
    currentProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
  }
}

function saveProfileData(notify = true) {
  try {
    localStorage.setItem('devprofile_data', JSON.stringify(currentProfile));

    // Update share URL in browser history without page reload
    const shareUrl = getShareableUrl();
    window.history.replaceState(null, '', shareUrl);

    if (notify && window.showNotification) {
      window.showNotification('Đã lưu hồ sơ và tạo liên kết đồng bộ!', 'success');
    }
    renderApp();
  } catch (e) {
    console.error('Error saving profile:', e);
    if (notify && window.showNotification) {
      window.showNotification('Không thể lưu hồ sơ!', 'warning');
    }
  }
}

// 2. Render Functions
function renderApp() {
  if (!currentProfile) return;
  renderHero();
  renderStats();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderContact();
  updateQrCode();
}

function renderHero() {
  document.getElementById('profileAvatar').src = currentProfile.avatar || 'assets/avatar.jpg';
  document.getElementById('profileName').textContent = currentProfile.name;
  document.getElementById('profileTitle').textContent = currentProfile.title;
  document.getElementById('profileBio').textContent = currentProfile.bio;
  document.getElementById('profileStatusText').textContent = currentProfile.status;
  document.getElementById('profileLocation').textContent = currentProfile.location;
  document.getElementById('profileEmailText').textContent = currentProfile.email;
  document.getElementById('profileEmailLink').href = `mailto:${currentProfile.email}`;
}

function renderStats() {
  const stats = currentProfile.stats || DEFAULT_PROFILE.stats;
  document.getElementById('statExp').textContent = stats.experience;
  document.getElementById('statProjects').textContent = stats.projects;
  document.getElementById('statSatisfaction').textContent = stats.satisfaction;
}

function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;
  container.innerHTML = '';

  currentProfile.skills.forEach(category => {
    const card = document.createElement('div');
    card.className = 'skill-category-card';
    card.innerHTML = `
      <h3 class="category-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        ${escapeHtml(category.category)}
      </h3>
      <div class="skill-list">
        ${category.items.map(item => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${escapeHtml(item.name)}</span>
              <span class="skill-percent">${item.percent}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${item.percent}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderProjects() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = '';

  currentProfile.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-cover">
        <img class="project-img" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" onerror="this.src='assets/project-saas.jpg'">
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.desc)}</p>
        <div class="tech-tags">
          ${project.tags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Demo Trực Tiếp
        </a>
        <a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          Mã Nguồn
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderTimeline() {
  const expContainer = document.getElementById('experienceTimeline');
  if (expContainer) {
    expContainer.innerHTML = '';
    currentProfile.experiences.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div class="timeline-role">${escapeHtml(item.role)}</div>
            <div class="timeline-period">${escapeHtml(item.period)}</div>
          </div>
          <div class="timeline-company">${escapeHtml(item.company)}</div>
          <p class="timeline-desc">${escapeHtml(item.desc)}</p>
        </div>
      `;
      expContainer.appendChild(el);
    });
  }

  const eduContainer = document.getElementById('educationTimeline');
  if (eduContainer) {
    eduContainer.innerHTML = '';
    currentProfile.education.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div class="timeline-role">${escapeHtml(item.role)}</div>
            <div class="timeline-period">${escapeHtml(item.period)}</div>
          </div>
          <div class="timeline-company">${escapeHtml(item.company)}</div>
          <p class="timeline-desc">${escapeHtml(item.desc)}</p>
        </div>
      `;
      eduContainer.appendChild(el);
    });
  }
}

function renderContact() {
  const socialList = document.getElementById('socialList');
  if (!socialList) return;
  socialList.innerHTML = '';

  const s = currentProfile.socials || {};
  const socialEntries = [
    { name: 'GitHub', url: s.github, icon: 'github' },
    { name: 'LinkedIn', url: s.linkedin, icon: 'linkedin' },
    { name: 'Twitter / X', url: s.twitter, icon: 'twitter' },
    { name: 'Facebook', url: s.facebook, icon: 'facebook' }
  ];

  socialEntries.forEach(item => {
    if (item.url) {
      const a = document.createElement('a');
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'social-btn';
      a.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        ${item.name}
      `;
      socialList.appendChild(a);
    }
  });
}

// 3. Theme Manager
function initThemeManager() {
  const savedTheme = localStorage.getItem('devprofile_theme') || 'dark';
  setTheme(savedTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeDropdown = document.getElementById('themeDropdown');

  if (themeToggleBtn && themeDropdown) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      themeDropdown.classList.remove('show');
    });

    document.querySelectorAll('.theme-option').forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        setTheme(theme);
        themeDropdown.classList.remove('show');
      });
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('devprofile_theme', theme);

  document.querySelectorAll('.theme-option').forEach(opt => {
    if (opt.getAttribute('data-theme') === theme) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

// 4. Modals and Profile Studio Editor
function initModals() {
  // Profile Editor Modal
  const editBtn = document.getElementById('editProfileBtn');
  const modal = document.getElementById('editModal');
  const closeBtn = document.getElementById('closeEditModal');
  const cancelBtn = document.getElementById('cancelEditBtn');

  const openEditModal = () => {
    populateEditForm();
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  };

  const closeEditModal = () => {
    if (modal) modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  };

  if (editBtn && modal) {
    editBtn.addEventListener('click', openEditModal);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeEditModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeEditModal);

  // Close when clicking modal backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeEditModal();
    });
  }



  // Print CV button
  const printCvBtn = document.getElementById('printCvBtn');
  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy code buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-copy');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Đã chép!';
          setTimeout(() => btn.textContent = original, 2000);
        });
      }
    });
  });
}

function populateEditForm() {
  if (!currentProfile) return;
  document.getElementById('editName').value = currentProfile.name || '';
  document.getElementById('editTitle').value = currentProfile.title || '';
  document.getElementById('editStatus').value = currentProfile.status || '';
  document.getElementById('editBio').value = currentProfile.bio || '';
  document.getElementById('editEmail').value = currentProfile.email || '';
  document.getElementById('editPhone').value = currentProfile.phone || '';
  document.getElementById('editLocation').value = currentProfile.location || '';
  document.getElementById('editGithub').value = (currentProfile.socials && currentProfile.socials.github) || '';
  document.getElementById('editLinkedin').value = (currentProfile.socials && currentProfile.socials.linkedin) || '';
  document.getElementById('editTwitter').value = (currentProfile.socials && currentProfile.socials.twitter) || '';
}

function initFormHandlers() {
  const form = document.getElementById('profileEditForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      currentProfile.name = document.getElementById('editName').value.trim();
      currentProfile.title = document.getElementById('editTitle').value.trim();
      currentProfile.status = document.getElementById('editStatus').value.trim();
      currentProfile.bio = document.getElementById('editBio').value.trim();
      currentProfile.email = document.getElementById('editEmail').value.trim();
      currentProfile.phone = document.getElementById('editPhone').value.trim();
      currentProfile.location = document.getElementById('editLocation').value.trim();

      currentProfile.socials = {
        github: document.getElementById('editGithub').value.trim(),
        linkedin: document.getElementById('editLinkedin').value.trim(),
        twitter: document.getElementById('editTwitter').value.trim()
      };

      saveProfileData(true);
      const modal = document.getElementById('editModal');
      if (modal) modal.classList.remove('show');
      document.body.classList.remove('modal-open');
    });
  }

  // Avatar file input handler with auto-compression
  const avatarUpload = document.getElementById('avatarUpload');
  if (avatarUpload) {
    avatarUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressAndSetAvatar(file);
      }
    });
  }

  // Use GitHub Avatar button
  const useGithubAvatarBtn = document.getElementById('useGithubAvatarBtn');
  if (useGithubAvatarBtn) {
    useGithubAvatarBtn.addEventListener('click', () => {
      const githubInput = document.getElementById('editGithub');
      let url = (githubInput && githubInput.value.trim()) || (currentProfile.socials && currentProfile.socials.github) || '';
      if (!url) {
        url = prompt('Nhập link GitHub hoặc username của bạn: (Ví dụ: https://github.com/Cuong1608-svVH)');
      }
      if (url) {
        const parts = url.replace(/\/$/, '').split('/');
        const username = parts[parts.length - 1];
        if (username) {
          currentProfile.avatar = `https://github.com/${username}.png`;
          saveProfileData(false);
          document.getElementById('profileAvatar').src = currentProfile.avatar;
          if (githubInput) githubInput.value = `https://github.com/${username}`;
          if (window.showNotification) {
            window.showNotification(`Đã cập nhật ảnh đại diện GitHub của @${username}!`, 'success');
          }
        }
      }
    });
  }

  // Reset demo data button
  const resetBtn = document.getElementById('resetDataBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn khôi phục về dữ liệu hồ sơ mẫu ban đầu không?')) {
        currentProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
        saveProfileData(true);
        populateEditForm();
      }
    });
  }

  // Export JSON
  const exportBtn = document.getElementById('exportJsonBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentProfile, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `profile-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      if (window.showNotification) {
        window.showNotification('Đã xuất file JSON hồ sơ thành công!', 'success');
      }
    });
  }

  // Import JSON
  const importFile = document.getElementById('importJsonFile');
  if (importFile) {
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            if (imported.name && imported.skills) {
              currentProfile = imported;
              saveProfileData(true);
              populateEditForm();
            } else {
              alert('Cấu trúc file JSON không hợp lệ!');
            }
          } catch (err) {
            alert('Lỗi đọc file JSON: ' + err.message);
          }
        };
        reader.readAsText(file);
      }
    });
  }
}

// 5. QR Code & Profile Sharing
function initQrCode() {
  const copyBtn = document.getElementById('copyShareUrlBtn');
  const heroShareBtn = document.getElementById('heroShareBtn');

  const copyUrl = () => {
    const url = getShareableUrl();
    navigator.clipboard.writeText(url).then(() => {
      if (window.showNotification) {
        window.showNotification('📋 Đã sao chép link đồng bộ! Bạn có thể gửi link này hoặc mở trên điện thoại.', 'success');
      }
    }).catch(() => {
      prompt('Sao chép liên kết chia sẻ của bạn:', url);
    });
  };

  if (copyBtn) copyBtn.addEventListener('click', copyUrl);
  if (heroShareBtn) {
    heroShareBtn.addEventListener('click', () => {
      copyUrl();
      const qrSection = document.getElementById('contactSection');
      if (qrSection) qrSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function updateQrCode() {
  const qrContainer = document.getElementById('profileQrContainer');
  const qrInput = document.getElementById('qrShareUrl');
  if (!qrContainer) return;

  const shareUrl = getShareableUrl();
  if (qrInput) {
    qrInput.value = shareUrl;
  }

  qrContainer.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(qrContainer, {
        text: shareUrl,
        width: 160,
        height: 160,
        colorDark: '#0b0f19',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
      });
    } catch (e) {
      console.warn('QRCode generation fallback to clean URL:', e);
      const cleanUrl = window.location.origin + window.location.pathname;
      new QRCode(qrContainer, {
        text: cleanUrl,
        width: 160,
        height: 160,
        colorDark: '#0b0f19',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }
}

// Helper: Compress uploaded avatar image using canvas (keeps QR code compact)
function compressAndSetAvatar(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 120;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      currentProfile.avatar = canvas.toDataURL('image/jpeg', 0.7);
      saveProfileData(false);
      document.getElementById('profileAvatar').src = currentProfile.avatar;
      if (window.showNotification) {
        window.showNotification('Đã cập nhật và tối ưu ảnh đại diện mới!', 'success');
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Helper: Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
