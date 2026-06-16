var admin = (function () {
  var PASSWORD = 'admin123';
  var isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
  var currentData = null;
  var editingItem = null;
  var editingType = null;

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
      { key: 'icon', label: 'Icon name (e.g. magnifying-glass)', type: 'text' },
      { key: 'category', label: 'Category (e.g. Blockchain)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' },
      { key: 'links', label: 'Links (JSON array of {label,url})', type: 'textarea' }
    ]},
    featured: { fields: [
      { key: 'source', label: 'Source (e.g. Condia)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'url', label: 'URL', type: 'url' }
    ]},
    speaking: { fields: [
      { key: 'icon', label: 'Icon name (e.g. microphone)', type: 'text' },
      { key: 'label', label: 'Label (e.g. Talk)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'text' },
      { key: 'url', label: 'Video URL', type: 'url' }
    ]},
    skills: { fields: [
      { key: 'icon', label: 'Icon name', type: 'text' },
      { key: 'index', label: 'Index (e.g. 01)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'desc', label: 'Description', type: 'textarea' }
    ]},
    teaching: { fields: [
      { key: 'icon', label: 'Icon name', type: 'text' },
      { key: 'label', label: 'Label (Workshop/Course/Tutorial)', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' }
    ]},
    social: { fields: [
      { key: 'icon', label: 'Icon name (e.g. github-logo)', type: 'text' },
      { key: 'name', label: 'Display Name', type: 'text' },
      { key: 'url', label: 'URL', type: 'url' }
    ]}
  };

  function qs(s) { return document.querySelector(s); }
  function qsa(s) { return document.querySelectorAll(s); }

  function load() {
    currentData = window.getPortfolioData();
    return currentData;
  }

  function save() {
    window.savePortfolioData(currentData);
  }

  // Auth
  var loginSection = document.getElementById('loginSection');
  var adminPanel = document.getElementById('adminPanel');

  function checkAuth() {
    if (isLoggedIn) {
      loginSection.classList.add('hidden');
      adminPanel.classList.remove('hidden');
      load();
      renderAll();
    } else {
      loginSection.classList.remove('hidden');
      adminPanel.classList.add('hidden');
    }
  }

  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (document.getElementById('password').value === PASSWORD) {
      isLoggedIn = true;
      sessionStorage.setItem('admin_logged_in', 'true');
      document.getElementById('loginError').classList.remove('visible');
      checkAuth();
    } else {
      document.getElementById('loginError').classList.add('visible');
    }
    document.getElementById('password').value = '';
  });

  document.getElementById('logoutBtn').addEventListener('click', function () {
    isLoggedIn = false;
    sessionStorage.removeItem('admin_logged_in');
    checkAuth();
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    if (confirm('Reset all portfolio data to defaults? This cannot be undone.')) {
      window.resetPortfolioData();
      load();
      renderAll();
      alert('Data reset to defaults.');
    }
  });

  // Tabs
  qsa('.cms-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      qsa('.cms-tab').forEach(function (t) { t.classList.remove('active'); });
      qsa('.cms-panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      var panel = document.getElementById('panel-' + this.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // Render all
  function renderAll() {
    renderProfile();
    renderItems('experience');
    renderItems('education');
    renderItems('certifications');
    renderItems('projects');
    renderContribs();
    renderItems('featured');
    renderItems('speaking');
    renderItems('skills');
    renderItems('teaching');
    renderItems('social');
    renderBlogPosts();
  }

  // Profile
  function renderProfile() {
    if (!currentData || !currentData.profile) return;
    var p = currentData.profile;
    document.getElementById('cms-name').value = p.name || '';
    document.getElementById('cms-role').value = p.role || '';
    document.getElementById('cms-bio').value = p.bio || '';
    document.getElementById('cms-highlights').value = (p.highlights || []).join('\n');
    document.getElementById('cms-beyond').value = p.beyondBio || '';
  }

  window.admin = window.admin || {};
  window.admin.saveProfile = function () {
    currentData.profile.name = document.getElementById('cms-name').value.trim();
    currentData.profile.role = document.getElementById('cms-role').value.trim();
    currentData.profile.bio = document.getElementById('cms-bio').value;
    currentData.profile.highlights = document.getElementById('cms-highlights').value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    currentData.profile.beyondBio = document.getElementById('cms-beyond').value;
    save();
    alert('Profile saved!');
  };

  // Generic item render
  function renderItems(type) {
    var container = document.getElementById('items-' + type);
    if (!container || !currentData[type]) return;
    var items = currentData[type];
    container.innerHTML = items.length ? '' : '<p class="no-posts" style="display:block;">No items yet.</p>';
    items.forEach(function (item, idx) {
      var title = item.title || item.degree || item.name || item.source || item.label || 'Item ' + (idx + 1);
      var meta = item.company || item.school || item.org || item.category || item.period || item.url || '';
      var div = document.createElement('div');
      div.className = 'cms-item';
      div.innerHTML = '<div class="cms-item-info"><h4>' + title + '</h4><div class="meta">' + meta + '</div></div><div class="cms-item-actions"><button class="edit-btn" data-idx="' + idx + '">Edit</button><button class="delete-btn" data-idx="' + idx + '">Del</button></div>';
      div.querySelector('.edit-btn').addEventListener('click', function () { openItemEditor(type, parseInt(this.dataset.idx)); });
      div.querySelector('.delete-btn').addEventListener('click', function () { deleteItem(type, parseInt(this.dataset.idx)); });
      container.appendChild(div);
    });
  }

  function deleteItem(type, idx) {
    if (!confirm('Delete this item?')) return;
    currentData[type].splice(idx, 1);
    save();
    renderItems(type);
  }

  window.admin.addItem = function (type) {
    var schema = SCHEMAS[type];
    if (!schema) return;
    var newItem = { id: Date.now().toString() };
    schema.fields.forEach(function (f) {
      newItem[f.key] = '';
    });
    if (type === 'skills') newItem.index = String(currentData.skills.length + 1).padStart(2, '0');
    currentData[type].push(newItem);
    save();
    renderItems(type);
    openItemEditor(type, currentData[type].length - 1);
  };

  var modal = document.getElementById('itemModal');
  var modalClose = document.getElementById('itemModalClose');
  var modalTitle = document.getElementById('itemModalTitle');
  var formContainer = document.getElementById('itemFormContainer');

  function openItemEditor(type, idx) {
    var item = currentData[type][idx];
    if (!item) return;
    editingItem = { type: type, idx: idx };
    var schema = SCHEMAS[type];
    if (!schema) return;
    modalTitle.textContent = 'Edit ' + type.charAt(0).toUpperCase() + type.slice(1);
    var html = '';
    schema.fields.forEach(function (f) {
      var val = item[f.key] || '';
      if (f.key === 'links' && typeof val === 'object') {
        val = JSON.stringify(val, null, 2);
      }
      if (f.type === 'textarea') {
        html += '<div class="form-group"><label>' + f.label + '</label><textarea class="cms-field" data-key="' + f.key + '" rows="4">' + val + '</textarea></div>';
      } else {
        html += '<div class="form-group"><label>' + f.label + '</label><input type="' + f.type + '" class="cms-field" data-key="' + f.key + '" value="' + val.replace(/"/g, '&quot;') + '"></div>';
      }
    });
    html += '<div class="form-actions"><button class="btn btn-primary" id="saveItemBtn">Save</button><button class="btn btn-ghost" id="cancelItemBtn">Cancel</button></div>';
    formContainer.innerHTML = html;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('saveItemBtn').addEventListener('click', function () {
      var fields = formContainer.querySelectorAll('.cms-field');
      fields.forEach(function (f) {
        var key = f.dataset.key;
        var val = f.value;
        if (key === 'links') {
          try { val = JSON.parse(val); } catch (e) { alert('Invalid JSON for links. Use format: [{"label":"...","url":"..."}]'); return; }
        }
        currentData[type][editingItem.idx][key] = val;
      });
      save();
      renderItems(type);
      closeModal();
    });
    document.getElementById('cancelItemBtn').addEventListener('click', closeModal);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    editingItem = null;
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // Contributions
  function renderContribs() {
    ['products', 'ecosystem', 'media'].forEach(function (group) {
      var container = document.getElementById('contrib-' + group);
      if (!container || !currentData.contributions[group]) return;
      var items = currentData.contributions[group];
      container.innerHTML = items.length ? '' : '<p class="no-posts" style="display:block;">No items.</p>';
      items.forEach(function (item, idx) {
        var div = document.createElement('div');
        div.className = 'cms-item';
        div.innerHTML = '<div class="cms-item-info"><h4>' + (item.name || 'Unnamed') + '</h4><div class="meta">' + (item.handle || '') + ' &middot; ' + (item.category || '') + '</div></div><div class="cms-item-actions"><button class="edit-btn" data-group="' + group + '" data-idx="' + idx + '">Edit</button><button class="delete-btn" data-group="' + group + '" data-idx="' + idx + '">Del</button></div>';
        div.querySelector('.edit-btn').addEventListener('click', function () { openContribEditor(this.dataset.group, parseInt(this.dataset.idx)); });
        div.querySelector('.delete-btn').addEventListener('click', function () { deleteContrib(this.dataset.group, parseInt(this.dataset.idx)); });
        container.appendChild(div);
      });
    });
  }

  function deleteContrib(group, idx) {
    if (!confirm('Delete this item?')) return;
    currentData.contributions[group].splice(idx, 1);
    save();
    renderContribs();
  }

  window.admin.addContrib = function (group) {
    currentData.contributions[group].push({ id: Date.now().toString(), name: '', handle: '', category: group === 'products' ? 'Product' : group === 'ecosystem' ? 'Ecosystem' : 'Media', url: '' });
    save();
    renderContribs();
    openContribEditor(group, currentData.contributions[group].length - 1);
  };

  function openContribEditor(group, idx) {
    var item = currentData.contributions[group][idx];
    if (!item) return;
    editingItem = { type: 'contrib_' + group, idx: idx, group: group };
    modalTitle.textContent = 'Edit ' + (item.name || 'Item');
    var html =
      '<div class="form-group"><label>Name</label><input type="text" class="cms-field" data-key="name" value="' + (item.name || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-group"><label>Handle (e.g. @handle)</label><input type="text" class="cms-field" data-key="handle" value="' + (item.handle || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-group"><label>Category</label><input type="text" class="cms-field" data-key="category" value="' + (item.category || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-group"><label>URL</label><input type="url" class="cms-field" data-key="url" value="' + (item.url || '').replace(/"/g, '&quot;') + '"></div>' +
      '<div class="form-actions"><button class="btn btn-primary" id="saveContribBtn">Save</button><button class="btn btn-ghost" id="cancelItemBtn">Cancel</button></div>';
    formContainer.innerHTML = html;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('saveContribBtn').addEventListener('click', function () {
      var fields = formContainer.querySelectorAll('.cms-field');
      fields.forEach(function (f) { currentData.contributions[group][editingItem.idx][f.dataset.key] = f.value; });
      save();
      renderContribs();
      closeModal();
    });
    document.getElementById('cancelItemBtn').addEventListener('click', closeModal);
  }

  // Blog posts
  function renderBlogPosts() {
    var container = document.getElementById('adminPostsContainerBlog');
    var noPosts = document.getElementById('adminNoPostsBlog');
    if (!container) return;
    var posts = [];
    try { var raw = localStorage.getItem('portfolio_posts'); if (raw) posts = JSON.parse(raw); } catch (e) {}
    container.innerHTML = '';
    noPosts.style.display = posts.length ? 'none' : 'block';
    posts.sort(function (a, b) { return new Date(b.date || 0) - new Date(a.date || 0); });
    posts.forEach(function (post) {
      var item = document.createElement('div');
      item.className = 'post-admin-item';
      var publishedLabel = post.published !== false ? '' : ' [Draft]';
      item.innerHTML = '<div class="post-admin-info"><h4>' + (post.title || 'Untitled') + publishedLabel + '</h4><div class="meta"><span class="cat">' + (post.category || 'blog') + '</span><span>' + (post.date || '') + '</span></div></div><div class="admin-actions"><button class="edit-btn" data-id="' + post.id + '">Edit</button><button class="delete-btn" data-id="' + post.id + '">Delete</button></div>';
      item.querySelector('.edit-btn').addEventListener('click', function () { editBlogPost(this.dataset.id); });
      item.querySelector('.delete-btn').addEventListener('click', function () { deleteBlogPost(this.dataset.id); });
      container.appendChild(item);
    });
  }

  function editBlogPost(id) {
    var posts = JSON.parse(localStorage.getItem('portfolio_posts') || '[]');
    var post = posts.find(function (p) { return p.id === id; });
    if (!post) return;
    var newTitle = prompt('Title:', post.title);
    if (newTitle === null) return;
    post.title = newTitle.trim();
    var newExcerpt = prompt('Excerpt:', post.excerpt);
    if (newExcerpt !== null) post.excerpt = newExcerpt.trim();
    var newCategory = prompt('Category (blog/thoughts):', post.category);
    if (newCategory !== null) post.category = newCategory.trim();
    localStorage.setItem('portfolio_posts', JSON.stringify(posts));
    renderBlogPosts();
  }

  function deleteBlogPost(id) {
    if (!confirm('Delete this post?')) return;
    var posts = JSON.parse(localStorage.getItem('portfolio_posts') || '[]');
    localStorage.setItem('portfolio_posts', JSON.stringify(posts.filter(function (p) { return p.id !== id; })));
    renderBlogPosts();
  }

  checkAuth();
  return {
    saveProfile: function () {},
    addItem: function (type) {},
    addContrib: function (group) {}
  };
})();
