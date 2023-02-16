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
        // handleLikes();
        handleComment();
        openReviewBox();
    });

// Define function to create slide show
function createSlideShow(pizzaData) {
    selectedPizza = pizzaData;
    let pizzaName = document.getElementById('pizza-name');
    // let prevButton = document.getElementById('prev-pizza');
    // let nextButton = document.getElementById('next-pizza');

    let currentPizzaIndex = 0;


    // prevButton.addEventListener('click', () => {
    //     currentPizzaIndex = (currentPizzaIndex - 1 + pizzaData.length) % pizzaData.length;
    //     updateDisplayedPizza();
    // });

    // nextButton.addEventListener('click', () => {
    //     currentPizzaIndex = (currentPizzaIndex + 1) % pizzaData.length;
    //     updateDisplayedPizza();
    // });

    pizzaData.forEach(pizza => {
        let image = document.createElement('img');
        image.src = pizza.image;

        pizzaList.appendChild(image);

        image.addEventListener('click', () => {
            currentPizzaIndex = pizzaData.indexOf(pizza);

            updateDisplayedPizza();
        });

        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.5)';
        });

        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1.0)';
        });
    });

    function updateDisplayedPizza() {
        let pizza = pizzaData[currentPizzaIndex];
        pizzaImage.src = pizza.image;
        pizzaName.textContent = pizza.name;
        pizzaFeature.textContent = pizza.feature;
    }

    updateDisplayedPizza();
}



///// DARK MODE /////

let toggleButton = document.querySelector("#checkbox");

toggleButton.addEventListener('click', function () {
    document.body.classList.toggle("dark-mode");
});
///// END DARK MODE /////



///// LIKE BUTTON /////
//  #1 (with PUT) //
// function handleLikes() {
//     const likeButton = document.getElementById('like-button');
//     likeButton.addEventListener('click', () => {
//         selectedPizza.likes += 1; // Increment the likes property of the selected pizza by one
//         fetch('http://localhost:3000/pizza', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selectedPizza) // Update the db.json object with the new pizza data
//         });
//     });
// }

//  #2 (OG) //
// function handleLikes() {
//     selectedPizza = pizzaData;
//     let likeCount = document.querySelector("#like-count");
//     let likeButton = document.querySelector('#like-button');
//     likeButton.addEventListener('click', () => {
//         if (selectedPizza.likes < 2000) {
//             selectedPizza.likes++;
//             likeCount.textContent = selectedPizza.likes;
//         }
//     })
// }
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
        form.reset();
    });
}


///// OPEN REVIEW BUTTON /////

function openReviewBox() {
    let reviewButton = document.getElementById('open-review-button');
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


