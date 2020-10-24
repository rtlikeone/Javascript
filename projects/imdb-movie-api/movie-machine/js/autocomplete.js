const createAutocomplete = ({
  root,
  renderOption,
  inputValue,
  fetchData,
  fetchMoreData,
}) => {
  root.innerHTML = `
    <div class="search-box">
      <input class="input" type="text" placeholder="Search"/><button class="search-button px-2"><i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
    <div class="dropdown">
      <div class="dropdown__menu">
        <div class="dropdown__content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector(".input");
  const dropdown = root.querySelector(".dropdown");
  const results = root.querySelector(".results");
  const tutorial = document.querySelector(".tutorial");

  // fetch movie by search (s) after user input
  const handleInput = async (e) => {
    const items = await fetchData(e.target.value);

    // console.log("movies === Array", movies.constructor === Array);

    dropdown.style.display = "none";
    tutorial.style.display = "block";
    results.innerHTML = "";

    for (let item of items) {
      dropdown.style.display = "block";
      tutorial.style.display = "none";

      const option = document.createElement("a");
      option.className = "item";
      option.innerHTML = renderOption(item);
      option.addEventListener("click", (e) => {
        dropdown.style.display = "none";
        input.value = inputValue(item);
        fetchMoreData(item);
      });

      results.append(option);
    }
  };

  input.addEventListener("input", debounce(handleInput));

  function handleClick(e) {
    if (!root.contains(e.target)) {
      dropdown.style.display = "none";
    }
    // console.log(e.target);
  }

  document.addEventListener("click", handleClick);
};
