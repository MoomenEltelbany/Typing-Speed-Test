// Capturing all the elements
let defaultLevel = document.querySelector(".lvl");
let defaultSeconds = document.querySelector(".seconds");
let levelChoiceArray = document.querySelectorAll(".lvl-choice div");
let startBtn = document.querySelector(".start");
let chosenWord = document.querySelector(".the-word");
let inputWord = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".got");
let wholeLengthOfWords = document.querySelector(".total");
let finishDiv = document.querySelector(".finish");
let restartBtn = document.querySelector(".restart");

// Array of Words
const easyWords = [
    "Hello",
    "Code",
    "Town",
    "Github",
    "Python",
    "Scala",
    "Job",
    "Funny",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Web",
    "Name",
];

const mediumWords = [
    "Playing",
    "Working",
    "Paradigm",
    "Testing",
    "Javascript",
    "Styling",
    "Youtube",
    "Linkedin",
    "Leetcode",
    "Internet",
    "Country",
    "Twitter",
    "Cascade",
    "Coding",
    "Function",
];

const difficultWords = [
    "Programming",
    "Destructuring",
    "Documentation",
    "Dependencies",
    "Equipment",
    "Communication",
    "Mentorship",
    "Telegraph",
    "Internship",
    "Hibernation",
    "Hazardous",
    "Endoscope",
    "Illusionist",
    "Obligation",
    "Information",
];

// Defining the difficulty of the game
let choiceObject = {
    Easy: 6,
    Medium: 4,
    Difficult: 3,
};

// Default values for the difficulty of the game
defaultLevel.innerHTML = "Medium";
defaultSeconds.innerHTML = "4";

// Customizing the active class based on the choice of the user and adding those values inside the div in a dynamic way + deciding which array we will use to play based on the input of the user
levelChoiceArray.forEach((element) => {
    element.onclick = () => {
        levelChoiceArray.forEach((element) => {
            element.classList.remove("active");
        });
        element.classList.add("active");
        defaultLevel.innerHTML = element.innerHTML;
        defaultSeconds.innerHTML = choiceObject[element.innerHTML];
    };
});

// Function of start playing
startBtn.onclick = () => {
    // Remove the start button from the page
    startBtn.remove();
    // Focus on the input where the user will type the word
    inputWord.focus();
    // A check to see which array we will work with and this is based on the difficulty level that the user will choose
    if (defaultLevel.innerHTML === "Easy") {
        wholeLengthOfWords.innerHTML = easyWords.length;

        generateWords(easyWords);
    } else if (defaultLevel.innerHTML === "Medium") {
        wholeLengthOfWords.innerHTML = mediumWords.length;
        generateWords(mediumWords);
    } else {
        wholeLengthOfWords.innerHTML = difficultWords.length;
        generateWords(difficultWords);
    }
};

// A function to generate random words
let generateWords = (array) => {
    // To remove the inner text inside the div where we will show the array of words
    upcomingWords.innerHTML = "";

    if (array.length > 0) {
        // Show a random word for the user to type
        let randomWordValue = array[Math.floor(Math.random() * array.length)];
        chosenWord.innerHTML = randomWordValue;

        // Remove the shown word from the array
        array.splice(array.indexOf(randomWordValue), 1);

        // A for loop to show the whole array for the user
        for (let i = 0; i < array.length; i++) {
            let div = document.createElement("div");
            div.appendChild(document.createTextNode(array[i]));
            upcomingWords.appendChild(div);
        }
    } else {
        const congratDiv = document.createElement("div");
        congratDiv.className = "good";
        congratDiv.appendChild(
            document.createTextNode(
                "Congratulations. You are a master at your game"
            )
        );
        finishDiv.prepend(congratDiv);
        restartBtn.style.display = "block";
    }
    countTime(defaultSeconds.innerHTML);
};

// Function to start counting the time based on the difficulty level, that is why I added the level as a parameter because based on it will appear the counting
let countTime = () => {
    if (scoreGot.innerHTML === `0`) {
        timeLeft.innerHTML = +defaultSeconds.innerHTML + 3;
    } else {
        timeLeft.innerHTML = defaultSeconds.innerHTML;
    }
    let counter = setInterval(() => {
        timeLeft.innerHTML--;
        if (timeLeft.innerHTML === "0") {
            clearInterval(counter);
            if (
                chosenWord.innerHTML.toLowerCase() ===
                inputWord.value.toLowerCase()
            ) {
                inputWord.value = "";
                scoreGot.innerHTML++;
                // This we use to generate words from the array that the user chose in the beginning of the game
                decideDiff(defaultLevel.innerHTML);
            } else {
                restart();
                restartBtn.style.display = "block";
            }
        }
    }, 1000);
};

// Here its the restart div when the game is over
let restart = () => {
    let gameOverDiv = document.createElement("div");
    gameOverDiv.className = "bad";
    gameOverDiv.appendChild(document.createTextNode("Game Over"));
    finishDiv.prepend(gameOverDiv);
};

// Once we click the button, we will reload the page
restartBtn.onclick = () => {
    window.location.reload();
};

// A function to decide the difficulty of the game so that we can take the course of actions needed
let decideDiff = (value) => {
    if (value === "Easy") {
        generateWords(easyWords);
    } else if (value === "Medium") {
        generateWords(mediumWords);
    } else {
        generateWords(difficultWords);
    }
};
