import { movieCart } from './fav-movie-cart.js';

async function fetchMovie(){
  const searchInput = document.querySelector('.js-search-input');
  const movieContainer = document.querySelector('.js-movie-search-container');
  const emptyState = document.querySelector('.js-empty-state');

  movieContainer.innerHTML = '';
  emptyState.innerHTML = '';

  const searchMovie = searchInput.value.toLowerCase().trim();
  if (!searchMovie) return;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=59401228&s=${searchMovie}`);
    if(!response.ok) throw new Error("Could not fetch movie");

    const data = await response.json();
    if (data.Response === "False") {
      movieContainer.innerHTML = `<p class="no-movie-text">No movies found for "${searchMovie}"!</p>`;
      emptyState.innerHTML = '';
      return;
    }

    data.Search.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card'); 

      movieCard.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'Images & Icons/icons/icons8-movie-64.png'}" alt="${movie.Title}" class="movie-image">
        <p class="movie-title">${movie.Title}</p>
        <p class="movie-year">${movie.Year}</p>

        <span class="add-watchlist-button" data-imdb="${movie.imdbID}">
          <img src="Images & Icons/icons/icons8-favorites-32.png" alt="Add to Watchlist" class="add-watchlist-icon">
          <img src="Images & Icons/icons/icons8-favorites-30.png" alt="Removed from Watchlist" class="remove-watchlist-icon">
        </span>
      `;

      const addWatchlistButton = movieCard.querySelector('.add-watchlist-button');
      const addIcon = movieCard.querySelector('.add-watchlist-icon');
      const removeIcon = movieCard.querySelector('.remove-watchlist-icon');

      removeIcon.style.display = 'none';

      addWatchlistButton.addEventListener('click', () => {
        // toggle icons
        if (addIcon.style.display !== 'none') {
          addIcon.style.display = 'none';
          removeIcon.style.display = 'inline';

          // add the movie to the cart if not already there
          const exists = movieCart.some(m => m.imdbID === movie.imdbID);
          if (!exists) {
            movieCart.push({
              moviePoster: movie.Poster,
              imdbID: movie.imdbID,
              Title: movie.Title,
              Year: movie.Year
            });
            localStorage.setItem('movieCart', JSON.stringify(movieCart));
          }

        } else {
          addIcon.style.display = 'inline';
          removeIcon.style.display = 'none';

          // remove the movie from the cart
          const index = movieCart.findIndex(m => m.imdbID === movie.imdbID);
          if (index !== -1) {
            movieCart.splice(index, 1);
          }
        }

        console.log(movieCart);
      });

      emptyState.appendChild(movieCard);
    });

    console.log(data);

  } catch (error) {
    console.error(error);
    movieContainer.innerHTML = `<p>Failed to fetch movies. Try again later.</p>`;
  }
}

const emptyStateID = document.getElementById('js-empty-state-id');
const handleSearch = () => {
  fetchMovie();
  emptyStateID.scrollIntoView({ behavior: 'smooth' });
}

document.querySelector('.js-search-button')
  .addEventListener('click', handleSearch);

document.querySelector('.js-search-input')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleSearch();
  });