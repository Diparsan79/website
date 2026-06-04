// entry expanding and collapsing

const entries = document.querySelectorAll('.entry');

entries.forEach(entry => {
    entry.addEventListener('click', () =>{
        const isExpanded = entry.classList.contains('expanded');

        entries.forEach(e => {
            e.classList.remove('expanded');
            e.querySelector('.entry-body').style.display ='none';
        });

        if (!isExpanded) {
            entry.classList.add('expanded');
            entry.querySelector('.entry-body').style.display = 'block';
        }
    });
});
