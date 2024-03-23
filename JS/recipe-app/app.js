const meals = document.getElementById("meals");

getRandomMeal()

async function getRandomMeal(){
    const resp =  await fetch("https://www.themealdb.com/api/json/v1/1/random.php"); //search a random meal

    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    console.log(randomMeal, true);

    addMeal(randomMeal, true);
}

async function getMealById(id){
    const mealId = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772" +id); // search by id
}

async function getMealsBySearch(term){
    const mealName = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata" +term); //search by name
}

function addMeal(mealData, random = false){

    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = 
    `
        <div class="meal-header">
        ${random ? `
        <span class="random"> Recipe </span>` : ""}

            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>

            </div>

            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-meal-btn">
                    <i class="fas fa-heart"></i>  
                </button>
            </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-meal-btn");
    
    btn.addEventListener('click', () => {
        if(btn.classList.contains("active")){
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        }else{
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }

    });

    meals.appendChild(meal);
}

function addMealLS(mealId){
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId){
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}