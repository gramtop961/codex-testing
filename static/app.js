const searchInput = document.getElementById("ingredient-query");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");

const createList = (items) => {
  if (!items || items.length === 0) {
    return "<p class=\"muted\">Not specified.</p>";
  }

  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
};

const createResultCard = (ingredient) => {
  const synonyms = ingredient.synonyms?.length ? ingredient.synonyms.join(", ") : "No common synonyms listed";

  return `
    <article class="result-card">
      <div class="tagline">Label insight</div>
      <h2>${ingredient.name}<span>${synonyms}</span></h2>
      <p>${ingredient.description}</p>
      <div>
        <h3>Typical uses</h3>
        ${createList(ingredient.common_uses)}
      </div>
      <div>
        <h3>Dietary notes</h3>
        <p>${ingredient.dietary_notes}</p>
      </div>
      <div>
        <h3>Possible allergens</h3>
        <p>${ingredient.possible_allergens}</p>
      </div>
      <div>
        <h3>Origin</h3>
        <p>${ingredient.origin}</p>
      </div>
    </article>
  `;
};

const setStatus = (message, type = "empty") => {
  resultsContainer.innerHTML = `<div class="${type}">${message}</div>`;
};

const fetchIngredients = async (query) => {
  try {
    const params = new URLSearchParams();
    if (query) {
      params.set("query", query);
    }

    const response = await fetch(`/api/ingredients?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Unable to retrieve ingredients");
    }

    const data = await response.json();

    if (!data.length) {
      setStatus("No ingredients matched your search. Try a different term.", "empty");
      return;
    }

    resultsContainer.innerHTML = data.map(createResultCard).join("");
  } catch (error) {
    setStatus("Something went wrong. Please try again later.", "error");
    console.error(error);
  }
};

const handleSearch = () => {
  const query = searchInput.value.trim();
  if (!query) {
    setStatus("Type an ingredient name or code to get started.");
    fetchIngredients("");
    return;
  }

  setStatus("Searching...");
  fetchIngredients(query);
};

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  fetchIngredients("");
});
