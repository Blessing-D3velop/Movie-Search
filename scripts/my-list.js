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
        <div class="movie-button-container">
          <button class="delete-button js-delete-button" data-imdbid="${movie.imdbID}">
            <img src="Images & Icons/icons/my list icons/icons8-delete-24.png"  >
            Delete
          </button>
        </div>        
      </div>

    `;

    document.querySelectorAll('.js-delete-button').forEach(button => {
      button.addEventListener('click', () => {
        const imdbID = button.getAttribute('data-imdbid');
        const index = movieCart.findIndex(m => m.imdbID === imdbID);
        if(index !== -1) {
          movieCart.splice(index, 1);
          renderMovies(movieCart);
        }
      });
    });
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

  localStorage.removeItem('movieCart');
  movieCart.splice(0, movieCart.length);
  renderMovies(movieCart);
  numMovies.textContent = 'No movies in your list';
});

//back to home button
document.querySelector('.js-back-to-home').addEventListener('click', () => {
  window.location.href = 'index.html';
});




//sort movies
const sortSelect = document.querySelector('.js-select');

const sortMovies = (type) =>{

  if(!type) {
    return;
  }

  movieCart.sort((a,b) =>{
    if(type === 'Title(A-Z)') {
      return a.Title.localeCompare(b.Title);

    } else if(type === 'Year(Newest)') {
      return b.Year.localeCompare(a.Year); 

    } else if(type === 'Year(Oldest)') {
      return a.Year.localeCompare(b.Year); 
    }
  });
};


sortSelect.addEventListener('change', (event) =>{
  const selectedOption = event.target.value;
  sortMovies(selectedOption);
  renderMovies(movieCart);
});

document.querySelector('.js-movies-label')
  .addEventListener('click', () => {
    window.location.href = 'movies.html';
});