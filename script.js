let currentQuestion = 0;
let score = 0;
let timer;

function loadQuestions() {
  const storedQuestions = localStorage.getItem("questions");
  if (storedQuestions) {
    return JSON.parse(storedQuestions);
  } else {
    return [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 3,
      },
    ];
  }
}

let questions = loadQuestions();

function loadQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = questions
    .map(
      (q, i) => `
        <div>
            <h2>${q.question}</h2>
            ${q.options
              .map(
                (option, index) => `
                <div>
                    <input type="radio" name="answer${i}" value="${
                  index + 1
                }" id="option${i}-${index + 1}">
                    <label for="option${i}-${index + 1}">${option}</label>
                </div>
            `
              )
              .join("")}
        </div>
    `
    )
    .join("");
}

function startTimer(duration) {
  let time = duration,
    minutes,
    seconds;
  timer = setInterval(() => {
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    document.getElementById("time").innerText = `${minutes}:${seconds}`;
    if (--time < 0) {
      clearInterval(timer);
      calculateScore();
    }
  }, 1000);
}

function calculateScore() {
  questions.forEach((question, index) => {
    const selectedOption = document.querySelector(
      `input[name="answer${index}"]:checked`
    );
    if (selectedOption && parseInt(selectedOption.value) === question.correct) {
      score++;
    }
  });
  document.getElementById(
    "result"
  ).innerText = `Your score is ${score} out of ${questions.length}`;
  clearInterval(timer);
}

document.getElementById("submit").addEventListener("click", calculateScore);

window.onload = () => {
  loadQuiz();
  startTimer(60 * 5); // 5 minutes timer
};
