/* ============================================================
   MUSAFIR — Shared JavaScript
   AdminData: localStorage bridge (swap .get/.set for Supabase later)
   ============================================================ */

/* ── AdminData Module ── */
const AdminData = (() => {
  const KEY_PREFIX = 'musafir_';

  const DEFAULTS = {
    site: {
      name: 'Musafir Drinking Water',
      tagline: 'Pure Water, Pure Life',
      logo_url: '',
    },
    hero: {
      heading: 'Pure Water,\nPure Life',
      subheading: 'PREMIUM QUALITY',
      bangla: 'তৃষ্ণা মিটাতে পান করুন মুসাফির ড্রিংক ওয়াটার',
      cta1: 'Order Now',
      cta2: 'Contact Us',
      bottle_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFXVc8OlN2vKm26KDoHcEwi5PgBxqcZnhRwP3uQ8zcn_iqe04tW6q-3K5pT-OZOPPQUegQfCM8dsvX3aZHsokshTaQ6cT0LZRLKDUSpawzTr2TUd-wfURvCouF_CzghPHUpR9wCD7o0EJG2ASCChSLR_IraqMuB6rPEaem8RlOvTduUYFr5_bDnuUR2gXxbZ6tEzx4IvV-B5G5wyMyQGwcUjR-HB65BZaAWPRN9tmq0-OOrM5E5R33W-hJkTof8tEe2kr2AZdjfss',
    },
    about: {
      title: 'Essence of Purity',
      description: 'We believe clean water is a human right. Every drop of Musafir passes through multi-stage purification so you can drink with confidence.',
      features: [
        { icon: 'drop', title: '100% Purified', text: 'Multi-stage filtration removes all contaminants and balances essential minerals.' },
        { icon: 'shield', title: 'Safe & Hygienic', text: 'Fully automated bottling process — untouched by human hands until it reaches you.' },
        { icon: 'leaf', title: 'Fresh Taste', text: 'Crisp, clean taste that refreshes your soul and keeps you hydrated all day long.' },
      ],
    },
    products: [
      { id: 1, name: 'Musafir 500ml', size: '500ml', sub: 'Everyday Carry', price: '৳12', badge: 'Travel Size', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjQTAqlB2OJSwNBwGIdxOF-2avWxDaAZgp_mwypOO843ttMqzEPhXmmiz9fdJEhXxgqsv184rnTfnrMfRX3LjWOmLLzAHU_ozfu3ML9H4NZl_Z7F2ZuUJPMIYbQsfcgDz3mQgIG2qwgrCCtdGf2_0_s5r0hdhUhyHhwO5FSIi2Y_OaQU-f4HLFZDjpBH59weQkmrFlX3eVtPeZcRwjHT4VI9WB3bJX1AEbsacyecBYZTkGF4jIYwVO4AouD6ZXS8dAPGo8ZXqy6CM' },
      { id: 2, name: 'Musafir 1 Liter', size: '1L', sub: 'Daily Essential', price: '৳20', badge: 'Best Seller', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGgQcdezbxXmUOshU0Q062rRuKtRCgIR-nwc-IUz9qmHImzAQRsAqlmMUUCnIMYqnUkWlWuliU-J1pXE_Z9sssvK5clZQigH46I-B18tOpU4em40Pcts4ugPstXiUZNBASXigOxIHylFqeIcRf-cJaBuM7hPo4KnJiAXibnuDe8iElMuY0RSyGY6j3W71mFgSNde03n-h8xTob57TcpZ2M85tLxKNcvaDFkROnsbMStg5V-3nZfYZw2tH4z3eqfBT880PkGnr-oA' },
      { id: 3, name: 'Musafir 2 Liters', size: '2L', sub: 'Family Size', price: '৳35', badge: 'Family', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYbAfLmGwhV0FD0T67tB7Ey3IXs8ikGmXXBTeovIAX2UDm40pGfs4CwoRv7WRwe2OMVEr_MUtE61jneANYUCvAsS4qceeXHdP0mTnt8xbaI6p4k3vDHrAV-gf9Nfdm1RzC_GPjJBT8pWkVX-AvqX3b0vvvlBGVabDZg_yrqz7gVKbVtDwHui0zxEjqRi_sTdKzE929a2CLwCC9Ol63FBunjkU5oZCpiYyH47IzjoisPb43MGTW06AUalI_mbBWao3mvrYF2Ggra1E' },
    ],
    why: {
      title: 'Why Choose Musafir?',
      items: [
        { icon: 'check-circle', title: 'Quality Tested', text: 'Every batch rigorously tested to international purity standards.' },
        { icon: 'truck', title: 'Fast Delivery', text: 'Same-day delivery across the city, ice-cold to your doorstep.' },
        { icon: 'leaf', title: 'Eco Friendly', text: 'Recyclable bottles and sustainable packaging to protect our planet.' },
        { icon: 'star', title: 'Trusted Brand', text: 'Trusted by 5M+ families across Bangladesh for over a decade.' },
      ],
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3F8G-o05v860IW-yo-pefRRrJewawR7ftyhdzTHA7md5-c0R3I6Fn05RrSQ4SQrK-IWhISsaN32zaqNjARsywgTqEkSjMlIyXOe7Z1hBd-JoZtMVbY2UUnVt0m2_duAfKxifpsrauw-WZ6RYx8VsxKNzgIk2cNjHzWMhcPuduNZrHww-0nI0EMzwaNzy3yrrUM1dWIP1CtjwFNpFUOpBtIPdBvdtikbcoJOj3SQ_8Pz-v4V5BmTfAR_PaeXIEUPdMS8HfbL6YP6o',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgKwyY0fOmr-fWCTYmhrCJUGh1WZ_yWWaHSiX9h9Cw4XrrT1eXpXVJQPTIIDh_IIvKJDPx47sSjeKWXMb0OQ5Xi69Z7_JkRHVS3yUKLFTYDGgATzsFikTgV_I711vjKDRtycaPqvROzm4RWYZSeCwOpkxiHQZX5pC-HAYfazpFiFGKju8akjPtozDxsZ9qKtlED3ZFJT989jYA1VTD3bR6m0fOeMEmKKywcrhsmJNdqLG7b7oyI1uS6S-Tq7RuJzGsF8_mcDWvCeI',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDd4oL7Q9kBiaFiQiSu9mEJW_yExiK8ClMuWITSAf6SrrO4pugH5e_vBxCsZEnmVSJ3HHgqMcFj3YIZ2xED5t8A-tsFrycoTS6B5Sgn12ljtPusgOyqIYnWCSD3mI8wYpYu_dD2Hyy6P2c_TgcX2i48hCBbGGJJPzlyV0NhTjVBpgKiveNv_WCbXKKIBjXBK8vv0H7x_WFr-q0dRl4NqrQC_bIm8stX2i1cTbRjDAn369GXTCE_zAC8YeEWECf5vXeY2Jgyq7JEvRo',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDAs0npE5vGpyPdDIY1o1R-vDqOGDo4kgjvxrKq4TLjrRF1N6SDvmV1W4fNKj39WwwFqEpY0Qa5U9RSuWEsKzrpJIhk84-Oc1nNkKXY-Iyc0DJ5xVqoTnceudi4hR2e3iQ94TvvqO8XjE0jfB69tv6xYDMQmMf38yk0p9KJrmVUgpvhi1utKQKKX3t8w5891l8_FaVTp5nwRRL7MqNxqH9Mb_yo9tJnhClYZOKTyYkDnTToW7NJF-6z7sguKdo9khbn89iETAiEwk',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAgqELxpN8In_2Vpcz1udtJZyKHNoOOQZCjbQjl44mq_TT-EN296nP39rCl-itKCcyt-7NDtHw4SSC0rqWLJS2fJSuA8zudeU998nhzmVQGT4FXzrWp2RvjRAwW02-x1mCDT655T-942bBfK6r-eF1ugGnUR8FDDYtksoVejYQ9I7L6k1_gr5WmReh5g29_gUeJwRhch_Vbb0Iea_KCEh1VVqGJChKJKRMujXA1qPw28-C4Qzcl4omN1Jt5gKTvV6ePx5uurzb0K4',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCCwaiA97vCmOV7kxVS9HBOUBoYlo5M7Swehw13Uv0ReP8cm050te00VoODsDsJM82vkSEuc2GlDH6eFu9-2tGvOn3R3U6ciE78a9i7t12DvEsvGBnuFcR_zL9JVtiaPh2KkxQ9XasS4oc2ZsL7SUEEEhYs-_zWFwZfgJEBqn8wdTqZ15jzdfxs8zX1HvRScBgu8zxgatB11muO1vKq0nKAtxQaLCnC0Lt6QPU907eU30daPqbX9gd_EWfWd08SFcQLzdiVNArv54',
    ],
    contact: {
      phone1: '+880 1234-567890',
      phone2: '+880 9876-543210',
      email: 'hello@musafirwater.com',
      address: '123 Purity Lane, Dhaka, Bangladesh',
      whatsapp: '+8801234567890',
    },
    footer: {
      tagline: 'Dedicated to providing the purest bottled water for your healthy lifestyle. Every drop is a promise of quality.',
      facebook: '#',
      instagram: '#',
      twitter: '#',
      youtube: '#',
    },
  };

  function get(section) {
    try {
      const stored = localStorage.getItem(KEY_PREFIX + section);
      return stored ? JSON.parse(stored) : DEFAULTS[section];
    } catch { return DEFAULTS[section]; }
  }
  function set(section, data) {
    localStorage.setItem(KEY_PREFIX + section, JSON.stringify(data));
  }
  function reset(section) {
    localStorage.removeItem(KEY_PREFIX + section);
  }
  function getDefaults(section) { return DEFAULTS[section]; }
  return { get, set, reset, getDefaults, DEFAULTS };
})();

/* ── Nav Scroll & Mobile Toggle ── */
function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  if(sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
  }
}

/* ── Scroll Animations ── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ── Gallery Lightbox ── */
function initLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  if (!lb) return;
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lb.classList.add('open');
    });
  });
  lbClose && lbClose.addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', (e) => { if(e.target === lb) lb.classList.remove('open'); });
}

/* ── Contact Form ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✓ Message sent! We\'ll get back to you soon.', 'success');
    form.reset();
  });
}

/* ── Toast ── */
function showToast(msg, type = 'success') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── Hydrate Frontend from AdminData ── */
function hydratePage() {
  const hero = AdminData.get('hero');
  const site = AdminData.get('site');
  const contact = AdminData.get('contact');

  // Site name
  document.querySelectorAll('[data-admin="site-name"]').forEach(el => { el.textContent = site.name; });

  // Hero
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle && hero.heading) heroTitle.innerHTML = hero.heading.replace('\n', '<br>');
  const heroBangla = document.getElementById('hero-bangla');
  if (heroBangla && hero.bangla) heroBangla.textContent = hero.bangla;
  const heroBottle = document.getElementById('hero-bottle');
  if (heroBottle && hero.bottle_url) heroBottle.src = hero.bottle_url;

  // Products
  const productsGrid = document.getElementById('products-grid');
  if (productsGrid) {
    const products = AdminData.get('products');
    productsGrid.innerHTML = products.map(p => `
      <div class="product-card glass fade-in-up">
        <div class="product-img-wrap">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="product-sub">${p.sub}</p>
          <p class="product-price">${p.price}</p>
          <button class="product-btn" onclick="window.location.href='#contact'">Order Now</button>
        </div>
      </div>`).join('');
    initScrollAnimations();
  }

  // Gallery
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    const galleries = AdminData.get('gallery');
    galleryGrid.innerHTML = galleries.map((url, i) => `
      <div class="gallery-item fade-in-up" style="animation-delay:${i*0.07}s">
        <img src="${url}" alt="Gallery ${i+1}" loading="lazy">
      </div>`).join('');
    initScrollAnimations();
    initLightbox();
  }

  // Contact info
  const phone1El = document.getElementById('contact-phone1');
  const phone2El = document.getElementById('contact-phone2');
  const emailEl = document.getElementById('contact-email');
  if (phone1El) phone1El.textContent = contact.phone1;
  if (phone2El) phone2El.textContent = contact.phone2;
  if (emailEl) emailEl.textContent = contact.email;
}

/* ── Init all on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  initContactForm();
  if (document.querySelector('.gallery-item')) initLightbox();
  hydratePage();
});

/* ══════════════════════════════════════════════
   ADMIN PANEL JS (runs only on admin.html)
══════════════════════════════════════════════ */
function initAdmin() {
  // ── Login ──
  const loginScreen = document.getElementById('admin-login');
  const adminApp = document.getElementById('admin-app');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const ADMIN_PASS = 'musafir2024';

  if (!loginScreen) return; // not admin page

  // Check if already logged in
  if (sessionStorage.getItem('musafir_admin') === '1') {
    loginScreen.style.display = 'none';
    adminApp.style.display = 'flex';
    renderAdminDashboard();
  }

  loginForm && loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = document.getElementById('admin-password').value;
    if (pwd === ADMIN_PASS) {
      sessionStorage.setItem('musafir_admin', '1');
      loginScreen.style.display = 'none';
      adminApp.style.display = 'flex';
      renderAdminDashboard();
      loginError.style.display = 'none';
    } else {
      loginError.style.display = 'block';
      loginError.textContent = 'Incorrect password. Try again.';
    }
  });

  // ── Logout ──
  document.getElementById('admin-logout-btn') && document.getElementById('admin-logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('musafir_admin');
    location.reload();
  });

  // ── Navigation ──
  document.querySelectorAll('.admin-nav-item[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.panel;
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
      document.getElementById('admin-panel-title').textContent = btn.querySelector('.nav-label').textContent;
    });
  });
}

function renderAdminDashboard() {
  renderHeroPanel();
  renderAboutPanel();
  renderProductsPanel();
  renderGalleryPanel();
  renderWhyPanel();
  renderContactPanel();
  renderFooterPanel();
  renderSitePanel();
}

/* Hero Panel */
function renderHeroPanel() {
  const d = AdminData.get('hero');
  setValue('admin-hero-heading', d.heading);
  setValue('admin-hero-subheading', d.subheading);
  setValue('admin-hero-bangla', d.bangla);
  setValue('admin-hero-cta1', d.cta1);
  setValue('admin-hero-cta2', d.cta2);
  setValue('admin-hero-bottle', d.bottle_url);

  document.getElementById('save-hero') && document.getElementById('save-hero').addEventListener('click', () => {
    AdminData.set('hero', {
      heading: getValue('admin-hero-heading'),
      subheading: getValue('admin-hero-subheading'),
      bangla: getValue('admin-hero-bangla'),
      cta1: getValue('admin-hero-cta1'),
      cta2: getValue('admin-hero-cta2'),
      bottle_url: getValue('admin-hero-bottle'),
    });
    showToast('Hero section saved!', 'success');
  });
}

/* About Panel */
function renderAboutPanel() {
  const d = AdminData.get('about');
  setValue('admin-about-title', d.title);
  setValue('admin-about-desc', d.description);
  d.features.forEach((f, i) => {
    setValue(`admin-feature-title-${i}`, f.title);
    setValue(`admin-feature-text-${i}`, f.text);
  });
  document.getElementById('save-about') && document.getElementById('save-about').addEventListener('click', () => {
    const features = [0,1,2].map(i => ({
      title: getValue(`admin-feature-title-${i}`),
      text: getValue(`admin-feature-text-${i}`),
    }));
    AdminData.set('about', {
      title: getValue('admin-about-title'),
      description: getValue('admin-about-desc'),
      features,
    });
    showToast('About section saved!', 'success');
  });
}

/* Products Panel */
function renderProductsPanel() {
  const products = AdminData.get('products');
  const list = document.getElementById('product-admin-list');
  if (!list) return;

  function renderList() {
    const prods = AdminData.get('products');
    list.innerHTML = prods.map(p => `
      <div class="product-admin-item">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'><rect width=\'60\' height=\'60\' fill=\'%23e0f2fe\'></rect></svg>'">
        <div class="item-info">
          <div class="item-name">${p.name}</div>
          <div class="item-meta">${p.size} · ${p.price}</div>
        </div>
        <div class="item-actions">
          <button class="btn-edit" onclick="openProductModal(${p.id})">Edit</button>
          <button class="btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </div>`).join('');
  }
  renderList();
  window._refreshProductList = renderList;

  document.getElementById('add-product-btn') && document.getElementById('add-product-btn').addEventListener('click', () => openProductModal(null));
}

window.openProductModal = function(id) {
  const prods = AdminData.get('products');
  const prod = id ? prods.find(p => p.id === id) : null;
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  setValue('pm-name', prod ? prod.name : '');
  setValue('pm-size', prod ? prod.size : '');
  setValue('pm-sub', prod ? prod.sub : '');
  setValue('pm-price', prod ? prod.price : '');
  setValue('pm-badge', prod ? prod.badge : '');
  setValue('pm-img', prod ? prod.img : '');
  document.getElementById('pm-id').value = id || '';
  modal.classList.add('open');
};

window.closeProductModal = function() {
  document.getElementById('product-modal') && document.getElementById('product-modal').classList.remove('open');
};

window.saveProduct = function() {
  const id = document.getElementById('pm-id').value;
  let prods = AdminData.get('products');
  const data = {
    id: id ? parseInt(id) : Date.now(),
    name: getValue('pm-name'),
    size: getValue('pm-size'),
    sub: getValue('pm-sub'),
    price: getValue('pm-price'),
    badge: getValue('pm-badge'),
    img: getValue('pm-img'),
  };
  if (id) {
    prods = prods.map(p => p.id === parseInt(id) ? data : p);
  } else {
    prods.push(data);
  }
  AdminData.set('products', prods);
  closeProductModal();
  showToast('Product saved!', 'success');
  window._refreshProductList && window._refreshProductList();
};

window.deleteProduct = function(id) {
  if (!confirm('Delete this product?')) return;
  let prods = AdminData.get('products').filter(p => p.id !== id);
  AdminData.set('products', prods);
  showToast('Product deleted.', 'success');
  window._refreshProductList && window._refreshProductList();
};

/* Gallery Panel */
function renderGalleryPanel() {
  const grid = document.getElementById('gallery-admin-grid');
  if (!grid) return;

  function renderGallery() {
    const imgs = AdminData.get('gallery');
    grid.innerHTML = imgs.map((url, i) => `
      <div class="gallery-thumb">
        <img src="${url}" alt="img ${i}" onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><rect width=\'100\' height=\'100\' fill=\'%23e0f2fe\'></rect></svg>'">
        <button class="rm-btn" onclick="removeGalleryImage(${i})" title="Remove">✕</button>
      </div>`).join('');
  }
  renderGallery();
  window._refreshGallery = renderGallery;

  document.getElementById('add-gallery-btn') && document.getElementById('add-gallery-btn').addEventListener('click', () => {
    const url = prompt('Paste image URL:');
    if (!url) return;
    const imgs = AdminData.get('gallery');
    imgs.push(url.trim());
    AdminData.set('gallery', imgs);
    renderGallery();
    showToast('Image added!', 'success');
  });
}

window.removeGalleryImage = function(i) {
  const imgs = AdminData.get('gallery');
  imgs.splice(i, 1);
  AdminData.set('gallery', imgs);
  showToast('Image removed.', 'success');
  window._refreshGallery && window._refreshGallery();
};

/* Why Us Panel */
function renderWhyPanel() {
  const d = AdminData.get('why');
  setValue('admin-why-title', d.title);
  d.items.forEach((item, i) => {
    setValue(`admin-why-title-${i}`, item.title);
    setValue(`admin-why-text-${i}`, item.text);
  });
  document.getElementById('save-why') && document.getElementById('save-why').addEventListener('click', () => {
    const items = [0,1,2,3].map(i => ({
      title: getValue(`admin-why-title-${i}`),
      text: getValue(`admin-why-text-${i}`),
    }));
    AdminData.set('why', { title: getValue('admin-why-title'), items });
    showToast('Why Us section saved!', 'success');
  });
}

/* Contact Panel */
function renderContactPanel() {
  const d = AdminData.get('contact');
  setValue('admin-phone1', d.phone1);
  setValue('admin-phone2', d.phone2);
  setValue('admin-email', d.email);
  setValue('admin-address', d.address);
  setValue('admin-whatsapp', d.whatsapp);
  document.getElementById('save-contact') && document.getElementById('save-contact').addEventListener('click', () => {
    AdminData.set('contact', {
      phone1: getValue('admin-phone1'),
      phone2: getValue('admin-phone2'),
      email: getValue('admin-email'),
      address: getValue('admin-address'),
      whatsapp: getValue('admin-whatsapp'),
    });
    showToast('Contact info saved!', 'success');
  });
}

/* Footer Panel */
function renderFooterPanel() {
  const d = AdminData.get('footer');
  setValue('admin-footer-tagline', d.tagline);
  setValue('admin-footer-fb', d.facebook);
  setValue('admin-footer-ig', d.instagram);
  setValue('admin-footer-tw', d.twitter);
  setValue('admin-footer-yt', d.youtube);
  document.getElementById('save-footer') && document.getElementById('save-footer').addEventListener('click', () => {
    AdminData.set('footer', {
      tagline: getValue('admin-footer-tagline'),
      facebook: getValue('admin-footer-fb'),
      instagram: getValue('admin-footer-ig'),
      twitter: getValue('admin-footer-tw'),
      youtube: getValue('admin-footer-yt'),
    });
    showToast('Footer saved!', 'success');
  });
}

/* Site Settings Panel */
function renderSitePanel() {
  const d = AdminData.get('site');
  setValue('admin-site-name', d.name);
  setValue('admin-site-tagline', d.tagline);
  setValue('admin-site-logo', d.logo_url);
  document.getElementById('save-site') && document.getElementById('save-site').addEventListener('click', () => {
    AdminData.set('site', {
      name: getValue('admin-site-name'),
      tagline: getValue('admin-site-tagline'),
      logo_url: getValue('admin-site-logo'),
    });
    showToast('Site settings saved!', 'success');
  });
  document.getElementById('reset-all-btn') && document.getElementById('reset-all-btn').addEventListener('click', () => {
    if (!confirm('Reset ALL settings to defaults? This cannot be undone.')) return;
    ['site','hero','about','products','why','gallery','contact','footer'].forEach(k => AdminData.reset(k));
    showToast('All settings reset to defaults.', 'success');
    setTimeout(() => location.reload(), 1200);
  });
}

/* Helpers */
function setValue(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') el.value = val || '';
  else el.textContent = val || '';
}
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

document.addEventListener('DOMContentLoaded', initAdmin);
