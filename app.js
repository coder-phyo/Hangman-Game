let programming_languages = [
  "PYTHON",
  "JAVASCRIPT",
  "JAVA",
  "CSHARP",
  "C",
  "CPLUS",
  "GO",
  "R",
  "SWIFT",
  "PHP",
];

let keyboards = document.getElementById("keyboards");

let chance = 6;
let picStatus = 0;
let answer = "";
let wordStatus = null;
let guessedAnswer = [];

// button generate
function showKey() {
  keyboards.innerHTML = "";
  let keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
    keyboards.innerHTML += `<button class="btn btn-outline-secondary m-2" id="${letter}" onclick="checkAnswer('${letter}')">${letter}</button>`;
  });
}

// answer generate
function generate_answer() {
  answer = programming_languages[Math.floor(Math.random() * 10)];
  console.log(answer);
}

// answer field function
function show_answerField() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessedAnswer.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  document.getElementById("answer_field").innerHTML = wordStatus;
}
// show chance
function show_chance() {
  document.getElementById("chance").innerText = chance;
}

// check answer
function checkAnswer(letter) {
  guessedAnswer.indexOf(letter) === -1 ? guessedAnswer.push(letter) : null;
  document.getElementById(letter).setAttribute("disabled", "true");

  if (answer.indexOf(letter) >= 0) {
    show_answerField();
    setTimeout(checkWin, 200);
  } else if (answer.indexOf(letter) === -1) {
    chance--;
    picStatus++;
    checkHangMan();
    show_chance();
    setTimeout(checkLose, 500);
  }
}

// lose or win start
function checkWin() {
  if (wordStatus === answer) {
    Swal.fire({
      title: "Congratulations!",
      text: "You won the game",
      imageUrl: "./images/Congratulations.gif",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Play Again",
    }).then((_) => restart());
  }
}

function checkLose() {
  if (chance === 0) {
    Swal.fire({
      title: "You lose the game!",
      text: "Answer is " + answer,
      imageUrl: "./images/lost.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Play Again",
    }).then((_) => restart());
  }
}
// lose or win end

// check hangman
function checkHangMan() {
  document.getElementById("hangman").src = `images/${picStatus}.jpg`;
}
// restart game
function restart() {
  chance = 6;
  answer = "";
  wordStatus = null;
  guessedAnswer = [];
  picStatus = 0;
  document.getElementById("hangman").src = `images/${picStatus}.jpg`;
  generate_answer();
  show_answerField();
  show_chance();
  showKey();
}

generate_answer();
show_answerField();
show_chance();
showKey();
