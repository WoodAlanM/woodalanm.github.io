let movieTitles = [];
let tvShowTitles = [];

fetch('../movies.csv')
  .then(response => response.text())
  .then(text => {
    movieTitles = text.split('\n').map(line => line.trim()).filter(line => line);
    setupAutocomplete('searchBoxMovies', 'autocomplete-list-movies', movieTitles);
  });

fetch('../tv-shows.csv')
  .then(response => response.text())
  .then(text => {
    tvShowTitles = text.split('\n').map(line => line.trim()).filter(line => line);
    setupAutocomplete('searchBoxTV', 'autocomplete-list-tv', tvShowTitles);
  });

function setupAutocomplete(inputId, listId, dataArray) {
  const searchBox = document.getElementById(inputId);
  const list = document.getElementById(listId);

  searchBox.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    list.innerHTML = '';

    if (query.length === 0) return;

    const matches = dataArray.filter(title => title.toLowerCase().includes(query)).slice(0, 10);

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

  // Hide autocomplete when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target !== searchBox) {
      list.innerHTML = '';
    }
  });
}

// Setup both autocompletes
setupAutocomplete('searchBoxMovies', 'autocomplete-list-movies', movieTitles);
setupAutocomplete('searchBoxTV', 'autocomplete-list-tv', tvShowTitles);
