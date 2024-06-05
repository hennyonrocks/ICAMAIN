const questions = [
    {
        question: "Which architectural style is characterized by soaring spires and intricate stone carvings?",
        answers: [
            { text: "Gothic", correct: true },
            { text: "Baroque", correct: false },
            { text: "Renaissance", correct: false }
        ]
    },
    {
        question: "What is the nickname of the Dancing House in Prague?",
        answers: [
            { text: "Fred and Ginger", correct: true },
            { text: "Tom and Jerry", correct: false },
            { text: "Romeo and Juliet", correct: false }
        ]
    },
    {
        question: "Which river does the Charles Bridge span?",
        answers: [
            { text: "Danube", correct: false },
            { text: "Vltava", correct: true },
            { text: "Elbe", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");

function showQuestion(question) {
    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="answers">
            ${question.answers.map((answer, index) => `
                <div class="answer" data-correct="${answer.correct}" onclick="selectAnswer(this)">${answer.text}</div>
            `).join('')}
        </div>
    `;
}

function selectAnswer(element) {
    const correct = element.getAttribute("data-correct") === "true";
    if (correct) score++;
    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach(answerElement => {
        answerElement.classList.add(answerElement.getAttribute("data-correct") === "true" ? "correct" : "wrong");
        answerElement.onclick = null;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
    nextButton.style.display = "none";
});

function showResult() {
    questionContainer.innerHTML = `
        <div class="result">You scored ${score} out of ${questions.length}!</div>
    `;
}

showQuestion(questions[currentQuestionIndex]);
nextButton.style.display = "none";

// Animation for articles
document.addEventListener("DOMContentLoaded", function() {
    const animatedElements = document.querySelectorAll(".animated");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
