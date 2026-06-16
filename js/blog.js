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

  const SEED_POSTS = [
    {
      id: 'seed1',
      title: 'Serial Token Deployers on Solana: Unmasking the Ruggers of Pump.fun',
      excerpt: 'On-chain forensics investigation using Arkham Intelligence and Dune Analytics to expose serial rug-pullers on Solana\'s Pump.fun platform.',
      content: `<p>The Solana blockchain has become a powerhouse for decentralized finance (DeFi) innovation, driven by its speed, low gas fees, and seamless transactions. But these strengths have also made it a breeding ground for predatory schemes.</p><p>In this article, I investigate the tactics of serial token deployers through on-chain forensics, wallet clustering, and detailed case studies. Using the Arkham Intelligence Platform and Dune Analytics, I identify key players, analyze deployment trends, and expose patterns of wallet bundling.</p><p><strong>Key Findings:</strong></p><ul><li>Over 9 million tokens launched on Pump.fun — only 1.24% graduate</li><li>Top deployers use 20-50 wallets to coordinate rug pulls</li><li>Sniper wallet overlap reveals a coordinated network</li></ul><p>Read the full analysis with dashboard on Dune.</p>`,
      category: 'blog',
      date: '2025-04-30',
      tags: 'Solana, Blockchain, Dune Analytics, Arkham, DeFi',
      published: true
    },
    {
      id: 'seed2',
      title: 'Building a Solana Dashboard on Dune: Tracking Top Trending Tokens',
      excerpt: 'Step-by-step tutorial on creating a Solana blockchain dashboard on Dune Analytics that tracks the top 20 trending tokens in real-time.',
      content: `<p>In this tutorial, I will guide you through how to create a Solana dashboard on Dune Analytics that tracks the top 20 trending tokens on Solana.</p><p>We'll cover:</p><ul><li>Setting up Dune Analytics workspace</li><li>Writing SQL queries against Solana blockchain data</li><li>Building visualizations and combining them into a dashboard</li><li>Publishing and sharing your work</li></ul><p>Whether you're new to blockchain analytics or looking to expand your Dune skills, this guide walks through everything you need.</p>`,
      category: 'blog',
      date: '2025-04-07',
      tags: 'Dune, Solana, SQL, Tutorial, Dashboard',
      published: true
    },
    {
      id: 'seed3',
      title: 'The Onboarding Illusion',
      excerpt: 'A critical reflection on how product onboarding often masks deeper usability issues — and why data tells the real story.',
      content: `<p><strong>Executive Summary:</strong> Most products focus on getting users in the door, but ignore why they leave. The "onboarding illusion" is the gap between acquisition and retention that data analysts are uniquely positioned to close.</p><p>This piece explores how funnel analysis, cohort retention, and behavioral data can reveal the truth behind the metrics — and why a smooth onboarding flow can actually hide systemic product problems.</p>`,
      category: 'thoughts',
      date: '2025-03-10',
      tags: 'Product, Analytics, UX, Retention',
      published: true
    },
    {
      id: 'seed4',
      title: 'Best Practices for Optimizing Your SQL Queries Performance',
      excerpt: 'For data analysts, writing SQL queries that simply work is just the starting point. Here\'s how to make them fast.',
      content: `<p>For data analysts, writing SQL queries that simply work is just the starting point. The true value of your SQL skills is realized when you can write queries that are not only correct but also performant.</p><p>This article covers:</p><ul><li>Understanding query execution plans</li><li>Indexing strategies</li><li>Window functions vs. self-joins</li><li>CTE optimization</li><li>Avoiding common performance pitfalls</li></ul>`,
      category: 'blog',
      date: '2024-07-31',
      tags: 'SQL, Optimization, Performance, Data Engineering',
      published: true
    },
    {
      id: 'seed5',
      title: 'How to Use and Integrate APIs in Your Spreadsheet or Data Project',
      excerpt: 'A practical guide to connecting external APIs with Google Sheets and Excel for live data updates and automated workflows.',
      content: `<p>APIs are the backbone of modern data integration. This guide shows you how to pull live data from APIs directly into your spreadsheets using Google Apps Script and Power Query.</p><p>Topics include:</p><ul><li>Understanding REST APIs and JSON</li><li>Making API calls from Google Apps Script</li><li>Parsing and transforming API responses</li><li>Building automated refresh workflows</li></ul>`,
      category: 'blog',
      date: '2024-07-09',
      tags: 'API, Google Apps Script, Spreadsheet, Automation',
      published: true
    },
    {
      id: 'seed6',
      title: 'My First Experience with Dune Analytics: Key Takeaways',
      excerpt: 'First impressions and lessons learned from building my first blockchain dashboard on Dune Analytics.',
      content: `<p>Last week, I took my first step into blockchain data analytics with Dune Analytics. Using their query features, I created a dashboard to track on-chain activity and learned some valuable lessons along the way.</p><p>Key takeaways:</p><ul><li>Dune's SQL interface is powerful but has a learning curve with blockchain data</li><li>Understanding the data schema is half the battle</li><li>Blockchain data requires a different mental model than traditional analytics</li><li>The Dune community is incredibly helpful</li></ul>`,
      category: 'blog',
      date: '2024-06-25',
      tags: 'Dune, Blockchain, First Steps, Analytics',
      published: true
    },
    {
      id: 'seed7',
      title: 'Using Data to Transform Sales and Customer Insights',
      excerpt: 'A case study showing how data analysis transformed a local clothing store\'s sales strategy and customer understanding.',
      content: `<p>Davis runs a clothing store in his local community. Business is okay, but Davis can't pinpoint why sales fluctuate. This case study walks through how data analysis uncovered patterns and transformed his approach.</p><p>We explore sales trends, customer segmentation, inventory analysis, and how simple visualizations led to actionable decisions that improved revenue.</p>`,
      category: 'thoughts',
      date: '2024-06-17',
      tags: 'Case Study, Sales, Customer Insights, Visualization',
      published: true
    },
    {
      id: 'seed8',
      title: 'Behind the Numbers: Insights into FPL 2023/2024 Champion Performance',
      excerpt: 'Statistical breakdown of Fantasy Premier League 2023/2024 champion data — transfers, captain picks, and differentials that made the difference.',
      content: `<p><strong>Introduction</strong></p><p>What does it take to win Fantasy Premier League? This analysis dives into the data behind the 2023/2024 FPL champion's season — transfer strategies, captaincy decisions, chip usage, and the differential picks that separated them from millions of managers.</p><p>Using the FPL API, I extracted and analyzed gameweek-by-gameweek data to uncover the patterns behind the winning season.</p>`,
      category: 'thoughts',
      date: '2024-06-05',
      tags: 'FPL, Sports Analytics, Python, API',
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
    } catch { /* fall through to seed */ }
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
      card.style.cursor = 'pointer';

      const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

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

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (window.location.hash === '#thoughts') {
    currentFilter = 'thoughts';
    document.querySelector('.filter-btn[data-filter="thoughts"]')?.click();
  }

  render();
})();
