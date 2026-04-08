import { seriesQueries } from "./data.js";
import { movieCart } from "./fav-movie-cart.js";

const seriesContainer = document.querySelector('.js-series-card-container');
const backToHome = document.querySelector('.js-back-to-home');
const numMovies = document.querySelector('.js-number-of-movies');
const searchElement = document.querySelector('.js-search-input');
const sortSelect = document.querySelector('.js-select');
const clearButton = document.querySelector('.js-clear-button');

let allSeries = [];

// Save watchlist to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('movieCart', JSON.stringify(movieCart));
}

// Update watchlist count safely
const updateWatchlistCount = () => {
  if (!numMovies) return;
  numMovies.textContent = movieCart.length
    ? `You have ${movieCart.length} movie${movieCart.length > 1 ? 's' : ''} in your list`
    : 'No movies in your list';
};

// Render series cards
const renderSeries = (seriesList) => {
  if (!seriesContainer) return;

  seriesContainer.innerHTML = '';

  if (!seriesList.length) {
    seriesContainer.innerHTML = `<p class="no-serie-text">No series found!</p>`;
    return;
  }

  seriesList.forEach(series => {
    const seriesCard = document.createElement('div');
    seriesCard.classList.add('series-card');

    seriesCard.innerHTML = `
      <img src="${series.seriesPoster !== "N/A" ? series.seriesPoster : 'Images & Icons/icons/icons8-movie-64.png'}" class="series-image">
      <p class="series-title">${series.Title}</p>
      <p class="series-year">${series.Year}</p>
      <span class="add-watchlist-button movie-add-watchlist">
        <img src="Images & Icons/icons/icons8-favorites-32.png" class="add-watchlist-icon">
        <img src="Images & Icons/icons/icons8-favorites-30.png" class="remove-watchlist-icon">
      </span>
    `;

    const addBtn = seriesCard.querySelector('.add-watchlist-button');
    const addIcon = seriesCard.querySelector('.add-watchlist-icon');
    const removeIcon = seriesCard.querySelector('.remove-watchlist-icon');

    // Show correct icon if already in watchlist
    const inCart = movieCart.some(s => s.imdbID === series.imdbID);
    addIcon.style.display = inCart ? 'none' : 'inline';
    removeIcon.style.display = inCart ? 'inline' : 'none';

    addBtn.addEventListener('click', () => {
      const index = movieCart.findIndex(s => s.imdbID === series.imdbID);

      if (index === -1) {
        // Not in cart → add
        const seriesItem = {
          imdbID: series.imdbID,
          Title: series.Title,
          Year: series.Year,
          moviePoster: series.seriesPoster !== "N/A" ? series.seriesPoster : 'Images & Icons/icons/icons8-movie-64.png'
        };
        movieCart.push(seriesItem);
        addIcon.style.display = 'none';
        removeIcon.style.display = 'inline';
      } else {
        // Already in cart → remove
        movieCart.splice(index, 1);
        addIcon.style.display = 'inline';
        removeIcon.style.display = 'none';
      }

      saveToLocalStorage();
      updateWatchlistCount();
    });

    seriesContainer.appendChild(seriesCard);
  });
};

// Fetch series from API
const fetchSeries = async () => {
  allSeries = [];
  if (seriesContainer) seriesContainer.innerHTML = '';

  for (let query of seriesQueries) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=59401228&s=${query}&type=series`);
      if (!response.ok) continue;

      const data = await response.json();
      if (!data.Search) continue;

      const seriesArr = data.Search.map(series => ({
        seriesPoster: series.Poster,
        imdbID: series.imdbID,
        Title: series.Title,
        Year: series.Year
      }));

      allSeries.push(...seriesArr);
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  }

  renderSeries(allSeries);
  updateWatchlistCount();
};

// Search series
searchElement?.addEventListener('input', () => {
  const searchInput = searchElement.value.toLowerCase();
  const filtered = allSeries.filter(s => s.Title.toLowerCase().includes(searchInput));
  renderSeries(filtered);
});

// Sort series
sortSelect?.addEventListener('change', (event) => {
  const type = event.target.value;
  if (!type) return;

  const arrayToSort = allSeries.filter(s => s.Title.toLowerCase().includes(searchElement?.value.toLowerCase() || ''));

  arrayToSort.sort((a, b) => {
    if (type === 'Title(A-Z)') return a.Title.localeCompare(b.Title);
    if (type === 'Year(Newest)') return b.Year.localeCompare(a.Year);
    if (type === 'Year(Oldest)') return a.Year.localeCompare(b.Year);
  });

  renderSeries(arrayToSort);
});

// Clear watchlist
clearButton?.addEventListener('click', () => {
  movieCart.splice(0, movieCart.length);
  saveToLocalStorage();
  updateWatchlistCount();
  renderSeries(allSeries);
});

// Navigation
backToHome?.addEventListener('click', () => window.location.href = 'index.html');

document.querySelector('.js-my-list-label')
  .addEventListener('click', () =>
     window.location.href = 'my-list.html');

document.querySelector('.js-movies-label')
  .addEventListener('click', () =>
     window.location.href = 'movies.html');

// Initial fetch
fetchSeries();