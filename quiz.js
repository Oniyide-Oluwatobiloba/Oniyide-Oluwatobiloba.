const quizData = [
    {
        question: "Your friend is having a bad day. You:",
        answers: [
            { text: "Send them a funny meme to cheer them up", type: "Entertainer" },
            { text: "Call them to talk and listen", type: "Listener" },
            { text: "Surprise them with a treat or gift", type: "Loyal" },
            { text: "Take them out for a spontaneous adventure", type: "Adventurous" }
        ]
    },
    {
        question: "Your ideal way to spend time with friends is:",
        answers: [
            { text: "Telling stories and cracking jokes", type: "Entertainer" },
            { text: "Having a deep, heart-to-heart conversation", type: "Listener" },
            { text: "Supporting each other during tough times", type: "Loyal" },
            { text: "Doing something bold and new together", type: "Adventurous" }
        ]
    },
    {
        question: "When your friend forgets your birthday, you:",
        answers: [
            { text: "Make a playful joke about it", type: "Entertainer" },
            { text: "Tell them how it made you feel", type: "Listener" },
            { text: "Forgive them right away", type: "Loyal" },
            { text: "Plan something fun together anyway", type: "Adventurous" }
        ]
    }
];

let currentQuestion = 0;
let selectedTypes = [];

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    document.getElementById("question").textContent = questionData.question;

    const answerButtons = document.querySelectorAll(".answer-btn");

    questionData.answers.forEach((answer, index) => {
        answerButtons[index].textContent = answer.text;
        answerButtons[index].dataset.type = answer.type;
        answerButtons[index].disabled = false;
    });

    document.getElementById("result").textContent = "";
    document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(index) {
    const answerButtons = document.querySelectorAll(".answer-btn");
    const selectedType = answerButtons[index].dataset.type;
    selectedTypes.push(selectedType);

    document.getElementById("result").textContent = `You chose: ${selectedType}`;
    answerButtons.forEach(button => button.disabled = true);
    document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const typeCounts = {};

    selectedTypes.forEach(type => {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    let resultType = null;
    let maxCount = 0;

    for (const type in typeCounts) {
        if (typeCounts[type] > maxCount) {
            maxCount = typeCounts[type];
            resultType = type;
        }
    }

    const resultDescriptions = {
        Entertainer: "You're the Entertainer! You bring laughter, energy, and positivity to every friendship.",
        Listener: "You're the Listener! Your friends count on you for deep talks and meaningful support.",
        Loyal: "You're the Loyal Friend! You’re always there, no matter what — dependable and true.",
        Adventurous: "You're the Adventurous Friend! You keep friendships exciting with spontaneity and bold ideas."
    };

    document.getElementById("quiz").innerHTML = `
        <h2>Your Friendship Style: ${resultType}</h2>
        <p>${resultDescriptions[resultType]}</p>
        <button onclick="restartQuiz()">Retake Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    selectedTypes = [];
    document.getElementById("quiz").innerHTML = `
        <div class="question-container">
            <span id="question">Question will appear here</span>
        </div>
        <div class="answers-container">
            <button class="answer-btn" onclick="checkAnswer(0)">Answer 1</button>
            <button class="answer-btn" onclick="checkAnswer(1)">Answer 2</button>
            <button class="answer-btn" onclick="checkAnswer(2)">Answer 3</button>
            <button class="answer-btn" onclick="checkAnswer(3)">Answer 4</button>
        </div>
        <div id="result"></div>
        <button id="next-btn" onclick="nextQuestion()">Next Question</button>
    `;
    loadQuestion();
}

loadQuestion();
