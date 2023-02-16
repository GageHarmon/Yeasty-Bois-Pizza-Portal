let selectedPizza;
let pizzaList = document.querySelector("#pizza-nav");
let pizzaFeature = document.querySelector("#pizza-feature");
let pizzaImage = document.querySelector("#pizza-image");
let reviewButton = document.getElementById('open-review-button');
let reviewBox = document.getElementById('review-box');
let form = document.querySelector('#pizza-review-form');
let cardList = document.querySelector('#comment-list');

// Fetch pizza data and create slide show

fetch('http://localhost:3000/pizza')
    .then(response => response.json())
    .then(pizzaData => {
        createSlideShow(pizzaData);
        openSubmitBox();
        addNewPizza();
        addNewPizzaImage();
        addNewPizzaFeature();
    });

// Define function to create slide show
function createSlideShow(pizzaData) {
    pizzaData.forEach(item => {
        let pizzaImage = document.createElement('img');
        pizzaImage.src = item.image;
        pizzaList.appendChild(pizzaImage);
        pizzaImage.addEventListener('click', () => {
            updateDisplayedPizza(item);
        });
        // pizzaImage.addEventListener('mouseover', () => {
        //     pizzaImage.style.transform = 'scale(1.5)';
        // });

        // pizzaImage.addEventListener('mouseout', () => {
        //     pizzaImage.style.transform = 'scale(1.0)';
        // });
    });
    updateDisplayedPizza(pizzaData[0]);
};

function updateDisplayedPizza(pizzaData) {
    selectedPizza = pizzaData;

    let pizzaDisplayImage = document.querySelector("#pizza-image")
    let pizzaDisplayName = document.querySelector("#pizza-name");
    let pizzaDisplayFeature = document.querySelector("#pizza-feature")

    pizzaDisplayImage.src = selectedPizza.image;
    pizzaDisplayName.textContent = selectedPizza.name;
    pizzaDisplayFeature.textContent = `Known for ${selectedPizza.feature}`;
}



///// DARK MODE /////

let toggleButton = document.querySelector("#checkbox");

toggleButton.addEventListener('click', function () {
    document.body.classList.toggle("dark-mode");
});
///// END DARK MODE /////



/// UPDATE PIZZA BOX //////
function addNewPizza() {
    let newPizzaForm = document.querySelector('#new-pizza-form');
    newPizzaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        selectedPizza.name = event.target['pizza-name-input'].value;
        updateDisplayedPizza(selectedPizza);
    });
}

function addNewPizzaImage() {
    let newPizzaForm = document.querySelector("#new-pizza-form");
    newPizzaForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let pizzaImage = document.createElement("img");
        pizzaImage.src = event.target['pizza-image-input'].value;
        pizzaList.appendChild(pizzaImage);
        selectedPizza.image = event.target['pizza-image-input'].value;
        updateDisplayedPizza(selectedPizza);
    })
}

function addNewPizzaFeature() {
    let newPizzaForm = document.querySelector('#new-pizza-form');
    newPizzaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        selectedPizza.feature = event.target['pizza-feature-input'].value;
        updateDisplayedPizza(selectedPizza);
    });
}


///// OPEN REVIEW BUTTON /////

function openSubmitBox() {
    let reviewButton = document.getElementById('open-submit-button');
    let reviewBox = document.getElementById('review-box');
    let isOpen = false; // track whether the review box is currently open or not

    reviewButton.addEventListener('click', () => {
        if (isOpen) {
            reviewBox.style.display = 'none'; // hide the review box if it's currently open
            isOpen = false;
        } else {
            reviewBox.style.display = 'block'; // show the review box if it's currently closed
            isOpen = true;
        }
    });
}


