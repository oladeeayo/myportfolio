(function () {
  const STORAGE_KEY = 'portfolio_posts';
  const container = document.getElementById('postsContainer');
  const noPosts = document.getElementById('noPosts');
  const modal = document.getElementById('postModal');
  const modalClose = document.getElementById('modalClose');
  const modalCategory = document.getElementById('modalCategory');
  const modalDate = document.getElementById('modalDate');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentFilter = 'all';
  let posts = [];

  function getPosts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data).filter(p => p.published !== false) : [];
    } catch { return []; }
  }

  function render() {
    posts = getPosts();
    const filtered = currentFilter === 'all' ? posts : posts.filter(p => p.category === currentFilter);

    container.innerHTML = '';
    noPosts.style.display = filtered.length ? 'none' : 'block';

    filtered.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.setAttribute('role', 'listitem');
      card.style.cursor = 'pointer';

      const tags = post.tags
        ? post.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="category-badge">${post.category || 'blog'}</span>
          <span class="post-date">${post.date || ''}</span>
        </div>
        <h3>${post.title || 'Untitled'}</h3>
        <p class="post-excerpt">${post.excerpt || ''}</p>
        ${tags.length ? `<div class="post-tags">${tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
      `;

      card.addEventListener('click', () => openModal(post));
      container.appendChild(card);
    });
  }

  function openModal(post) {
    modalCategory.textContent = post.category || 'blog';
    modalDate.textContent = post.date || '';
    modalTitle.textContent = post.title || 'Untitled';
    modalBody.innerHTML = post.content || '<p>No content.</p>';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      currentFilter = this.dataset.filter;
      render();
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Check URL hash for filter
  if (window.location.hash === '#thoughts') {
    currentFilter = 'thoughts';
    document.querySelector('.filter-btn[data-filter="thoughts"]')?.click();
  }

  render();
})();
