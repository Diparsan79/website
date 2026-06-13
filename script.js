const feed = document.getElementById('feed');
const navBtns = document.querySelectorAll('.nav-btn');

function showLanding() {
  feed.innerHTML = landing;
  feed.classList.remove('grid-bg');

  document.querySelectorAll('.landing-link').forEach(Link => {
    link.addEventListener('click', ()=> {
      const view = link.dataset.view;
      setActiveNav(view);
      showFeed(view);
    });
  });
}

function showFeed(filter = 'all') {
  feed.classList.add('grid-bg');
  feed.innerHTML = `
  <div class="filter-bar">
    <button class="filter-btn" ${filter == 'all' ? 'active' : ''}" data-filter="all">all</button>
    <button class="filter-btn ${filter === 'journal' ? 'active' : ''}" data-filter="journal">journal</button
    <button class=filter-btn ${filter ==='lab-note' ? 'active' : ''}" data-filter="lab-note">lab notes</button>
  </div>
`;

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderEntries(btn.dataset.filter);
  });
});
  renderEntries(filter);
}

function setActiveNavv(view) {
  navBtns.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
}

function renderEntries(filter= 'all') {
  const existingHeader = feed.querySelector('.feed-header');
  if (existingHeader) existingHeader.remove()
    
  feed.innerHTML = '';

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);
  
  const label = filter ==='all' ? 'all entries' : filter ==='journal' ? 'journal' : 'lab notes';

  const header = document.createElement('div');
  header.className = 'feed-header';
  feed.innerHTML = `
    <div class="feed-header">
      <h1>${label}</h1>
      <span class="feed-count">${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}</span>
    </div>
  `;

  const filterBar = feed.querySelector('.filter-bar');
  if (filterBar) {
    filterBar.insertAdjacentElement('afterend', header);
  } else {
    feed.prepend(header);
  }
  const existingEntries = feed.querySelectorAll('.entry, .empty-state');
  existingEntries.forEach(e => e.remove());

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <p>nothing here yet.</p>
      <span>entries will appear as you add them to data.js</span>
    `;
    feed.appendChild(empty);
    return;
  }
  
  filtered.forEach(entry => {
    const article = document.createElement('article');
    article.className = `entry ${entry.type}`;
    article.dataset.id = entry.id;

    article.innerHTML = `
      <div class="entry-header">
        <span class="entry-type">${entry.type}</span>
        <span class="entry-date">${entry.date}</span>
        <h2 class="entry-title">${entry.title}</h2>
        <p class="entry-preview">${entry.preview}</p>
      </div>
      <div class="entry-body">
        ${entry.body}
      </div>
    `;
    
    feed.appendChild(article);

  });
  attachExpandListeners();
}

function attachExpandListeners() {
  const allEntries = document.querySelectorAll('.entry');

  allEntries.forEach(entry => {
    entry.querySelector('.entry-body').style.display = 'none';

    entry.addEventListener('click', () => {
      const isExpanded = entry.classList.contains('expanded');
    
    entry.setAttribute('tabindex', '0');
    entry.setAttribute('role', 'button');
    entry.setAttribute('aria-expanded', 'false');

    entry.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        entry.click();
      }
    });

      allEntries.forEach(e => {
        e.classList.remove('expanded');
        e.querySelector('.entry-body').style.display = 'none';
        e.setAttribute('aria-expanded', 'false');
      });

      if (!isExpanded) {
        entry.classList.add('expanded');
        entry.querySelector('.entry-body').style.display ='block';
        entry.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    setActiveNav(view);
    if (view ==='home') {
      showLanding();
    } else {
      showFeed(view);
    }
  });
});

document.getElementById('status-working').textContent = status.working;
showLanding();