const apiKey = "THESg9A5h66o7cvIAm9HRpNySrGJBdlPoyEExLMN";
const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=code&limit=10&tags=JavaScript`;

const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const feedback = document.querySelector(".modal-content");
const timer = document.querySelector(".timer");

function createQuiz() {
  const quizBody = document.createElement("section");

  quizBody.innerHTML = `
      <section class="question">
        How do you find the number with the highest value of x and y?
      </section>

      <section class="options">
        <div class="option-a">
          <button type="submit">A) ceil(x, y)</button>
        </div>

        <div class="option-b">
          <button type="submit">B) Math.ceil(x, y)</button>
        </div>

        <div class="option-c">
          <button type="submit">C) top(x, y)</button>
        </div>

        <div class="option-d">
          <button type="submit">D) Math.max(x, y)</button>
        </div>
      </section>
    `;

  container.append(quizBody);
}

createQuiz();

const questionText = document.querySelector(".question");
const optionA = document.querySelector(".option-a button");
const optionB = document.querySelector(".option-b button");
const optionC = document.querySelector(".option-c button");
const optionD = document.querySelector(".option-d button");
const scoreBody = document.querySelector(".score");

let correctAnswer = "";
let score = 0;

//Display question
function handleQuiz(response) {
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
      modal.style.display = "flex";
      feedback.textContent = "Yayy, correct!";
      feedback.style.backgroundColor = "#00FF00";
      score++
      scoreBody.innerHTML = score;
    } else {
      modal.style.display = "flex";
      feedback.textContent = "Oof, wrong!";
      feedback.style.backgroundColor = "#FF0000";
    }

    console.log(score);

    setTimeout(() => {
      modal.style.display = "none";

      // Move to next question after a delay
      setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
          setQuiz(currentQuestionIndex);
        } else {
          alert("Quiz completed!");
          // You might want to handle completion logic here
        }
      }, 500); // Adjust the delay as needed
    }, 2000);
  };
}

let seconds = 60;
const handleTimer = setInterval(() => {
  seconds--;
  timer.textContent = seconds;
  if (seconds === 0) {
    seconds = 60;
  } else if (seconds <= 15) {
    timer.style.color = "red";
  }
}, 1000);

axios
  .get(apiUrl)
  .then((response) => {
    // setQuiz(response);
    handleQuiz(response);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
