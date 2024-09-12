// Get elements from the DOM for search button, meal list, meal details, and close button
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners for searching meals, opening recipes, and closing the recipe modal
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// Fetches a list of meals based on the search input from TheMealDB API and displays it
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

   
  

// Fetches the detailed recipe for a selected meal and opens a modal to display it
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// Creates and displays a modal with the recipe details, including instructions and a YouTube link
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}


// Toggle the mobile navigation bar visibility when the menu button is clicked
let navbar = document.querySelector('.header .flex .navbar');

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
}


// Show account options when the user button is clicked

let account = document.querySelector('.api');

document.querySelector('#user-btn').onclick = () =>{
   account.classList.add('active');
}

// Hide user account options when the close button is clicked

document.querySelector('#close-account').onclick = () =>{
   account.classList.remove('active');
}


// Show a user calendar when the calendar button is clicked

let account1 = document.querySelector('.user-cal');

document.querySelector('#usercal-btn').onclick = () =>{
   account1.classList.add('active');
}

// Hide the user calendar when the close button is clicked

document.querySelector('#close-cal').onclick = () =>{
   account1.classList.remove('active');
}
// Initialize Bootstrap popovers for elements with the data-bs-toggle attribute
document.addEventListener('DOMContentLoaded', function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  });
// Show doctor when the doc button is clicked
 
let myOrders = document.querySelector('.DOC');

document.querySelector('#doc-btn').onclick = () =>{
   myOrders.classList.add('active');
}
// Hide doctor when the close button is clicked
document.querySelector('#close-doc').onclick = () =>{
   myOrders.classList.remove('active');
}

// Hide the navigation bar when the user scrolls the page
window.onscroll = () =>{
   navbar.classList.remove('active');

};
  // Calculater
function calculate() {
   const gender = document.getElementById('gender').value;
   const age = parseFloat(document.getElementById('age').value);
   const weight = parseFloat(document.getElementById('weight').value);
   const height = parseFloat(document.getElementById('height').value);

   if (isNaN(age) || isNaN(weight) || isNaN(height)) {
       alert('Please enter valid numbers for age, weight, and height.');
       return;
   }

   // Calculate BMI
   const heightInMeters = height / 100;
   const bmi = weight / (heightInMeters ** 2);

   // Calculate ideal weight
   const minIdealWeight = 20 * (heightInMeters ** 2);
   const maxIdealWeight = 23 * (heightInMeters ** 2);

   // Calculate daily calorie needs using Harris-Benedict equation
   let bmr;
   if (gender === 'male') {
       bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
   } else {
       bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
   }

   // Assuming a sedentary lifestyle for simplicity (BMR * 1.2)
   const dailyCalories = bmr * 1.2;

   const resultDiv = document.getElementById('result');
   resultDiv.innerHTML = `
       <p>Your BMI is: ${bmi.toFixed(2)}</p>
       <p>Your ideal weight range is between ${minIdealWeight.toFixed(2)} kg and ${maxIdealWeight.toFixed(2)} kg.</p>
       <p>Your daily calorie needs are approximately ${dailyCalories.toFixed(0)} calories.</p>
   `;
}
