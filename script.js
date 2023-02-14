let selectedPizza;
let pizzaList = document.querySelector("#pizza-nav");
let pizzaImage = document.querySelector("#pizza-image");
let reviewButton = document.getElementById('open-review-button');
let reviewBox = document.getElementById('review-box');
let form = document.querySelector('#pizza-review-form');
let cardList = document.querySelector('#comment-list');


fetch('http://localhost:3000/pizza')
    .then(response => response.json())
    .then(pizzaData => {
        createImage(pizzaData[0]);
        createPizzaList(pizzaData);
        openReviewBox();
        handleLikes();
        handleComment();
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
    let likeCount = document.querySelector("#like-count");
    let likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', () => {
        if (selectedPizza.likes < 2000) {
            selectedPizza.likes++;
            likeCount.textContent = selectedPizza.likes;
        }
    })
}
///// END LIKE BUTTON /////


/// COMMENT BOX //////
function handleComment() {
    let form = document.querySelector('form');
    let commentList = document.querySelector('#comment-list');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent the form from submitting normally
        let li = document.createElement('li');
        li.textContent = event.target['pizza-review-input'].value;
        commentList.appendChild(li);
    });
}



///// OPEN REVIEW BUTTON /////

function openReviewBox() {
    let reviewButton = document.getElementById('open-review-button');
    let reviewBox = document.getElementById('review-box');
    reviewButton.addEventListener('click', () => {
        reviewBox.style.display = 'block';
    });
}

