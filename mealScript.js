document.addEventListener("DOMContentLoaded", function () {
    const  recipeWidget = document.getElementById("recipe-widget-container");
    const recipeWidgetMeal = document.getElementById("recipe-widget-location");
    const mealSelector = document.getElementById("mealSelector");
    //mealSelector.style.display = "block";
    function fetchMealData(mealType) {
        const apiEndpoint = `https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&instructionsRequired=true&apiKey=ce759d289b30487eaf452def3a055565`;
        console.log("Fetching meal data from:", apiEndpoint);

        fetch(apiEndpoint) //Initiates a network request to the URL specified by apiEndpoint.
        //returns a promise. This promise resolves to the response to that request.
            .then(response => response.json()) // Processes the response from the initial fetch request.
            .then(data => {
                console.log("Meal data received:", data);
                // Extract titles from the results array
                const titles = data.results.map(recipe => recipe.title);
                const images = data.results.map(recipe => recipe.image);

                // Select the container where the titles and images will be displayed
                const recipeList = document.getElementById('recipeList');

                // Clear previous recipes
                recipeList.innerHTML = '';

                // Log the first three titles and their corresponding images
                titles.slice(0, 10).forEach((title, index) => {
                    // Create a new div element for each recipe
                    const recipeDiv = document.createElement('div');
                    recipeDiv.classList.add('recipe');
                    // Create a new paragraph element for the title
                    const p = document.createElement('p');
                    p.textContent = `Recipe ${index + 1}: ${title}`;
                    // Create a new image element for the image
                    const img = document.createElement('img');
                    img.src = images[index];
        

                    // Append the paragraph and image to the recipe div
                    recipeDiv.appendChild(p);
                    recipeDiv.appendChild(img);

                    recipeDiv.addEventListener('click', () => {
                        //toTest
                        recipeList.style.display = 'none';
                        document.getElementById('recipeTitle').textContent = title;
                        document.getElementById('recipeImage').src = images[index];
                        //document.getElementById('recipeInstructions').textContent = recipe.instructions;
                        document.getElementById('myModal').style.display = 'block';
                    })
                       


                    // Append the recipe div to the recipe list container
                    recipeList.appendChild(recipeDiv);
                });
                //toTest
                // Modal close button functionality
                const modal = document.getElementById('myModal');
                const span = document.getElementsByClassName('close')[0];

                span.onclick = function() {
                    recipeList.style.display = 'flex' ;
                    modal.style.display = 'none';
                }

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                }



            })
    }
    mealSelector.addEventListener("change", function () {
        const selectedMeal = mealSelector.value;
        fetchMealData(selectedMeal); 
    });

});
                                                                           