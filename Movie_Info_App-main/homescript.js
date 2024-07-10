

// Checking authentication on page load
window.onload = function () {
    if (!sessionStorage.getItem('isAuthenticated')) {
        window.location.href = 'index.html';
    }
}
// Setting up api key 
localStorage.setItem('MovieApiKey', 'c03f0a1')

// Using querySelector method to get the elements
const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container')
const inputBox = document.querySelector('.inputBox');


// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    try {
        const myAPIKey = localStorage.getItem('MovieApiKey');
        const url = `https://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;
        const response = await fetch(url);
        if (!response.ok)
            throw new Error("Unable to fetch movie data.");
        const data = await response.json();
        showMovieData(data);
    }
    catch (error) {
        showErrorMessage("No Movie Found!!!");
    }
}

// Function to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = ""
    movieContainer.classList.remove('noBackground');
    // Use Destructuring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info')
    movieElement.innerHTML = `<h2>${Title}</h2>
                             <p><strong>Rating: &#11088; </strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement)


    movieElement.innerHTML += `<p><strong>Plot: </strong>${Plot}</p>
                               <p><strong>Cast: </strong>${Actors}</p>
                               <p><strong>Released Date: </strong>${Released}</p>
                               <p><strong>Duration: </strong>${Runtime}</p>
                               `;

    movieContainer.appendChild(movieElement);

    // Creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}



// Function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}
// Adding event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage('Fetching movie information...')
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage("Error! Search filed is empty.");
    }
});

// Function to clear the fields and elements displayed
searchForm.addEventListener('reset', (e) => {
    e.preventDefault()
    window.location.href = 'home.html'
});

// Function to logout 
function logout() {
    sessionStorage.removeItem('isAuthenticated');

    window.location.href = 'index.html';
}

// Function to reload the home page
function home() {
    window.location.href = 'home.html'
}
