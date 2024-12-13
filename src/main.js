
// Ambil URL API TheMealDB
const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

// Elemen DOM
const recipeContainer = document.getElementById("recipeContainer");
const recipeTitle = document.querySelector(".recipe-title");
const recipeImage = document.querySelector(".recipe-image");
const recipeInstructions = document.querySelector(".recipe-instruction");
const getRecipeBtn = document.getElementById("getRecipeBtn");

// Fungsi untuk mengambil data resep
async function fetchRandomRecipe() {
  try {
    console.log("Fetching random recipe...");
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`); // Jika respon gagal
    }

    const data = await response.json();
    const recipe = data.meals[0];

    // Menampilkan data resep di halaman web
    displayRecipe(recipe);
  } catch (error) {
    console.error("Failed to fetch recipe:", error); // Menampilkan error di konsol
    displayError("Failed to load recipe. Please try again later."); // Menampilkan error di halaman web
  }
}

// Fungsi untuk menampilkan resep di halaman web
function displayRecipe(recipe) {
  recipeTitle.textContent = recipe.strMeal;

  // Gambar resep
  recipeImage.src = recipe.strMealThumb;
  recipeImage.alt = recipe.strMeal;
  recipeImage.style.width = "200px"; 
  recipeImage.style.height = "auto"; 


  // Agar insttruksi dipisah menjadi langkah-langkah
  recipeInstructions.textContent = ""; // Reset konten instruksi
  recipe.strInstructions.split(". ").forEach((step, index) => {
    if (step.trim()) {
      const stepElement = document.createElement("p");
      stepElement.textContent = `${index + 1}. ${step}`;
      recipeInstructions.appendChild(stepElement);
    }
  });

  // Tampilkan kontainer dan mengubah tombol menjadi "Refresh Recipe"
  recipeContainer.style.display = "block";
  getRecipeBtn.textContent = "Refresh Recipe";
}

// Fungsi untuk menangani error dan menampilkan pesan di halaman
function displayError(message) {
  recipeTitle.textContent = "Error";
  recipeImage.src = ""; // Menghapus gambar jika ada error
  recipeImage.alt = "No Image";
  recipeInstructions.textContent = message; // Menampilkan pesan error
}

// Event listener untuk tombol
getRecipeBtn.addEventListener("click", () => {
  fetchRandomRecipe();
});

