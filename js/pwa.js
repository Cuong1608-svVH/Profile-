// PWA Registration & Install Management
let deferredPrompt = null;

window.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  initInstallPrompt();
  initNetworkStatus();
});

// 1. Register Service Worker
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered successfully, scope:', registration.scope);

          // Check for update found
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showNotification('Có phiên bản mới! Hãy tải lại trang để cập nhật.', 'info');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    });
  }
}

// 2. Custom Install Prompt Handling
function initInstallPrompt() {
  const installBtn = document.getElementById('installAppBtn');
  const installBanner = document.getElementById('pwaInstallBanner');
  const installBannerBtn = document.getElementById('bannerInstallBtn');
  const closeBannerBtn = document.getElementById('closeBannerBtn');

  // Check if running in standalone mode (already installed)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone || 
                       document.referrer.includes('android-app://');

  if (isStandalone) {
    if (installBtn) installBtn.style.display = 'none';
    if (installBanner) installBanner.style.display = 'none';
    console.log('[PWA] App is running in standalone mode');
    return;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent standard mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] beforeinstallprompt event captured');

    // Show custom install triggers
    if (installBtn) {
      installBtn.classList.remove('hidden');
      installBtn.style.display = 'inline-flex';
    }
    if (installBanner && !sessionStorage.getItem('pwa-banner-dismissed')) {
      installBanner.classList.remove('hidden');
    }
  });

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If browser doesn't trigger prompt (e.g. iOS Safari), show instructions
      showIosOrManualInstallModal();
      return;
    }
    // Show native prompt
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User response to install prompt: ${outcome}`);

    if (outcome === 'accepted') {
      showNotification('Đang cài đặt ứng dụng DevProfile...', 'success');
      if (installBtn) installBtn.style.display = 'none';
      if (installBanner) installBanner.style.display = 'none';
    }
    deferredPrompt = null;
  };

  if (installBtn) {
    installBtn.addEventListener('click', handleInstallClick);
  }
  if (installBannerBtn) {
    installBannerBtn.addEventListener('click', handleInstallClick);
  }
  if (closeBannerBtn && installBanner) {
    closeBannerBtn.addEventListener('click', () => {
      installBanner.classList.add('hidden');
      sessionStorage.setItem('pwa-banner-dismissed', 'true');
    });
  }

  // When successfully installed
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Application installed successfully');
    showNotification('Ứng dụng DevProfile đã được cài đặt vào máy của bạn!', 'success');
    if (installBtn) installBtn.style.display = 'none';
    if (installBanner) installBanner.style.display = 'none';
    deferredPrompt = null;
  });
}

// 3. Online/Offline Network Status
function initNetworkStatus() {
  const updateStatus = () => {
    if (navigator.onLine) {
      showNotification('Đã khôi phục kết nối Internet!', 'success');
      document.body.classList.remove('is-offline');
    } else {
      showNotification('Bạn đang ngoại tuyến. Ứng dụng vẫn hoạt động nhờ PWA Cache!', 'warning');
      document.body.classList.add('is-offline');
    }
  };

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
}

// Helper: Show iOS or fallback install modal
function showIosOrManualInstallModal() {
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  let msg = 'Để cài đặt: Trên trình duyệt Chrome/Edge, nhấp vào biểu tượng Cài đặt trên thanh địa chỉ.';
  if (isIos) {
    msg = 'Trên Safari iOS: Nhấn vào nút "Chia sẻ" (biểu tượng hình vuông có mũi tên lên) rồi chọn "Thêm vào MH chính" (Add to Home Screen).';
  }
  alert(msg);
}

// Toast notification helper
function showNotification(text, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      ${type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ'}
    </div>
    <div class="toast-message">${text}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

window.showNotification = showNotification;
