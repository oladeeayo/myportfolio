(function () {
  const STORAGE_KEY = 'portfolio_posts';
  const ADMIN_PASSWORD = 'admin123';

  const loginSection = document.getElementById('loginSection');
  const adminPanel = document.getElementById('adminPanel');
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');

  const postsContainer = document.getElementById('adminPostsContainer');
  const noPosts = document.getElementById('adminNoPosts');
  const newPostBtn = document.getElementById('newPostBtn');
  const postFormSection = document.getElementById('postFormSection');
  const formTitle = document.getElementById('formTitle');
  const postForm = document.getElementById('postForm');
  const savePostBtn = document.getElementById('savePostBtn');
  const cancelFormBtn = document.getElementById('cancelFormBtn');

  const titleInput = document.getElementById('postTitle');
  const excerptInput = document.getElementById('postExcerpt');
  const contentInput = document.getElementById('postContent');
  const categoryInput = document.getElementById('postCategory');
  const dateInput = document.getElementById('postDate');
  const tagsInput = document.getElementById('postTags');
  const publishedInput = document.getElementById('postPublished');

  let editingId = null;
  let isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

  function checkAuth() {
    if (isLoggedIn) {
      loginSection.classList.add('hidden');
      adminPanel.classList.remove('hidden');
      renderPosts();
    } else {
      loginSection.classList.remove('hidden');
      adminPanel.classList.add('hidden');
    }
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (passwordInput.value === ADMIN_PASSWORD) {
      isLoggedIn = true;
      sessionStorage.setItem('admin_logged_in', 'true');
      loginError.classList.remove('visible');
      checkAuth();
    } else {
      loginError.classList.add('visible');
    }
    passwordInput.value = '';
  });

  logoutBtn.addEventListener('click', function () {
    isLoggedIn = false;
    sessionStorage.removeItem('admin_logged_in');
    checkAuth();
  });

  function getPosts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }

  function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  function renderPosts() {
    const posts = getPosts();
    postsContainer.innerHTML = '';
    noPosts.style.display = posts.length ? 'none' : 'block';

    posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    posts.forEach(post => {
      const item = document.createElement('div');
      item.className = 'post-admin-item';

      const publishedLabel = post.published !== false ? '' : ' [Draft]';

      item.innerHTML = `
        <div class="post-admin-info">
          <h4>${post.title || 'Untitled'}${publishedLabel}</h4>
          <div class="meta">
            <span class="cat">${post.category || 'blog'}</span>
            <span>${post.date || 'No date'}</span>
          </div>
        </div>
        <div class="admin-actions">
          <button class="edit-btn" data-id="${post.id}">Edit</button>
          <button class="delete-btn" data-id="${post.id}">Delete</button>
        </div>
      `;

      item.querySelector('.edit-btn').addEventListener('click', () => editPost(post.id));
      item.querySelector('.delete-btn').addEventListener('click', () => deletePost(post.id));

      postsContainer.appendChild(item);
    });
  }

  function resetForm() {
    titleInput.value = '';
    excerptInput.value = '';
    contentInput.value = '';
    categoryInput.value = 'blog';
    dateInput.value = new Date().toISOString().split('T')[0];
    tagsInput.value = '';
    publishedInput.checked = true;
    editingId = null;
    formTitle.textContent = 'New Post';
    savePostBtn.textContent = 'Save Post';
    postFormSection.classList.remove('hidden');
    postFormSection.scrollIntoView({ behavior: 'smooth' });
  }

  function editPost(id) {
    const posts = getPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;

    editingId = id;
    titleInput.value = post.title || '';
    excerptInput.value = post.excerpt || '';
    contentInput.value = post.content || '';
    categoryInput.value = post.category || 'blog';
    dateInput.value = post.date || new Date().toISOString().split('T')[0];
    tagsInput.value = post.tags || '';
    publishedInput.checked = post.published !== false;
    formTitle.textContent = 'Edit Post';
    savePostBtn.textContent = 'Update Post';
    postFormSection.classList.remove('hidden');
    postFormSection.scrollIntoView({ behavior: 'smooth' });
  }

  function deletePost(id) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    let posts = getPosts();
    posts = posts.filter(p => p.id !== id);
    savePosts(posts);
    renderPosts();
  }

  postForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) return;

    let posts = getPosts();

    const postData = {
      id: editingId || Date.now().toString(),
      title: title,
      excerpt: excerptInput.value.trim(),
      content: contentInput.value,
      category: categoryInput.value,
      date: dateInput.value || new Date().toISOString().split('T')[0],
      tags: tagsInput.value.trim(),
      published: publishedInput.checked
    };

    if (editingId) {
      const idx = posts.findIndex(p => p.id === editingId);
      if (idx !== -1) {
        posts[idx] = postData;
      } else {
        posts.push(postData);
      }
    } else {
      posts.push(postData);
    }

    savePosts(posts);
    renderPosts();
    postFormSection.classList.add('hidden');
    editingId = null;
  });

  newPostBtn.addEventListener('click', resetForm);
  cancelFormBtn.addEventListener('click', function () {
    postFormSection.classList.add('hidden');
    editingId = null;
  });

  checkAuth();
})();
