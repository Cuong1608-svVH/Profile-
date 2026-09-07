/**
 * DevProfile Pro - Core Application Logic
 * Single Source of Truth: Dữ liệu hồ sơ cố định trực tiếp từ mã nguồn
 */

// Dữ liệu hồ sơ chính thức của bạn (Chỉnh sửa trực tiếp tại đây)
const DEFAULT_PROFILE = {
  name: "Nguyễn Văn Cường",
  title: "Senior Fullstack Developer & Cloud Architect",
  status: "Sẵn sàng nhận dự án mới (Available for Hire)",
  location: "Đà Nẵng , Việt Nam",
  email: "cuongnv.23itb@vku.udn.vn",
  phone: "+84 905 966 212",
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
    facebook: "https://www.facebook.com/cuong.539829"
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
      company: "Đại học Bách Khoa",
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

// Dữ liệu luôn lấy trực tiếp từ DEFAULT_PROFILE
const currentProfile = DEFAULT_PROFILE;

// Khởi chạy ứng dụng
document.addEventListener('DOMContentLoaded', () => {
  // Xóa bỏ bất kỳ dữ liệu cũ nào từng lưu trong LocalStorage để luôn đồng bộ 100% với code
  try {
    localStorage.removeItem('devprofile_data');
    localStorage.removeItem('devprofile_theme');
  } catch (e) { }

  initPrintButton();
  renderApp();
});

// 1. Kết xuất giao diện (Render Functions)
function renderApp() {
  if (!currentProfile) return;
  renderHero();
  renderStats();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderContact();
}

function renderHero() {
  const avatarEl = document.getElementById('profileAvatar');
  if (avatarEl) {
    avatarEl.src = currentProfile.avatar || 'Untitled.png';
    avatarEl.onerror = () => {
      avatarEl.src = 'assets/Untitled.png';
    };
  }

  document.getElementById('profileName').textContent = currentProfile.name;
  document.getElementById('profileTitle').textContent = currentProfile.title;
  document.getElementById('profileBio').textContent = currentProfile.bio;
  document.getElementById('profileStatusText').textContent = currentProfile.status;
  document.getElementById('profileLocation').textContent = currentProfile.location;
  document.getElementById('profileEmailText').textContent = currentProfile.email;
  document.getElementById('profileEmailLink').href = `mailto:${currentProfile.email}`;
}

function renderStats() {
  const stats = currentProfile.stats || {};
  document.getElementById('statExp').textContent = stats.experience || '5+ Năm';
  document.getElementById('statProjects').textContent = stats.projects || '38+ Dự án';
  document.getElementById('statSatisfaction').textContent = stats.satisfaction || '99.8%';
}

function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;
  container.innerHTML = '';

  (currentProfile.skills || []).forEach(category => {
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

  (currentProfile.projects || []).forEach(project => {
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
          ${(project.tags || []).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <a href="${escapeHtml(project.liveUrl || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Xem Dự Án
        </a>
        <a href="${escapeHtml(project.repoUrl || '#')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
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
    (currentProfile.experiences || []).forEach(item => {
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
    (currentProfile.education || []).forEach(item => {
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
  if (socialList) {
    socialList.innerHTML = '';
    const s = currentProfile.socials || {};
    const socialEntries = [
      { name: 'GitHub', url: s.github },
      { name: 'LinkedIn', url: s.linkedin },
      { name: 'Twitter / X', url: s.twitter },
      { name: 'Facebook', url: s.facebook }
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

  // Cập nhật thông tin email và phone ở dưới card liên hệ
  const emailLink = document.getElementById('contactEmailLink');
  const emailText = document.getElementById('contactEmailText');
  if (emailLink && emailText) {
    emailLink.href = `mailto:${currentProfile.email}`;
    emailText.textContent = currentProfile.email;
  }

  const phoneLink = document.getElementById('contactPhoneLink');
  const phoneText = document.getElementById('contactPhoneText');
  if (phoneLink && phoneText) {
    phoneLink.href = `tel:${(currentProfile.phone || '').replace(/\s+/g, '')}`;
    phoneText.textContent = currentProfile.phone;
  }
}



// 3. In ấn CV
function initPrintButton() {
  const printCvBtn = document.getElementById('printCvBtn');
  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Helper: Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
