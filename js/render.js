(function () {
  var data = window.getPortfolioData();
  if (!data) return;

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return document.querySelectorAll(sel); }

  // Profile
  var profileName = qs('[data-field="profile-name"]');
  var profileRole = qs('[data-field="profile-role"]');
  var profileBio = qs('[data-field="profile-bio"]');
  var profileHighlights = qs('[data-field="profile-highlights"]');
  var profileBeyond = qs('[data-field="profile-beyond"]');
  var profileExpanding = qs('[data-field="profile-expanding"]');

  if (profileName) profileName.textContent = data.profile.name;
  if (profileRole) profileRole.textContent = data.profile.role;
  if (profileBio) profileBio.textContent = data.profile.bio;
  if (profileBeyond) profileBeyond.textContent = data.profile.beyondBio;
  if (profileExpanding) profileExpanding.innerHTML = '<strong>Currently expanding into Data Engineering</strong> to build even more powerful data pipelines for Web3 and enterprise clients.';

  if (profileHighlights && data.profile.highlights) {
    profileHighlights.innerHTML = data.profile.highlights.map(function (h) {
      return '<li style="font-size:0.9375rem;color:var(--text-secondary);padding-left:16px;border-left:2px solid var(--accent);">' + h + '</li>';
    }).join('');
  }

  // Experience
  var expContainer = qs('[data-section="experience"]');
  if (expContainer && data.experience) {
    expContainer.innerHTML = data.experience.map(function (e) {
      return '<div class="resume-item"><span class="resume-period">' + e.period + '</span><div class="resume-role"><h4>' + e.title + '</h4><p>' + e.company + '</p></div><span class="resume-tag">' + e.tag + '</span></div>';
    }).join('');
  }

  // Education
  var eduContainer = qs('[data-section="education"]');
  if (eduContainer && data.education) {
    eduContainer.innerHTML = data.education.map(function (e) {
      return '<div class="education-item"><span class="edu-period">' + e.period + '</span><div class="edu-detail"><h4>' + e.degree + '</h4><p>' + e.school + '</p></div><span class="edu-tag">' + e.tag + '</span></div>';
    }).join('');
  }

  // Certifications
  var certContainer = qs('[data-section="certifications"]');
  if (certContainer && data.certifications) {
    certContainer.innerHTML = data.certifications.map(function (c) {
      return '<a href="' + c.url + '" target="_blank" rel="noopener noreferrer" class="cert-card" style="text-decoration:none;color:inherit;display:block;"><p class="cert-org">' + c.org + '</p><h4>' + c.title + '</h4><p class="cert-date">View credential \u2192</p></a>';
    }).join('');
  }

  // Projects
  var projContainer = qs('[data-section="projects"]');
  if (projContainer && data.projects) {
    projContainer.innerHTML = data.projects.map(function (p) {
      return '<div class="project-card"><p class="project-icon"><i class="ph ph-' + p.icon + '"></i> ' + p.category + '</p><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="project-links">' + (p.links || []).map(function (l) {
        return '<a href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + l.label + ' \u2192</a>';
      }).join('') + '</div></div>';
    }).join('');
  }

  // Contributions
  function renderContribs(list, container) {
    if (!container || !list) return;
    container.innerHTML = list.map(function (c) {
      return '<a href="' + c.url + '" target="_blank" rel="noopener noreferrer" class="contrib-card" style="text-decoration:none;color:inherit;"><span class="contrib-logo">' + c.name + '</span><span class="contrib-handle">' + c.handle + '</span><span class="contrib-category">' + c.category + '</span></a>';
    }).join('');
  }

  renderContribs(data.contributions.products, qs('[data-section="contrib-products"]'));
  renderContribs(data.contributions.ecosystem, qs('[data-section="contrib-ecosystem"]'));
  renderContribs(data.contributions.media, qs('[data-section="contrib-media"]'));

  // Featured
  var featContainer = qs('[data-section="featured"]');
  if (featContainer && data.featured) {
    featContainer.innerHTML = data.featured.map(function (f) {
      return '<div class="featured-card"><p class="featured-source">' + f.source + '</p><h4>' + f.title + '</h4><a href="' + f.url + '" target="_blank" rel="noopener noreferrer">Read Article \u2192</a></div>';
    }).join('');
  }

  // Speaking
  var speakContainer = qs('[data-section="speaking"]');
  if (speakContainer && data.speaking) {
    speakContainer.innerHTML = data.speaking.map(function (s) {
      return '<div class="speaking-item"><span class="speaking-icon"><i class="ph ph-' + s.icon + '"></i> ' + s.label + '</span><div class="speaking-info"><h4>' + s.title + '</h4><p>' + s.desc + '</p></div><a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="speaking-link">Watch <i class="ph ph-arrow-up-right"></i></a></div>';
    }).join('');
  }

  // Skills
  var skillContainer = qs('[data-section="skills"]');
  if (skillContainer && data.skills) {
    skillContainer.innerHTML = data.skills.map(function (s) {
      return '<div class="system-card"><p class="index"><i class="ph ph-' + s.icon + '"></i> ' + s.index + '</p><h3>' + s.title + '</h3><p>' + s.desc + '</p></div>';
    }).join('');
  }

  // Teaching
  var teachContainer = qs('[data-section="teaching"]');
  if (teachContainer && data.teaching) {
    teachContainer.innerHTML = data.teaching.map(function (t) {
      return '<div class="teaching-card"><p class="teaching-label"><i class="ph ph-' + t.icon + '"></i> ' + t.label + '</p><h4>' + t.title + '</h4></div>';
    }).join('');
  }

  // Social
  var socialContainer = qs('[data-section="social"]');
  if (socialContainer && data.social) {
    socialContainer.innerHTML = data.social.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="social-link"><span><i class="ph ph-' + s.icon + '"></i> ' + s.name + '</span></a>';
    }).join('');
  }

  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
