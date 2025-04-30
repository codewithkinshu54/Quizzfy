document.addEventListener('DOMContentLoaded', function() {
    // Get the selected category from localStorage
    const selectedCategory = localStorage.getItem('selectedCategory');
    
    // If no category is selected, redirect to the category page
    if (!selectedCategory || !quizQuestions[selectedCategory]) {
        window.location.href = 'category.html';
        return;
    }
    
    // Set up variables
    const questions = quizQuestions[selectedCategory];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let timerInterval;
    let seconds = 0;
    
    // Get DOM elements
    const categoryTitle = document.getElementById('category-title');
    const questionNumber = document.getElementById('question-number');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');
    const finalScore = document.getElementById('final-score');
    const retryBtn = document.getElementById('retry-btn');
    const homeBtn = document.getElementById('home-btn');
    
    // Initialize the quiz
    function initQuiz() {
        // Set the category title
        categoryTitle.textContent = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Quiz`;
        
        // Start timer
        startTimer();
        
        // Display the first question
        displayQuestion();
    }
    
    // Start timer
    function startTimer() {
        timerInterval = setInterval(function() {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            timerElement.textContent = `Time: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }, 1000);
    }
    
    // Display the current question
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
        questionText.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Create options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            // Check if this option was previously selected
            if (userAnswers[currentQuestionIndex] === option) {
                optionElement.classList.add('selected');
            }
            
            optionElement.innerHTML = `
                <input type="radio" id="option${index}" name="quiz-option" value="${option}" 
                       ${userAnswers[currentQuestionIndex] === option ? 'checked' : ''}>
                <label for="option${index}">${option}</label>
            `;
            
            optionElement.addEventListener('click', function() {
                // Remove 'selected' class from all options
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                
                // Add 'selected' class to the clicked option
                this.classList.add('selected');
                
                // Update user answer
                userAnswers[currentQuestionIndex] = option;
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }
    
    // Handle navigation
    prevBtn.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    });
    
    // Handle quiz submission
    submitBtn.addEventListener('click', function() {
        // Calculate score
        score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                score++;
            }
        });
        
        // Display results
        finalScore.textContent = score;
        document.querySelector('.quiz-content').style.display = 'none';
        document.querySelector('.quiz-header').style.display = 'none';
        resultsContainer.style.display = 'block';
        
        // Stop the timer
        clearInterval(timerInterval);
    });
    
    // Handle retry and home buttons
    retryBtn.addEventListener('click', function() {
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = new Array(questions.length).fill(null);
        seconds = 0;
        
        // Reset display
        document.querySelector('.quiz-content').style.display = 'block';
        document.querySelector('.quiz-header').style.display = 'block';
        resultsContainer.style.display = 'none';
        
        // Restart the quiz
        initQuiz();
    });
    
    homeBtn.addEventListener('click', function() {
        window.location.href = 'category.html';
    });
    
    // Initialize the quiz
    initQuiz();
});