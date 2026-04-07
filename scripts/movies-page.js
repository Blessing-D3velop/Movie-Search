import { movieCart } from './fav-movie-cart.js';
import { queries } from './data.js';

const movieContainer = document.querySelector('.js-moive-card-container');
const searchElement = document.querySelector('.js-search-input');
const sortSelect = document.querySelector('.js-select');
const numMovies = document.querySelector('.js-number-of-movies');
const backToHome = document.querySelector('.js-back-to-home');
const clearButton = document.querySelector('.js-clear-button');

let allMovies = []; // holds all fetched movies

// Update watchlist count
const updateWatchlistCount = () => {
  numMovies.textContent = movieCart.length
    ? `You have ${movieCart.length} movie${movieCart.length > 1 ? 's' : ''} in your list`
    : 'No movies in your list';
};

// Render movies
const renderMovies = (movies) => {
  movieContainer.innerHTML = '';

  if (!movies.length) {
    movieContainer.innerHTML = `<p class="no-movie-text">No movies found</p>`;
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
      <img src="${movie.moviePoster !== "N/A" ? movie.moviePoster : 'Images & Icons/icons/icons8-movie-64.png'}" class="movie-image">
      <p class="movie-title">${movie.Title}</p>
      <p class="movie-year">${movie.Year}</p>
      <span class="add-watchlist-button movie-add-watchlist">
        <img src="Images & Icons/icons/icons8-favorites-32.png" class="add-watchlist-icon">
        <img src="Images & Icons/icons/icons8-favorites-30.png" class="remove-watchlist-icon">
      </span>
    `;

    const addBtn = movieCard.querySelector('.add-watchlist-button');
    const addIcon = movieCard.querySelector('.add-watchlist-icon');
    const removeIcon = movieCard.querySelector('.remove-watchlist-icon');

    // Show correct icon if already in watchlist
    if (movieCart.some(m => m.imdbID === movie.imdbID)) {
      addIcon.style.display = 'none';
      removeIcon.style.display = 'inline';
    } else {
      removeIcon.style.display = 'none';
    }

    // Watchlist toggle
    addBtn.addEventListener('click', () => {
      if (addIcon.style.display !== 'none') {
        addIcon.style.display = 'none';
        removeIcon.style.display = 'inline';
        if (!movieCart.some(m => m.imdbID === movie.imdbID)) {
          movieCart.push(movie);
          localStorage.setItem('movieCart', JSON.stringify(movieCart));
        }
      } else {
        addIcon.style.display = 'inline';
        removeIcon.style.display = 'none';
        const index = movieCart.findIndex(m => m.imdbID === movie.imdbID);
        if (index !== -1) {
          movieCart.splice(index, 1);
          localStorage.setItem('movieCart', JSON.stringify(movieCart));
        }
      }
      updateWatchlistCount();
    });

    movieContainer.appendChild(movieCard);
  });
};

// Fetch movies from multiple queries
const fetchMovies = async () => {
  allMovies = [];
  movieContainer.innerHTML = '';

  for (let query of queries) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=59401228&s=${query}&type=movie`);
      if (!response.ok) continue;

      const data = await response.json();
      if (!data.Search) continue;

      const movies = data.Search.map(movie => ({
        moviePoster: movie.Poster,
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year
      }));

      allMovies.push(...movies);
    } catch (error) {
      console.error(`Error fetching movies for ${query}:`, error);
    }
  }

  renderMovies(allMovies);
  updateWatchlistCount();
};

fetchMovies();

// Search filter
searchElement.addEventListener('input', () => {
  const searchInput = searchElement.value.toLowerCase();
  const filtered = allMovies.filter(movie => movie.Title.toLowerCase().includes(searchInput));
  renderMovies(filtered);
});

// Sort movies
sortSelect.addEventListener('change', (event) => {
  const type = event.target.value;
  if (!type) return;

  let arrayToSort = allMovies.filter(movie =>
    movie.Title.toLowerCase().includes(searchElement.value.toLowerCase())
  );

  arrayToSort.sort((a, b) => {
    if (type === 'Title(A-Z)') return a.Title.localeCompare(b.Title);
    if (type === 'Year(Newest)') return b.Year.localeCompare(a.Year);
    if (type === 'Year(Oldest)') return a.Year.localeCompare(b.Year);
  });

  renderMovies(arrayToSort);
});

// Navigation
backToHome.addEventListener('click', () => window.location.href = 'index.html');
document.querySelector('.js-my-list-label')?.addEventListener('click', () => window.location.href = 'my-list.html');

// Clear watchlist
clearButton.addEventListener('click', () => {
  movieCart.splice(0, movieCart.length);
  localStorage.removeItem('movieCart');
  updateWatchlistCount();
  renderMovies(allMovies);
});