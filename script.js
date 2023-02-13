let selectedPizza;
let pizzaList = document.querySelector("#pizza-nav");
let pizzaImage = document.querySelector("#pizza-image");


fetch('http://localhost:3000/pizza')
    .then(response => response.json())
    .then(pizzaData => {
        createImage(pizzaData[0]);
        createPizzaList(pizzaData);
        // handleLikes();
    })


function createPizzaList(pizzaData) {
    pizzaData.forEach(item => {
        let li = document.createElement("li");
        let image = document.createElement("img");
        li.textContent = item.name;
        image.src = item.image;
        pizzaList.appendChild(li);
        li.appendChild(image);
        image.addEventListener("click", () => {
            createImage(item);
        })
    })
}
function createImage(pizzaData) {

    let selectedPizza = pizzaData;

    let image = document.querySelector("#pizza-image");
    let name = document.querySelector("#pizza-name");
    let likes = document.querySelector("#like-count");

    image.src = selectedPizza.image;
    name.textContent = selectedPizza.name;
    likes.textContent = selectedPizza.likes;
}




///// DARK MODE /////
let toggleButton = document.getElementById("toggle-dark-mode");

toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
///// END DARK MODE /////



///// LIKE BUTTON /////

function handleLike() {
    let likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', () => {
        if (selectedPizza.likes < 2000) {
            selectedPizza.likes++;
            likeButton.textContent = selectedPizza.likes;
        }
    })
}
