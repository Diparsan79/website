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

function showFeed(filter) {
  feed.classList.add('grid-bg');
  renderEntries(filter);
}

function setActiveNavv(view) {
  navBtns.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
}

function renderEntries(filter= 'all') {
  feed.innerHTML = '';

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);
  
  const label = filter ==='all' ? 'all entries' : filter ==='journal' ? 'journal' : 'lab notes';

  feed.innerHTML = `
    <div class="feed-header">
      <h1>${label}</h1>
      <span class="feed-count">${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}</span>
    </div>
  `;


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

      allEntries.forEach(e => {
        e.classList.remove('expanded');
        e.querySelector('.entry-body').style.display = 'none';
      });

      if (!isExpanded) {
        entry.classList.add('expanded');
        entry.querySelector('.entry-body').style.display ='block'; 
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