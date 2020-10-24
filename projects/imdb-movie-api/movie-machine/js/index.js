let leftSideData;
let rightSideData;

// fetch movie by ID (i)
async function handleFetchMoreData(searchTerm, el, side) {
  // console.log("Movie i", movie);

  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "6c39ffdc",
      i: searchTerm.imdbID,
    },
  });

  // console.log("Movie i 2", fetchMovie.data);
  el.innerHTML = showMovieData(response.data);
  console.log(response.data);

  side === "left"
    ? (leftSideData = response.data)
    : (rightSideData = response.data);

  if (leftSideData && rightSideData) {
    compareSummaries();
  }
}

// Compare stats
function compareSummaries() {
  console.log("Time for comparison");
  const leftSideSummary = document.querySelectorAll(
    ".movies__left .notification"
  );
  const rightSideSummary = document.querySelectorAll(
    ".movies__right .notification"
  );

  leftSideSummary.forEach((leftStat, index) => {
    const rightStat = rightSideSummary[index];
    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);

    leftSideValue === "N/A" && rightSideValue === "N/A"
      ? console.log("No Box Office data to compare")
      : leftSideValue > rightSideValue
      ? leftStat.classList.add("winner")
      : rightStat.classList.add("winner");
  });
}

createAutocompleteConfig = {
  renderOption(movie) {
    const imgSrc =
      movie.Poster === "N/A"
        ? "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
        : movie.Poster;

    return `
      <img src="${imgSrc}" alt=""/>
      <span class="title">${movie.Title} (${movie.Year})</span>
    `;
  },
  inputValue(input) {
    return input.Title;
  },
  // FETCHDATA -> fetch movie by search (s)
  async fetchData(searchTerm) {
    // 2nd argument (obj) has 1 property: (key: params) ==> value is an object ==> whose properties (key + values) are stingified and concatenated to 1st argument: api url.
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "6c39ffdc",
        s: searchTerm,
      },
    });

    // console.log("Movie s", response.data.Search);
    if (response.data.Error) return [];
    return response.data.Search;
  },
};

createAutocomplete({
  ...createAutocompleteConfig,
  root: document.querySelector(".movies__autocompleteLeft"),
  fetchMoreData(searchTerm) {
    return handleFetchMoreData(
      searchTerm,
      document.querySelector(".movies__left"),
      "left"
    );
  },
});
createAutocomplete({
  ...createAutocompleteConfig,
  root: document.querySelector(".movies__autocompleteRight"),
  fetchMoreData(searchTerm) {
    return handleFetchMoreData(
      searchTerm,
      document.querySelector(".movies__right"),
      "right"
    );
  },
});

// Append to DOM
const showMovieData = (movieDetail) => {
  // match() any numbers and return an array
  const matchAwards = movieDetail.Awards.match(/\d+/g).reduce((acc, curr) => {
    return acc + parseInt(curr);
  }, 0);

  // alternative way using split()
  const splitAwards = movieDetail.Awards.split(" ").reduce((acc, curr) => {
    let value = parseInt(curr);
    return isNaN(value) ? acc : acc + value;
  }, 0);

  const boxOffice = movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "");
  const metaScore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseFloat(movieDetail.imdbVotes.replace(/,/g, ""));

  console.log(splitAwards, boxOffice, metaScore, imdbRating, imdbVotes);

  return `
  <div class="movie">
    <article class="movie__media py-1">
      <figure>
        <p>
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="movie__media__content">
        <h2>${movieDetail.Title}</h2>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </article>

    <article data-value=${matchAwards} class="notification">
      <p class="notification__title">${movieDetail.Awards}</p>
      <p class="notification__subtitle">Awards</p>
    </article>

    <article data-value=${boxOffice} class="notification">
      <p class="notification__title">${movieDetail.BoxOffice}</p>
      <p class="notification__subtitle">Box Office</p>
    </article>

    <article data-value=${metaScore} class="notification">
      <p class="notification__title">${movieDetail.Metascore}</p>
      <p class="notification__subtitle">Metascore</p>
    </article>

    <article data-value=${imdbRating} class="notification">
      <p class="notification__title">${movieDetail.imdbRating}</p>
      <p class="notification__subtitle">IMDB Rating</p>
    </article>

    <article data-value=${imdbVotes} class="notification">
      <p class="notification__title">${movieDetail.imdbVotes}</p>
      <p class="notification__subtitle">IMDB Votes</p>
    </article>
  </div>
  `;
};
