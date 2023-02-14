let selectedPizza;
let pizzaList = document.querySelector("#pizza-nav");
let pizzaImage = document.querySelector("#pizza-image");


fetch('http://localhost:3000/pizza')
    .then(response => response.json())
    .then(pizzaData => {
        createImage(pizzaData[0]);
        createPizzaList(pizzaData);
        handleLikes();
        // handleWebsite();
        handleMouseOver();
    })


function createPizzaList(pizzaData) {
    pizzaData.forEach(item => {
        let li = document.createElement("li");
        let image = document.createElement("img");
        li.textContent = item.name;
        image.src = './images/Pepperoni.jpeg';
        pizzaList.appendChild(li);
        li.appendChild(image);
        image.addEventListener("click", () => {
            createImage(item);
        })
        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.5)';
        });
        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1.0)';
        });
    })
}

function createImage(pizzaData) {

    selectedPizza = pizzaData;

    let image = document.querySelector("#pizza-image");
    let name = document.querySelector("#pizza-name");
    let likes = document.querySelector("#like-count");
    let bestFeature = document.querySelector(".best-feature");
    let websiteUrl = document.querySelector("#website-url");

    image.src = selectedPizza.image;
    name.textContent = selectedPizza.name;
    likes.textContent = selectedPizza.likes;
    bestFeature.textContent = selectedPizza.feature;
    websiteUrl.textContent = selectedPizza.website;
}




///// DARK MODE /////

let toggleButton = document.querySelector("#checkbox");

toggleButton.addEventListener('click', function () {
    document.body.classList.toggle("dark-mode");
});
///// END DARK MODE /////



///// LIKE BUTTON /////

function handleLikes() {
    let likeButton = document.querySelector('#like-button');
    let likeCount = document.querySelector('#like-count');
    likeButton.addEventListener('click', () => {
        if (selectedPizza.likes < 2000) {
            selectedPizza.likes++;
            likeCount.textContent = selectedPizza.likes;
        }
    })
}
///// END LIKE BUTTON /////


///// WEBSITE BUTTON /////
// function handleWebsite() {
//     let websiteButton = document.querySelector('#website-button');
//     websiteButton.addEventListener('click', () => {
//         window.open(selectedPizza.website);
//     })
// }


///// MOUSEOVER FUNCTIONS /////

function handleMouseOver() {
    let liImage = document.querySelector("li img");
    liImage.addEventListener('mouseover', () => {
        liImage.style.transform = 'scale(2.0)';
    });
    liImage.addEventListener('mouseout', () => {
        liImage.style.transform = 'scale(1.0)';
    });
}
///// END MOUSEOVER FUNCTIONS /////
