const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    searchRecipes(query);
  }
});

async function searchRecipes(query) {
  resultsDiv.innerHTML = `<p>Loading recipes...</p>`;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();

  if (data.meals) {
    displayMeals(data.meals);
  } else {
    resultsDiv.innerHTML = `<p>No recipes found for "${query}". Try something else!</p>`;
  }
}

function displayMeals(meals) {
  resultsDiv.innerHTML = '';
  meals.forEach(meal => {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');
    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
      <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
    `;
    resultsDiv.appendChild(mealCard);
  });
}
