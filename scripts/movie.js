async function fetchMovie(){
  const searchInput = document.querySelector('.js-search-input');
  const movieContainer = document.querySelector('.js-movie-search-container');
  const emptyState = document.querySelector('.js-empty-state');
  movieContainer.innerHTML = '';
  emptyState.innerHTML = '';

  const searchMovie = searchInput.value.toLowerCase().trim();

  if (!searchMovie) return; // don't search empty string

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=59401228&s=${searchMovie}`);

    if(!response.ok){
      throw new Error("Could not fetch movie");
    }
    const data = await response.json();

    if (data.Response === "False") {
      movieContainer.innerHTML = `<p class="no-movie-text">No movies found for "${searchMovie}"!</p>`;
      emptyState.innerHTML = '';
      return;
    }
    data.Search.forEach((movie) =>{
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card')
      

      movieCard.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'Images & Icons/icons/icons8-movie-64.png'}" alt="${movie.Title}" class="movie-image">
        <p class="movie-title">${movie.Title}</p>
        <p class="movie-year">${movie.Year}</p>
      `;

      emptyState.appendChild(movieCard)
    })


    console.log(data);
  } catch (error) {
    console.error(error)
    movieContainer.innerHTML = `<p>Failed to fetch movies. Try again later.</p>`;
  }
};
const emptyStateID = document.getElementById('js-empty-state-id');

const handleSearch = () => {
  fetchMovie();
  emptyStateID.scrollIntoView({ behavior: 'smooth' });
}


document.querySelector('.js-search-button')
  .addEventListener('click', handleSearch);

document.querySelector('.js-search-input')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
