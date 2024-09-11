// test 
describe('Meal Search and Recipe App', () => {

    // Mocking the DOM elements for the test cases
    document.body.innerHTML = `
        <input type="text" id="search-input" />
        <button id="search-btn"></button>
        <div id="meal" class="meal-list"></div>
        <div class="meal-details-content"></div>
        <button id="recipe-close-btn"></button>
        <div class="header">
            <div class="flex">
                <div class="navbar"></div>
            </div>
        </div>
    `;

    const searchBtn = document.getElementById('search-btn');
    const mealList = document.getElementById('meal');
    const mealDetailsContent = document.querySelector('.meal-details-content');
    const recipeCloseBtn = document.getElementById('recipe-close-btn');
    const navbar = document.querySelector('.header .flex .navbar');
    const menuBtn = document.createElement('button');  // Mocking menu button
    
    // Mock function for fetch
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                meals: [
                    { idMeal: "12345", strMeal: "Pizza", strMealThumb: "pizza.jpg", strCategory: "Italian", strInstructions: "Bake it well.", strYoutube: "http://youtube.com" }
                ]
            }),
        })
    );

    // Test 1: Search button should trigger getMealList
    test('Clicking search button should fetch and display meals', async () => {
        document.getElementById('search-input').value = 'Seafood';
        
        searchBtn.addEventListener('click', getMealList);
        searchBtn.click();

        await fetch();

        expect(mealList.innerHTML).toContain('Pizza');
        expect(mealList.querySelector('.meal-item')).not.toBeNull();
    });

    // Test 2: No meals found should display notFound message
    test('No meals found should display notFound message', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ meals: null }),  // No meals
            })
        );

        searchBtn.click();

        await fetch();

        expect(mealList.innerHTML).toContain("Sorry, we didn't find any meal!");
        expect(mealList.classList.contains('notFound')).toBe(true);
    });

    // Test 3: Clicking recipe button should open recipe modal
    test('Clicking "Get Recipe" should open the recipe modal', async () => {
        mealList.innerHTML = `
            <div class="meal-item" data-id="12345">
                <div class="meal-name">
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
        `;
        const recipeBtn = mealList.querySelector('.recipe-btn');

        mealList.addEventListener('click', getMealRecipe);
        recipeBtn.click();

        await fetch();

        expect(mealDetailsContent.innerHTML).toContain('Pizza');
        expect(mealDetailsContent.parentElement.classList.contains('showRecipe')).toBe(true);
    });

    // Test 4: Closing recipe modal should hide it
    test('Clicking close button should hide the recipe modal', () => {
        recipeCloseBtn.click();


        expect(mealDetailsContent.parentElement.classList.contains('showRecipe')).toBe(false);
    });

    // Test 5: Toggling the navigation menu
    test('Clicking the menu button should toggle the navbar active class', () => {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        menuBtn.click();

        expect(navbar.classList.contains('active')).toBe(true);
    });
});
