document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitButton = document.getElementById('submit-btn');
    const scoreContainer = document.getElementById('score-container');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');
    const leaderboardList = document.getElementById('leaderboard-list');
    const newsletterForm = document.getElementById('newsletter-form');
    const timerElement = document.getElementById('timer');

    let currentCategory = '';
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    const questions = {
        science: [
            { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], correct: 0 },
            { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 }
        ],
        history: [
            { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
            { question: "In which year did World War II end?", options: ["1945", "1939", "1918", "1963"], correct: 0 }
        ],
        math: [
            { question: "What is 5 + 3?", options: ["5", "8", "10", "15"], correct: 1 },
            { question: "What is the square root of 16?", options: ["2", "4", "8", "16"], correct: 1 }
        ],
        general: [
            { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], correct: 2 },
            { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 }
        ]
    };

    function startQuiz(category) {
        currentCategory = category;
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('quiz-section').classList.remove('hidden');
        document.getElementById('categories').classList.add('hidden');
        startTimer(60);
        questions[currentCategory].sort(() => Math.random() - 0.5);
        loadQuestion();
    }

    // Smooth Scrolling
    function scrollToSection(sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }

    // Category Selection
    function selectCategory(category) {
        localStorage.setItem("quizCategory", category);
        window.location.href = "quiz.html";
    }

    // Progress Bar Logic
    function updateProgressBar() {
        const progress = document.getElementById('progress');
        const totalQuestions = questions[currentCategory].length;
        const progressWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        progress.style.width = `${progressWidth}%`;
    }

    // Call updateProgressBar() after loading each question
    function loadQuestion() {
        const questionData = questions[currentCategory][currentQuestionIndex];
        questionText.textContent = questionData.question;
        optionsContainer.innerHTML = '';
        questionData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.dataset.index = index;
            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });
        updateProgressBar();
    }

    function selectAnswer(selectedIndex) {
        const questionData = questions[currentCategory][currentQuestionIndex];
        const options = document.querySelectorAll('.option-btn');
        options.forEach((option, index) => {
            if (index === questionData.correct) {
                option.classList.add('correct'); // Add ✅
            } else if (index === selectedIndex) {
                option.classList.add('wrong'); // Add ❌
            }
        });
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions[currentCategory].length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        document.getElementById('quiz-section').classList.add('hidden');
        document.getElementById('score-section').classList.remove('hidden');
        scoreDisplay.textContent = `${score} / ${questions[currentCategory].length}`;
        updateLeaderboard(score);
    }

    function startTimer(duration) {
        let time = duration;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = time;
        const timer = setInterval(() => {
            time--;
            timerElement.textContent = time;
            if (time <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function updateLeaderboard(score) {
        const username = prompt("Enter your name:");
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push({ username, score, date: new Date().toLocaleDateString() });
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }

    function displayLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardList.innerHTML = leaderboard
            .map(entry => `<li>${entry.username}: ${entry.score}</li>`)
            .join('');
    }

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if (validateEmail(email)) {
            alert("Thank you for subscribing!");
            newsletterForm.reset();
        } else {
            alert("Please enter a valid email address.");
        }
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            startQuiz(category);
        });
    });

    restartButton.addEventListener('click', () => {
        document.getElementById('score-section').classList.add('hidden');
        document.getElementById('categories').classList.remove('hidden');
    });
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

<button onclick="toggleDarkMode()">🌙</button>

