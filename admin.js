document.getElementById("question-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const question = document.getElementById("question").value;
  const options = [
    document.getElementById("option1").value,
    document.getElementById("option2").value,
    document.getElementById("option3").value,
    document.getElementById("option4").value,
  ];
  const correct = parseInt(document.getElementById("correct").value);
  const newQuestion = { question, options, correct };

  let storedQuestions = localStorage.getItem("questions");
  if (storedQuestions) {
    storedQuestions = JSON.parse(storedQuestions);
  } else {
    storedQuestions = [];
  }
  storedQuestions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(storedQuestions));

  alert("Question added successfully!");
  document.getElementById("question-form").reset();
  window.location.href = "index.html"; // Redirect to quiz page
});
