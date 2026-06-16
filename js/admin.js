(function () {
  var PASSWORD = 'admin123';
  var isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
  var currentData = null;
  var editingItem = null;

  var SCHEMAS = {
    experience: { fields: [
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'company', label: 'Company', type: 'text' },
      { key: 'tag', label: 'Tag', type: 'text' }
    ]},
    education: { fields: [
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'degree', label: 'Degree', type: 'text' },
      { key: 'school', label: 'School', type: 'text' },
      { key: 'tag', label: 'Tag', type: 'text' }
    ]},
    certifications: { fields: [
      { key: 'org', label: 'Organization', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'url', label: 'Credential URL', type: 'url' }
    ]},
    projects: { fields: [
      { key: 'icon', label: 'Icon name', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
      { key: 'links', label: 'Links (JSON array [{label,url}])', type: 'textarea' }
    ]},
    featured: { fields: [
      { key: 'source', label: 'Source', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'url', label: 'URL', type: 'url' }
    ]},
    speaking: { fields: [
      { key: 'icon', label: 'Icon name', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'text' },
      { key: 'url', label: 'Video URL', type: 'url' }
    ]},
    skills: { fields: [
      { key: 'icon', label: 'Icon name', type: 'text' },
      { key: 'index', label: 'Index', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' }
    ]},
    teaching: { fields: [
      { key: 'icon', label: 'Icon name', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' }
    ]},
    social: { fields: [
      { key: 'icon', label: 'Icon name', type: 'text' },
      { key: 'name', label: 'Display name', type: 'text' },
      { key: 'url', label: 'URL', type: 'url' }
    ]}
  };

  function $(id) { return document.getElementById(id); }

  function load() {
    currentData = window.getPortfolioData();
  }

  function save() {
    window.savePortfolioData(currentData);
  }

  // --- AUTH ---
  function checkAuth() {
    if (isLoggedIn) {
      $('loginSection').classList.add('hidden');
      $('adminPanel').classList.remove('hidden');
      load();
      renderAll();
    } else {
      $('loginSection').classList.remove('hidden');
      $('adminPanel').classList.add('hidden');
    }
  }

  $('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if ($('password').value === PASSWORD) {
      isLoggedIn = true;
      sessionStorage.setItem('admin_logged_in', 'true');
      $('loginError').classList.remove('visible');
      checkAuth();
    } else {
      $('loginError').classList.add('visible');
    }
    $('password').value = '';
  });

  $('logoutBtn').addEventListener('click', function () {
    isLoggedIn = false;
    sessionStorage.removeItem('admin_logged_in');
    checkAuth();
  });

  $('resetBtn').addEventListener('click', function () {
    if (confirm('Reset all portfolio data to defaults? This cannot be undone.')) {
      window.resetPortfolioData();
      load();
      renderAll();
    }
  });

  // --- TABS ---
  document.querySelectorAll('.cms-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.cms-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.cms-panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      var panel = $('panel-' + this.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // --- PROFILE ---
  function renderProfile() {
    if (!currentData || !currentData.profile) return;
    var p = currentData.profile;
    $('cms-name').value = p.name || '';
    $('cms-role').value = p.role || '';
    $('cms-bio').value = p.bio || '';
    $('cms-highlights').value = (p.highlights || []).join('\n');
    $('cms-beyond').value = p.beyondBio || '';
  }

  function saveProfile() {
    var p = currentData.profile;
    p.name = $('cms-name').value.trim();
    p.role = $('cms-role').value.trim();
    p.bio = $('cms-bio').value;
    p.highlights = $('cms-highlights').value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    p.beyondBio = $('cms-beyond').value;
    save();
    renderProfile();
  }

  // --- GENERIC ITEMS ---
  function renderItems(type) {
    var container = $('items-' + type);
    if (!container || !currentData[type]) return;
    container.innerHTML = '';
    if (!currentData[type].length) {
      container.innerHTML = '<p class="no-posts" style="display:block;">No items yet.</p>';
      return;
    }
    currentData[type].forEach(function (item, idx) {
      var title = item.title || item.degree || item.name || item.source || item.label || 'Item ' + (idx + 1);
      var meta = item.company || item.school || item.org || item.category || item.period || item.url || '';
      var div = document.createElement('div');
      div.className = 'cms-item';
      div.innerHTML = '<div class="cms-item-info"><h4>' + title + '</h4><div class="meta">' + meta + '</div></div><div class="cms-item-actions"><button class="edit-btn" data-type="' + type + '" data-idx="' + idx + '">Edit</button><button class="delete-btn" data-type="' + type + '" data-idx="' + idx + '">Del</button></div>';
      container.appendChild(div);
    });
    container.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { openEditor(this.dataset.type, parseInt(this.dataset.idx)); });
    });
    container.querySelectorAll('.delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!confirm('Delete this item?')) return;
        currentData[this.dataset.type].splice(parseInt(this.dataset.idx), 1);
        save();
        renderItems(this.dataset.type);
      });
    });
  }

  function addItem(type) {
    var schema = SCHEMAS[type];
    if (!schema) return;
    var item = { id: Date.now().toString() };
    schema.fields.forEach(function (f) { item[f.key] = ''; });
    if (type === 'skills') item.index = String(currentData.skills.length + 1).padStart(2, '0');
    currentData[type].push(item);
    save();
    renderItems(type);
    openEditor(type, currentData[type].length - 1);
  }

  // --- EDITOR MODAL ---
  var modal = $('itemModal');
  var formContainer = $('itemFormContainer');

  function openEditor(type, idx) {
    var item = currentData[type][idx];
    if (!item) return;
    editingItem = { type: type, idx: idx };
    var schema = SCHEMAS[type];
    if (!schema) return;
    $('itemModalTitle').textContent = 'Edit ' + type.charAt(0).toUpperCase() + type.slice(1);
    var html = '';
    schema.fields.forEach(function (f) {
      var val = item[f.key] || '';
      if (f.key === 'links' && typeof val === 'object') val = JSON.stringify(val, null, 2);
      var safe = val.replace(/"/g, '&quot;');
      if (f.type === 'textarea') {
        html += '<div class="form-group"><label>' + f.label + '</label><textarea class="cms-field" data-key="' + f.key + '" rows="4">' + val + '</textarea></div>';
      } else {
        html += '<div class="form-group"><label>' + f.label + '</label><input type="' + f.type + '" class="cms-field" data-key="' + f.key + '" value="' + safe + '"></div>';
      }
    });
    html += '<div class="form-actions"><button class="btn btn-primary" id="modalSaveBtn">Save</button><button class="btn btn-ghost" id="modalCancelBtn">Cancel</button></div>';
    formContainer.innerHTML = html;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    $('modalSaveBtn').addEventListener('click', function () {
      var fields = formContainer.querySelectorAll('.cms-field');
      var error = false;
      fields.forEach(function (f) {
        var key = f.dataset.key;
        var val = f.value;
        if (key === 'links') {
          try { val = JSON.parse(val); } catch (e) { error = true; alert('Invalid JSON for links. Use format: [{"label":"...","url":"..."}]'); return; }
        }
        currentData[editingItem.type][editingItem.idx][key] = val;
      });
      if (error) return;
      save();
      renderItems(editingItem.type);
      closeModal();
    });
    $('modalCancelBtn').addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    editingItem = null;
  }

  $('itemModalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // --- CONTRIBUTIONS ---
  function renderContribs() {
    ['products', 'ecosystem', 'media'].forEach(function (group) {
      var container = $('contrib-' + group);
      if (!container || !currentData.contributions[group]) return;
      container.innerHTML = '';
      if (!currentData.contributions[group].length) {
        container.innerHTML = '<p class="no-posts" style="display:block;">No items.</p>';
        return;
      }
      currentData.contributions[group].forEach(function (item, idx) {
        var div = document.createElement('div');
        div.className = 'cms-item';
        div.innerHTML = '<div class="cms-item-info"><h4>' + (item.name || 'Unnamed') + '</h4><div class="meta">' + (item.handle || '') + ' &middot; ' + (item.category || '') + '</div></div><div class="cms-item-actions"><button class="edit-btn" data-group="' + group + '" data-idx="' + idx + '">Edit</button><button class="delete-btn" data-group="' + group + '" data-idx="' + idx + '">Del</button></div>';
        container.appendChild(div);
      });
      container.querySelectorAll('.edit-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { openContribEditor(this.dataset.group, parseInt(this.dataset.idx)); });
      });
      container.querySelectorAll('.delete-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!confirm('Delete this item?')) return;
          currentData.contributions[this.dataset.group].splice(parseInt(this.dataset.idx), 1);
          save();
          renderContribs();
        });
      });
    });
  }

  function addContrib(group) {
    var cat = group === 'products' ? 'Product' : group === 'ecosystem' ? 'Ecosystem' : 'Media';
    currentData.contributions[group].push({ id: Date.now().toString(), name: '', handle: '', category: cat, url: '' });
    save();
    renderContribs();
    openContribEditor(group, currentData.contributions[group].length - 1);
  }

  function openContribEditor(group, idx) {
    var item = currentData.contributions[group][idx];
    if (!item) return;
    editingItem = { type: 'contrib', idx: idx, group: group };
    $('itemModalTitle').textContent = 'Edit ' + (item.name || 'Item');
    var html =
      '<div class="form-group"><label>Name</label><input type="text" class="cms-field" data-key="name" value="' + (item.name || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-group"><label>Handle</label><input type="text" class="cms-field" data-key="handle" value="' + (item.handle || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-group"><label>Category</label><input type="text" class="cms-field" data-key="category" value="' + (item.category || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-group"><label>URL</label><input type="url" class="cms-field" data-key="url" value="' + (item.url || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-actions"><button class="btn btn-primary" id="contribSaveBtn">Save</button><button class="btn btn-ghost" id="contribCancelBtn">Cancel</button></div>';
    formContainer.innerHTML = html;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    $('contribSaveBtn').addEventListener('click', function () {
      formContainer.querySelectorAll('.cms-field').forEach(function (f) {
        currentData.contributions[group][editingItem.idx][f.dataset.key] = f.value;
      });
      save();
      renderContribs();
      closeModal();
    });
    $('contribCancelBtn').addEventListener('click', closeModal);
  }

  // --- BLOG POSTS ---
  function renderBlogPosts() {
    var container = $('adminPostsContainerBlog');
    var noPosts = $('adminNoPostsBlog');
    if (!container) return;
    var posts = [];
    try { var raw = localStorage.getItem('portfolio_posts'); if (raw) posts = JSON.parse(raw); } catch (e) {}
    container.innerHTML = '';
    noPosts.style.display = posts.length ? 'none' : 'block';
    posts.sort(function (a, b) { return new Date(b.date || 0) - new Date(a.date || 0); });
    posts.forEach(function (post) {
      var item = document.createElement('div');
      item.className = 'post-admin-item';
      var label = post.published !== false ? '' : ' [Draft]';
      item.innerHTML = '<div class="post-admin-info"><h4>' + (post.title || 'Untitled') + label + '</h4><div class="meta"><span class="cat">' + (post.category || 'blog') + '</span><span>' + (post.date || '') + '</span></div></div><div class="admin-actions"><button class="edit-btn" data-id="' + post.id + '">Edit</button><button class="delete-btn" data-id="' + post.id + '">Delete</button></div>';
      container.appendChild(item);
    });
    container.querySelectorAll('.edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var posts = JSON.parse(localStorage.getItem('portfolio_posts') || '[]');
        var post = posts.find(function (p) { return p.id === this.dataset.id; }.bind(this));
        if (!post) return;
        var title = prompt('Title:', post.title);
        if (title === null) return;
        post.title = title.trim();
        var excerpt = prompt('Excerpt:', post.excerpt);
        if (excerpt !== null) post.excerpt = excerpt.trim();
        var cat = prompt('Category (blog/thoughts):', post.category);
        if (cat !== null) post.category = cat.trim();
        localStorage.setItem('portfolio_posts', JSON.stringify(posts));
        renderBlogPosts();
      });
    });
    container.querySelectorAll('.delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!confirm('Delete this post?')) return;
        var posts = JSON.parse(localStorage.getItem('portfolio_posts') || '[]');
        localStorage.setItem('portfolio_posts', JSON.stringify(posts.filter(function (p) { return p.id !== this.dataset.id; }.bind(this))));
        renderBlogPosts();
      });
    });
  }

  // --- EXPOSE GLOBALLY ---
  window.admin = {
    saveProfile: saveProfile,
    addItem: addItem,
    addContrib: addContrib
  };

  function renderAll() {
    renderProfile();
    ['experience', 'education', 'certifications', 'projects', 'featured', 'speaking', 'skills', 'teaching', 'social'].forEach(renderItems);
    renderContribs();
    renderBlogPosts();
  }

  // Nav dark on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  checkAuth();
})();
