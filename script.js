const feed = document.getElementById('feed');

function renderEntries(filter = 'all') {
  feed.innerHTML = '';

  const filtered = filter === 'all'
    ? entries
    : entries.filter(e => e.type === filter);

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
        entry.querySelector('.entry-body').computedStyleMap.display = 'none';

        entry.addEventListener('click', () => {
            const isExpanded = entry.classList.contains('expanded');

            allEntries.forEach(e => {
              e.classList.remove('expanded');
              e.querySelector('.entry-body').style.display = 'none';
            });

            if (!isExpanded) {
              entry.classList.add('expanded');
              entry.querySelector('.entry-body').style.display = 'block';
            }
            
        });
    });
}

renderEntries();