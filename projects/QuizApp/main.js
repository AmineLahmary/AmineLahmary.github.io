const questions = [
    {
        question:"1. Whitch is the largest animal in the world ?",
        answers: [
            {
                text:"White shark",
                isCorrect: false,
            },
            {
                text:"Elephent",
                isCorrect: false,
            },
            {
                text:"Girafe",
                isCorrect: false,
            },
            {
                text:"Blue whale",
                isCorrect: true,
            }
        ]
    },
    {
        question:"2. What is the largest ocean on Earth?",
        answers: [
            {
                text:"Atlantic Ocean",
                isCorrect: false,
            },
            {
                text:"Pacific Ocean",
                isCorrect: true,
            },
            {
                text:"Indian Ocean",
                isCorrect: false,
            },
            {
                text:"Arctic Ocean",
                isCorrect: false,
            }
        ]
    },
    {
        question:"3. What is the chemical formula for water?",
        answers: [
            {
                text:"NaCl",
                isCorrect: false,
            },
            {
                text:"H2O",
                isCorrect: true,
            },
            {
                text:"CO2",
                isCorrect: false,
            },
            {
                text:"NH3",
                isCorrect: false,
            }
        ]
    },
    {
        question:"4. What year did the moon landing occur?",
        answers: [
            {
                text:"1965",
                isCorrect: false,
            },
            {
                text:"1967",
                isCorrect: false,
            },
            {
                text:"1969",
                isCorrect: true,
            },
            {
                text:"1971",
                isCorrect: false,
            }
        ]
    }
]
const question = document.getElementById('question')
const answers  = document.getElementById('answers')
const nextBtn  = document.getElementById('nextBtn')

let score = 0
let currentQuestionIndex = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextBtn.textContent = "Next"
    showQuestions()
}

function showQuestions() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    question.textContent = currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.text
        button.classList.add('answer')
        answers.appendChild(button)
        button.addEventListener('click', selectAnswer)
    });
}

function resetState() {
    nextBtn.style.display = "none"
    while( answers.firstChild ){
        answers.removeChild(answers.firstChild)
    }
}

function selectAnswer(e) {
    function checkAnswer(answer) {
        return answer.isCorrect && answer.text == e.target.textContent;
    }
    // let answer = e.target.dataset.correct === "true"
    let answer = questions[currentQuestionIndex].answers.find(checkAnswer)
    if( answer ) {
        e.target.classList.add('correct')
        score++
    }else {
        e.target.classList.add('incorrect')
    }
    Array.from(answers.children).forEach(answer => {
        questions[currentQuestionIndex].answers.find((an) => {
            if(an.text == answer.textContent && an.isCorrect) {
                answer.classList.add('correct')
             }
        } )
        answer.disabled = true
    })
    nextBtn.style.display = "block"
} 

function handleNextBtn() {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
        showQuestions()
    } else showScore()
}

function showScore() {
    resetState()
    question.textContent = `Your score is ${score} of ${questions.length}`
    nextBtn.style.display = "block"
    nextBtn.textContent = "Play Again"
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextBtn()
    } else {
        startQuiz()
    }
})

startQuiz()