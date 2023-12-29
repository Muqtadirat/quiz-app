const apiKey = "THESg9A5h66o7cvIAm9HRpNySrGJBdlPoyEExLMN";
const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=code&limit=20&tags=JavaScript`;

const container = document.querySelector(".container");
const viewRulesButton = document.querySelector("#start-button");
const cancelQuizButton = document.querySelector(".cancel-quiz");

viewRulesButton.addEventListener("click", function () {
  document.querySelector("#rules").style.display = "flex";
  viewRulesButton.style.display = "none";
});

cancelQuizButton.addEventListener("click", function () {
  document.querySelector("#rules").style.display = "none";
  viewRulesButton.style.display = "block";
});

function startQuiz() {
  document.querySelector("#rules").style.display = "none";

  createQuiz();
  // handleTimer();

  axios
    .get(apiUrl)
    .then((response) => {
      handleQuiz(response);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function createQuiz() {
  const quizBody = document.createElement("section");

  quizBody.innerHTML = `
      <section class="question">
     
      </section>

      <section class="options">
        <div class="option-a">
          <button type="submit"></button>
        </div>

        <div class="option-b">
          <button type="submit"></button>
        </div>

        <div class="option-c">
          <button type="submit"></button>
        </div>

        <div class="option-d">
          <button type="submit"></button>
        </div>
      </section>
    `;

  container.append(quizBody);
}

//Display question
function handleQuiz(response) {
  const feedbackModal = document.querySelector(".feedback-modal");
  const feedback = document.querySelector(".modal-content");
  const questionText = document.querySelector(".question");
  const optionA = document.querySelector(".option-a button");
  const optionB = document.querySelector(".option-b button");
  const optionC = document.querySelector(".option-c button");
  const optionD = document.querySelector(".option-d button");
  const scoreBody = document.querySelector(".score");

  let correctAnswer = "";
  let score = 0;
  let currentQuestionIndex = 0;
  const questions = response.data;

  const setQuiz = (index) => {
    const currentQuestion = questions[index];

    questionText.textContent = `${currentQuestion.question}`;
    optionA.textContent = `A) ${currentQuestion.answers.answer_a}`;
    optionB.textContent = `B) ${currentQuestion.answers.answer_b}`;
    optionC.textContent = `C) ${currentQuestion.answers.answer_c}`;
    optionD.textContent = `D) ${currentQuestion.answers.answer_d}`;

    for (const key in currentQuestion.correct_answers) {
      if (currentQuestion.correct_answers[key] === "true") {
        correctAnswer = key;
        break;
      }
    }
  };

  setQuiz(currentQuestionIndex);

  optionA.addEventListener("click", () => {
    checkAnswer("answer_a_correct");
  });
  optionB.addEventListener("click", () => {
    checkAnswer("answer_b_correct");
  });
  optionC.addEventListener("click", () => {
    checkAnswer("answer_c_correct");
  });
  optionD.addEventListener("click", () => {
    checkAnswer("answer_d_correct");
  });

  //user feedback for answers
  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      feedbackModal.style.display = "flex";
      feedback.textContent = "Yayy, correct!";
      feedback.style.backgroundColor = "#00FF00";
      score++;
      scoreBody.innerHTML = score;
    } else {
      feedbackModal.style.display = "flex";
      feedback.textContent = "Oof, wrong!";
      feedback.style.backgroundColor = "#FF0000";
    }

    setTimeout(() => {
      feedbackModal.style.display = "none";

      // Move to next question after a delay
      setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex <= 15) {
          setQuiz(currentQuestionIndex);
        } else {
          alert("Quiz completed!");
        }
      }, 500);
    }, 1500);
  };
}

let minutes = 4;
let seconds = 60;
const timerDisplay = document.querySelector(".timer");

const handleTimer = setInterval(() => {
  seconds--;
  timerDisplay.textContent = `${minutes}:${seconds}`;
  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else if (minutes === 0 && seconds <= 60) {
    timerDisplay.style.color = "red";
  }
}, 1000);

document.querySelector(".start-quiz").addEventListener("click", startQuiz);
