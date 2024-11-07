window.onload = function() {
    const questions = [
        'studentNames', 'habits', 'medical', 'goodCanMate', 
        'needs', 'stress', 'noise', 'cleanliness', 
        'sharing', 'guests', 'additionalInfo'
    ];
    questions.forEach(displayAnswers);


    questions.forEach(question => {
        document.getElementById(question).addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveAnswer(question);
            }
        });
    });
};

function saveAnswer(field) {
    const inputField = document.getElementById(field);
    const answer = inputField.value.trim();
    if (answer) {
        let answers = [];
        try {
            answers = JSON.parse(localStorage.getItem(field) || "[]");
        } catch (e) {
            console.warn(`Invalid JSON data for ${field}, resetting to empty array.`);
            answers = [];
        }
        answers.push(answer);
        localStorage.setItem(field, JSON.stringify(answers));
        displayAnswers(field);
        inputField.value = ''; 
        alert('Answer submitted!');
    }
}

function displayAnswers(field) {
    let answers = [];
    try {
        answers = JSON.parse(localStorage.getItem(field) || "[]");
    } catch (e) {
        answers = [];
    }
    const answersDiv = document.getElementById(field + "Answers");
    answersDiv.innerHTML = answers.length > 0 
        ? answers.map(answer => `- ${answer}`).join('<br>') 
        : "(No answers yet)";
}

