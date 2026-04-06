import { movieCart } from './fav-movie-cart.js';

//functio to render movies in the list
const renderMovies = (movies) => {
  movieContainer.innerHTML = '';

  movies.forEach(movie => {
    movieContainer.innerHTML += `
      <div class="movie-card">
        <img src="${movie.moviePoster !== "N/A" ? movie.moviePoster : 'Images & Icons/icons/icons8-movie-64.png'}" class="movie-image">
        <p class="movie-title">${movie.Title}</p>
        <p class="movie-year">${movie.Year}</p>
      </div>
    `;
  });
};

const movieContainer = document.querySelector('.js-moive-card-container');

//display movies in the list dynamically
if (movieContainer) {
  renderMovies(movieCart);
}

//count number of movies in the list and display it
const numMovies = document.querySelector('.js-number-of-movies');
if(movieCart.length === 0) {
  numMovies.textContent = 'No movies in your list';
}else{
  numMovies.textContent = `You have ${movieCart.length} movies in your list`;
}

//filter for movies
const searchElement = document.querySelector('.js-search-input');

searchElement.addEventListener('input', () => {
  const searchInput = searchElement.value.toLowerCase();

  let filteredMovies = movieCart.filter(movie => {
    return movie.Title.toLowerCase().includes(searchInput);
  });

  renderMovies(filteredMovies);
});

//delete movies from the list
const headerDeleteButton = document.querySelector('.js-clear-button');
headerDeleteButton.addEventListener('click', () =>{
  // Clear localStorage first
  localStorage.removeItem('movieCart');

  // Clear the array by splicing it
  movieCart.splice(0, movieCart.length);

  // Re-render empty
  renderMovies(movieCart);

  // Update movie count
  numMovies.textContent = 'No movies in your list';
});

//back to home button
document.querySelector('.js-back-to-home').addEventListener('click', () => {
  window.location.href = 'index.html';
});