(function () {
  const STORAGE_KEY = 'portfolio_posts';
  const container = document.getElementById('postsContainer');
  const noPosts = document.getElementById('noPosts');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentFilter = 'all';

  const SEED_POSTS = [
    {
      id: 'seed1',
      title: 'Serial Token Deployers on Solana: Unmasking the Ruggers of Pump.fun',
      excerpt: 'On-chain forensics investigation using Arkham Intelligence and Dune Analytics to expose serial rug-pullers on Solana\'s Pump.fun platform.',
      category: 'blog',
      date: '2025-04-30',
      tags: 'Solana, Blockchain, Dune Analytics, Arkham, DeFi',
      url: 'https://medium.com/@oladeeayo/serial-token-deployers-on-solana-unmasking-the-ruggers-of-pump-fun-0833a65745c7',
      published: true
    },
    {
      id: 'seed2',
      title: 'Building a Solana Dashboard on Dune: Tracking Top Trending Tokens',
      excerpt: 'Step-by-step tutorial on creating a Solana blockchain dashboard on Dune Analytics that tracks the top 20 trending tokens in real-time.',
      category: 'blog',
      date: '2025-04-07',
      tags: 'Dune, Solana, SQL, Tutorial, Dashboard',
      url: 'https://medium.com/@oladeeayo/building-a-solana-dashboard-on-dune-tracking-top-trending-tokens-005a01c0d62f',
      published: true
    },
    {
      id: 'seed3',
      title: 'The Onboarding Illusion',
      excerpt: 'A critical reflection on how product onboarding often masks deeper usability issues — and why data tells the real story.',
      category: 'thoughts',
      date: '2025-03-10',
      tags: 'Product, Analytics, UX, Retention',
      url: 'https://medium.com/@oladeeayo/the-onboarding-illusion-5c095fb4f78b',
      published: true
    },
    {
      id: 'seed4',
      title: 'Best Practices for Optimizing Your SQL Queries Performance',
      excerpt: 'For data analysts, writing SQL queries that simply work is just the starting point. Here\'s how to make them fast.',
      category: 'blog',
      date: '2024-07-31',
      tags: 'SQL, Optimization, Performance, Data Engineering',
      url: 'https://medium.com/@oladeeayo/best-practices-for-optimizing-your-sql-queries-performance-1364aa4145de',
      published: true
    },
    {
      id: 'seed5',
      title: 'How to Use and Integrate APIs in Your Spreadsheet or Data Project',
      excerpt: 'A practical guide to connecting external APIs with Google Sheets and Excel for live data updates and automated workflows.',
      category: 'blog',
      date: '2024-07-09',
      tags: 'API, Google Apps Script, Spreadsheet, Automation',
      url: 'https://medium.com/@oladeeayo/how-to-use-and-integrate-apis-in-your-spreadsheet-or-data-project-78bc6c860041',
      published: true
    },
    {
      id: 'seed6',
      title: 'My First Experience with Dune Analytics: Key Takeaways',
      excerpt: 'First impressions and lessons learned from building my first blockchain dashboard on Dune Analytics.',
      category: 'blog',
      date: '2024-06-25',
      tags: 'Dune, Blockchain, First Steps, Analytics',
      url: 'https://medium.com/@oladeeayo/my-first-experience-with-dune-analytics-key-takeaways-d85c32218044',
      published: true
    },
    {
      id: 'seed7',
      title: 'Using Data to Transform Sales and Customer Insights',
      excerpt: 'A case study showing how data analysis transformed a local clothing store\'s sales strategy and customer understanding.',
      category: 'thoughts',
      date: '2024-06-17',
      tags: 'Case Study, Sales, Customer Insights, Visualization',
      url: 'https://medium.com/@oladeeayo/using-data-to-transform-sales-and-customer-insights-aaaae60a30b2',
      published: true
    },
    {
      id: 'seed8',
      title: 'Behind the Numbers: Insights into FPL 2023/2024 Champion Performance',
      excerpt: 'Statistical breakdown of Fantasy Premier League 2023/2024 champion data — transfers, captain picks, and differentials that made the difference.',
      category: 'thoughts',
      date: '2024-06-05',
      tags: 'FPL, Sports Analytics, Python, API',
      url: 'https://medium.com/@oladeeayo/behind-the-numbers-insights-into-the-performance-of-fantasy-premier-league-2023-2024-champion-cf750fbf06ab',
      published: true
    }
  ];

  function getPosts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data).filter(p => p.published !== false);
        if (parsed.length > 0) return parsed;
      }
    } catch {}
    return SEED_POSTS;
  }

  function render() {
    const posts = getPosts();
    const filtered = currentFilter === 'all' ? posts : posts.filter(p => p.category === currentFilter);

    container.innerHTML = '';
    noPosts.style.display = filtered.length ? 'none' : 'block';

    filtered.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.setAttribute('role', 'listitem');

      const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="category-badge">${post.category || 'blog'}</span>
          <span class="post-date">${post.date || ''}</span>
        </div>
        <h3>${post.title || 'Untitled'}</h3>
        <p class="post-excerpt">${post.excerpt || ''}</p>
        ${tags.length ? `<div class="post-tags">${tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
        ${post.url ? `<a href="${post.url}" target="_blank" rel="noopener noreferrer" class="read-more">Read on Medium <i class="ph ph-arrow-up-right"></i></a>` : ''}
      `;

      container.appendChild(card);
    });
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

  var nav = document.querySelector('.nav') || document.querySelector('nav');
  if (nav) {
    function checkScroll() {
      var scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      nav.classList.toggle('scrolled', scrollY > 60);
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('load', checkScroll);
    checkScroll();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (window.location.hash === '#thoughts') {
    currentFilter = 'thoughts';
    const btn = document.querySelector('.filter-btn[data-filter="thoughts"]');
    if (btn) btn.click();
  }

  render();
})();
