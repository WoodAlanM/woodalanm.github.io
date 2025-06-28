let titles = [];

// Load CSV and parse
fetch('../movies.csv')
    .then(response => response.text())
    .then(text => {
    titles = text.split('\n').map(line => line.trim()).filter(line => line);
    });

const searchBox = document.getElementById('searchBox');
const list = document.getElementById('autocomplete-list');

searchBox.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    list.innerHTML = '';

    if (query.length === 0) return;

    const matches = titles.filter(title => title.toLowerCase().includes(query)).slice(0, 10);

    matches.forEach(title => {
    const item = document.createElement('div');
    item.classList.add('autocomplete-item');
    item.textContent = title;
    item.addEventListener('click', () => {
        searchBox.value = title;
        list.innerHTML = '';
    });
    list.appendChild(item);
    });
});

// Close the autocomplete when clicking outside
document.addEventListener('click', function(e) {
    if (e.target !== searchBox) {
    list.innerHTML = '';
    }
});