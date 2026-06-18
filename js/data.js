window.PORTFOLIO_STORAGE_KEY = 'portfolio_data';

window.DEFAULT_DATA = {
  profile: {
    name: 'Oladayo Oladipupo',
    role: 'Data Analyst &amp; Blockchain Data Analyst',
    bio: "If you're building, you're sitting on a goldmine of data — but most teams don't have the time or technical skills to make sense of it.\n\nI'm Oladayo, a Data Analyst specializing in Blockchain Data and on-chain analytics. I help Web3 projects, DeFi protocols, and crypto teams build clear, actionable dashboards on Dune Analytics that turn raw blockchain data into decisions that drive growth.",
    highlights: [
      'Building custom Dune Analytics dashboards for protocol tracking, user behavior, and on-chain metrics.',
      'Writing SQL queries to extract and analyze on-chain data from Ethereum, Solana, and other chains.',
      'Teaching analysts and developers how to query blockchain data confidently on Dune.',
      'Translating on-chain activity into clear reports for non-technical stakeholders.'
    ],
    beyondBio: 'Beyond blockchain, I bring experience in traditional data analytics — cleaning, analyzing, and visualizing large datasets using Excel, Python, SQL, and Tableau to support business decisions across finance, supply chain, and customer analytics.',
    expanding: 'Currently expanding into Data Engineering to build even more powerful data pipelines for Web3 and enterprise clients.'
  },

  experience: [
    { id: 'exp1', period: '2024 \u2014 Present', title: 'Blockchain Data Analyst', company: 'Dune Analytics \u00b7 Freelance', tag: 'On-Chain' },
    { id: 'exp2', period: '2023 \u2014 Present', title: 'Data Analyst &amp; Tutor', company: 'Self-Employed \u00b7 Remote', tag: 'SQL \u00b7 Python' },
    { id: 'exp4', period: 'Mar 2022 \u2014 Jul 2022', title: 'Community Manager', company: 'NFTGo \u00b7 Contract \u00b7 Remote', tag: 'Community' },
    { id: 'exp5', period: '2019 \u2014 2021', title: 'Content Editor', company: 'IOST Watch \u00b7 Remote', tag: 'Content' },
    { id: 'exp6', period: '2018 \u2014 2019', title: 'Community Manager', company: 'Endless Games \u00b7 Remote', tag: 'Community' },
    { id: 'exp3', period: 'Jun 2021 \u2014 Dec 2021', title: 'Customer Support Representative', company: 'Jumia Nigeria \u00b7 Contract \u00b7 On-site', tag: 'Support' }
  ],

  education: [
    { id: 'edu2', period: 'Oct 2025 \u2014 Aug 2026', school: 'Lead City University', degree: 'Postgraduate Degree, Computer Science', tag: 'PGD' },
    { id: 'edu1', period: 'Graduated', school: 'Obafemi Awolowo University', degree: 'Bachelor of Science, Computer Engineering', tag: 'B.Sc' }
  ],

  certifications: [
    { id: 'cert1', org: 'DataCamp', title: 'Data Analyst', url: 'https://www.datacamp.com/certificate/DA0024628717608' },
    { id: 'cert2', org: 'DataCamp', title: 'Data Engineer Associate', url: 'https://www.datacamp.com/certificate/DEA0016485912629' }
  ],

  projects: [
    {
      id: 'proj1',
      icon: 'magnifying-glass',
      category: 'Blockchain',
      title: 'Pumpfun Token Deployer Records',
      desc: "On-chain forensics dashboard tracking serial token deployers on Solana's Pump.fun. Identifies rug-pull patterns via wallet clustering and sniper analysis using Arkham Intelligence.",
      links: [
        { label: 'Dune Dashboard', url: 'https://dune.com/oladee/pumpfun-token-deployer-records' },
        { label: 'Article', url: 'https://medium.com/@oladeeayo/serial-token-deployers-on-solana-unmasking-the-ruggers-of-pump-fun-0833a65745c7' }
      ]
    },
    {
      id: 'proj2',
      icon: 'chart-line-up',
      category: 'Blockchain',
      title: 'Solana Trending Tokens Dashboard',
      desc: 'Dune Analytics dashboard tracking the top 20 trending tokens on Solana. Built with SQL queries extracting real-time on-chain data for traders and analysts.',
      links: [
        { label: 'View Dashboard', url: 'https://dune.com/oladee' },
        { label: 'Tutorial', url: 'https://medium.com/@oladeeayo/building-a-solana-dashboard-on-dune-tracking-top-trending-tokens-005a01c0d62f' }
      ]
    },
    {
      id: 'proj3',
      icon: 'soccer-ball',
      category: 'Analytics',
      title: 'FPL Manager Stats &amp; Insights',
      desc: 'Full-stack web app analyzing Fantasy Premier League manager performance. Features position summaries, points per gameweek, rank tracking, fixture analysis, and transfer trends.',
      links: [
        { label: 'Live App', url: 'https://fpl-manager-stats.vercel.app/' }
      ]
    },
    {
      id: 'proj4',
      icon: 'file-text',
      category: 'Report',
      title: 'Crypto State of Wallets \u2014 Africa Report',
      desc: "In-depth research report on cryptocurrency wallet adoption trends across Africa. Analyzes on-chain data to map the continent's growing DeFi and self-custody landscape.",
      links: [
        { label: 'Read Report', url: 'https://drive.google.com/file/d/1qMSy8BuezXmyRieSEo6u1BKHV7XdCZOA/view' }
      ]
    },
    {
      id: 'proj5',
      icon: 'trophy',
      category: 'Hackathon',
      title: 'GoFundMeme: Memecrime Scene Investigation',
      desc: 'Runner Up \u2014 Helius Redacted Hackathon. Built on-chain investigation tools using Helius RPC, DAS API, and webhooks to trace memecoin crime scenes and identify suspicious deployer patterns on Solana.',
      links: [
        { label: 'View Project', url: 'https://www.helius.dev/blog/redacted-hackathon-winners#gofundmeme-memecrime-scene-investigation-5269' }
      ]
    }
  ],

  contributions: {
    products: [
      { id: 'cp1', name: 'cNGN', handle: '@cngn_co', category: 'Product', url: 'https://cngn.co' },
      { id: 'cp2', name: 'UseAzza', handle: '@useazza', category: 'Product', url: 'https://useazza.com' },
      { id: 'cp3', name: 'Ribh Finance', handle: '@ribhfinance', category: 'Product', url: 'https://ribh.finance' },
      { id: 'cp4', name: 'Payrit', handle: '@payritHQ', category: 'Product', url: 'https://payrithq.com' }
    ],
    ecosystem: [
      { id: 'ce1', name: 'Dune Africa', handle: '@Dune_Africa', category: 'Ecosystem', url: 'https://twitter.com/Dune_Africa' },
      { id: 'ce2', name: 'Analyst Lab', handle: '@AnalystLab_HQ', category: 'Education', url: 'https://twitter.com/AnalystLab_HQ' },
      { id: 'ce3', name: 'Web3Bridge', handle: '@Web3Bridge', category: 'Education', url: 'https://twitter.com/Web3Bridge' },
      { id: 'ce4', name: 'Base West Africa', handle: '@BasedWestAfrica', category: 'Ecosystem', url: 'https://twitter.com/BasedWestAfrica' },
      { id: 'ce5', name: 'SuperteamNG', handle: '@SuperteamNG', category: 'Ecosystem', url: 'https://twitter.com/SuperteamNG' }
    ],
    media: [
      { id: 'cm1', name: 'Mariblock', handle: '@theMariblock', category: 'Media', url: 'https://themariblock.com' },
      { id: 'cm2', name: 'ViaPortal', handle: '@viaportalxyz', category: 'Media', url: 'https://viaportal.xyz' },
      { id: 'cm3', name: 'Condia', handle: '@thecondia', category: 'Media', url: 'https://thecondia.com' }
    ]
  },

  featured: [
    {
      id: 'feat1',
      source: 'Condia',
      title: 'cNGN: Growing a 15M Base on Blockchain',
      url: 'https://thecondia.com/cngn-growing-15m-base-blockchain/'
    },
    {
      id: 'feat2',
      source: 'Business Day TV',
      title: 'TV Discussion \u2014 Business Day Live Interview',
      url: 'https://www.youtube.com/watch?v=zCEAcJ2s754&t=159s'
    },
    {
      id: 'feat3',
      source: 'Web3 Lagos Conference',
      title: 'Speaker \u2014 Web3Lagos 2025 Conference Talk',
      url: 'https://www.youtube.com/watch?v=_09fShAoErY&t=977s'
    }
  ],

  speaking: [
    {
      id: 'speak1',
      icon: 'microphone',
      label: 'Talk',
      title: 'Web3 Lagos Conference 2025',
      desc: 'Speaker \u2014 Blockchain data and on-chain analytics for developers',
      url: 'https://www.youtube.com/watch?v=_09fShAoErY&t=977s'
    },
    {
      id: 'speak2',
      icon: 'television',
      label: 'TV',
      title: 'Business Day Live',
      desc: 'TV discussion interview on blockchain and data in Africa',
      url: 'https://www.youtube.com/watch?v=zCEAcJ2s754&t=159s'
    }
  ],

  skills: [
    { id: 'skill1', icon: 'table', index: '01', title: 'Spreadsheet', desc: 'Advanced Excel and Google Sheets \u2014 pivot tables, array formulas, macros, and data modeling for business analysis.' },
    { id: 'skill2', icon: 'database', index: '02', title: 'SQL', desc: 'Complex queries, window functions, CTEs, and query optimization across PostgreSQL, MySQL, and BigQuery.' },
    { id: 'skill3', icon: 'arrows-left-right', index: '03', title: 'API &amp; Data Pipeline', desc: 'Building ETL pipelines, REST API integration, web scraping, and automated data ingestion workflows.' },
    { id: 'skill4', icon: 'code', index: '04', title: 'Python', desc: 'Pandas, NumPy, Matplotlib for data analysis, automation, and scripting. Jupyter notebooks for exploratory analysis.' },
    { id: 'skill5', icon: 'magic-wand', index: '05', title: 'Google Apps Script', desc: 'Automating Google Workspace workflows, building custom functions, and connecting Sheets to external APIs.' },
    { id: 'skill6', icon: 'chart-bar', index: '06', title: 'Dune Analytics', desc: 'On-chain SQL queries, blockchain data modeling, interactive dashboards for Solana and Ethereum ecosystems.' }
  ],

  teaching: [
    { id: 'teach1', icon: 'book-open', label: 'Workshop', title: 'SQL Masterclass' },
    { id: 'teach2', icon: 'presentation-chart', label: 'Workshop', title: 'Excel for Business' },
    { id: 'teach3', icon: 'git-branch', label: 'Course', title: 'Data Pipeline Fundamentals' },
    { id: 'teach4', icon: 'gear', label: 'Tutorial', title: 'Google Apps Script Automation' },
    { id: 'teach5', icon: 'code', label: 'Course', title: 'Python for Data Analysis' },
    { id: 'teach6', icon: 'chart-bar', label: 'Tutorial', title: 'Dune Analytics On-Chain SQL' }
  ],

  social: [
    { id: 'soc1', icon: 'github-logo', name: 'GitHub', url: 'https://github.com/oladeeayo' },
    { id: 'soc2', icon: 'linkedin-logo', name: 'LinkedIn', url: 'https://linkedin.com/in/oladayo-oladipupo' },
    { id: 'soc3', icon: 'twitter-logo', name: 'X', url: 'https://x.com/oladeeayo' },
    { id: 'soc4', icon: 'medium-logo', name: 'Medium', url: 'https://medium.com/@oladeeayo' },
    { id: 'soc5', icon: 'youtube-logo', name: 'YouTube', url: 'https://youtube.com/@oladeayo' },
    { id: 'soc6', icon: 'chart-bar', name: 'Dune', url: 'https://dune.com/oladee' }
  ]
};

function sortByPeriod(arr) {
  if (!arr) return;
  arr.sort(function (a, b) {
    function getYear(period) {
      if (!period) return 0;
      if (period.toLowerCase().indexOf('present') !== -1) return 9999;
      var m = period.match(/(\d{4})/);
      return m ? parseInt(m[1]) : 0;
    }
    return getYear(b.period) - getYear(a.period);
  });
}

// --- Supabase sync ---
function supabaseFetch(path, options) {
  var cfg = window.SUPABASE_CONFIG;
  if (!cfg || !cfg.url || !cfg.anonKey) return Promise.reject('Supabase not configured');
  var url = cfg.url.replace(/\/$/, '') + path;
  return fetch(url, {
    headers: {
      apikey: cfg.anonKey,
      Authorization: 'Bearer ' + cfg.anonKey,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    ...options
  });
}

function supabaseLoad() {
  return supabaseFetch('/rest/v1/portfolio_data?id=eq.main&select=data,posts')
    .then(function (r) { if (!r.ok) throw new Error('Supabase fetch failed'); return r.json(); })
    .then(function (rows) {
      if (rows && rows.length > 0) {
        if (rows[0].data) window._supabaseData = rows[0].data;
        if (rows[0].posts) window._supabasePosts = rows[0].posts;
      }
    })
    .catch(function () {});
}

function supabaseSave(data, posts) {
  var body = { updated_at: new Date().toISOString() };
  if (data) body.data = data;
  if (posts) body.posts = posts;
  return supabaseFetch('/rest/v1/portfolio_data?id=eq.main', {
    method: 'PATCH',
    body: JSON.stringify(body)
  }).catch(function () {});
}

// Load from Supabase on script init (fire-and-forget)
if (typeof window.SUPABASE_CONFIG !== 'undefined') {
  supabaseLoad();
}

window.getPortfolioData = function () {
  // Prefer Supabase data if available
  if (window._supabaseData && window._supabaseData.profile) {
    sortByPeriod(window._supabaseData.experience);
    sortByPeriod(window._supabaseData.education);
    return window._supabaseData;
  }
  // Fallback to localStorage
  try {
    var raw = localStorage.getItem(window.PORTFOLIO_STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.profile) {
        sortByPeriod(parsed.experience);
        sortByPeriod(parsed.education);
        return parsed;
      }
    }
  } catch (e) {}
  // Final fallback: defaults
  var def = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
  sortByPeriod(def.experience);
  sortByPeriod(def.education);
  return def;
};

window.savePortfolioData = function (data) {
  localStorage.setItem(window.PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
  window._supabaseData = data;
  supabaseSave(data, null);
};

window.resetPortfolioData = function () {
  localStorage.removeItem(window.PORTFOLIO_STORAGE_KEY);
  window._supabaseData = null;
  supabaseSave(null, null);
};

// Blog post helpers with Supabase sync
window.getBlogPosts = function () {
  if (window._supabasePosts && Array.isArray(window._supabasePosts) && window._supabasePosts.length > 0) {
    return JSON.parse(JSON.stringify(window._supabasePosts));
  }
  try {
    var raw = localStorage.getItem('portfolio_posts');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
};

window.saveBlogPosts = function (posts) {
  localStorage.setItem('portfolio_posts', JSON.stringify(posts));
  window._supabasePosts = posts;
  supabaseSave(null, posts);
};
