import { movieCart } from './fav-movie-cart.js';

const movieContainer = document.querySelector('.js-moive-card-container');
const numMovies = document.querySelector('.js-number-of-movies');
const searchElement = document.querySelector('.js-search-input');
const headerDeleteButton = document.querySelector('.js-clear-button');
const sortSelect = document.querySelector('.js-select');

// Helper: save cart to localStorage and update count
const updateCartUI = () => {
  localStorage.setItem('movieCart', JSON.stringify(movieCart));
  if (movieCart.length === 0) {
    numMovies.textContent = 'No movies in your list';
  } else {
    numMovies.textContent = `You have ${movieCart.length} movie${movieCart.length > 1 ? 's' : ''} in your list`;
  }
};

// Render movies
const renderMovies = (movies) => {
  movieContainer.innerHTML = '';

  if (!movies.length) {
    movieContainer.innerHTML = `<p class="no-movie-text">No movies found</p>`;
    return;
  }

  movies.forEach(movie => {
    movieContainer.innerHTML += `
      <div class="movie-card">
        <img src="${movie.moviePoster !== "N/A" ? movie.moviePoster : 'Images & Icons/icons/icons8-movie-64.png'}" class="movie-image">
        <p class="movie-title">${movie.Title}</p>
        <p class="movie-year">${movie.Year}</p>
        <div class="movie-button-container">
          <button class="delete-button js-delete-button" data-imdbid="${movie.imdbID}">
            <img src="Images & Icons/icons/my list icons/icons8-delete-24.png">
            Delete
          </button>
        </div>        
      </div>
    `;
  });

  // Attach delete listeners
  document.querySelectorAll('.js-delete-button').forEach(button => {
    button.addEventListener('click', () => {
      const imdbID = button.getAttribute('data-imdbid');
      const index = movieCart.findIndex(m => m.imdbID === imdbID);
      if (index !== -1) {
        movieCart.splice(index, 1);
        updateCartUI();       // Save and update count
        renderMovies(movieCart); // Re-render
      }
    });
  });
};

// Initial render
if (movieContainer) renderMovies(movieCart);
updateCartUI();

// Search filter
searchElement?.addEventListener('input', () => {
  const searchInput = searchElement.value.toLowerCase();
  const filteredMovies = movieCart.filter(movie => movie.Title.toLowerCase().includes(searchInput));
  renderMovies(filteredMovies);
});

// Clear all movies
headerDeleteButton?.addEventListener('click', () => {
  movieCart.splice(0, movieCart.length);
  updateCartUI();
  renderMovies(movieCart);
});

// Back to home
document.querySelector('.js-back-to-home')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Sort movies
sortSelect?.addEventListener('change', (event) => {
  const type = event.target.value;
  if (!type) return;

  movieCart.sort((a,b) => {
    if(type === 'Title(A-Z)') return a.Title.localeCompare(b.Title);
    if(type === 'Year(Newest)') return b.Year.localeCompare(a.Year);
    if(type === 'Year(Oldest)') return a.Year.localeCompare(b.Year);
  });

  renderMovies(movieCart);
  updateCartUI(); // Keep count & storage updated
});

// Navigate to movies page
document.querySelector('.js-movies-label').addEventListener('click', () => {
  window.location.href = 'movies.html';
});

document.querySelector('.js-series-label').addEventListener('click', () => {
  window.location.href = 'series.html';
});
