const apiKey = "THESg9A5h66o7cvIAm9HRpNySrGJBdlPoyEExLMN";
const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=code&limit=10&tags=JavaScript`;

const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const feedback = document.querySelector(".modal-content");

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

const question = document.querySelector(".question");
const optionA = document.querySelector(".option-a button");
const optionB = document.querySelector(".option-b button");
const optionC = document.querySelector(".option-c button");
const optionD = document.querySelector(".option-d button");
let correctAnswer = "";

const setQuiz = (response) => {
  for (const key in response.data[0].correct_answers) {
    if (response.data[0].correct_answers[key] === "true") {
      correctAnswer = key;
      break;
    }
  }

  //   correctAnswer = response.data[0].correct_answer;
  console.log(correctAnswer);
  question.textContent = `${response.data[0].question}`;

  optionA.textContent = `A) ${response.data[0].answers.answer_a}`;
  optionB.textContent = `B) ${response.data[0].answers.answer_b}`;
  optionC.textContent = `C) ${response.data[0].answers.answer_c}`;
  optionD.textContent = `D) ${response.data[0].answers.answer_d}`;
};

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
    alert("Correct");
  } else {
    modal.style.display = "flex";
    feedback.textContent = "Oof, wrong!";
    feedback.style.backgroundColor = "#FF0000";
  }

  console.log(selectedAnswer);
};

axios
  .get(apiUrl)
  .then((response) => {
    setQuiz(response);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
