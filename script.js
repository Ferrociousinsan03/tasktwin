
const responseBox = document.getElementById("response");
const charCount = document.getElementById("char-count");
const submitButton = document.getElementById("submit-response");
const feedback = document.getElementById("feedback");
const scoreValue = document.getElementById("score-value");
const feedbackSummary = document.getElementById("feedback-summary");
const tryAgainButton = document.getElementById("try-again");

responseBox.addEventListener("input", () => {
  charCount.textContent = `${responseBox.value.length} / 500`;
});

submitButton.addEventListener("click", () => {
  const answer = responseBox.value.trim();

  if (answer.length < 10) {
    alert("Please write a little more before submitting your response.");
    responseBox.focus();
    return;
  }

  const lowerAnswer = answer.toLowerCase();

  const empathyWords = [
    "sorry",
    "apologize",
    "understand",
    "frustrat",
    "inconvenience",
    "disappoint"
  ];

  const actionWords = [
    "check",
    "investigate",
    "look into",
    "contact",
    "resolve",
    "help",
    "track"
  ];

  const clarityWords = [
    "update",
    "time",
    "today",
    "tomorrow",
    "within",
    "confirm",
    "status"
  ];

  const hasEmpathy = empathyWords.some(word =>
    lowerAnswer.includes(word)
  );

  const hasAction = actionWords.some(word =>
    lowerAnswer.includes(word)
  );

  const hasClarity = clarityWords.some(word =>
    lowerAnswer.includes(word)
  );

  let score = 50;

  if (hasEmpathy) score += 15;
  if (hasAction) score += 20;
  if (hasClarity) score += 15;

  score = Math.min(score, 100);

  scoreValue.textContent = score;

  if (score >= 85) {
    feedbackSummary.textContent =
      "Strong response! You showed empathy, took ownership and communicated a clear next step.";
  } else if (score >= 65) {
    feedbackSummary.textContent =
      "Good effort! You addressed some important parts of the situation. Try making your next action more specific.";
  } else {
    feedbackSummary.textContent =
      "Good start! Try acknowledging the customer's frustration, explaining what you will do and giving a clear update.";
  }

  feedback.hidden = false;
  feedback.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});

tryAgainButton.addEventListener("click", () => {
  responseBox.value = "";
  charCount.textContent = "0 / 500";
  feedback.hidden = true;
  responseBox.focus();
});
