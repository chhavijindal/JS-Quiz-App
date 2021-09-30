const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'The End! \nRestart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Full name of the character played by Ranbir Kapoor(Bunny)?',
    answers: [
      { text: 'Karan Mehra', correct: false },
      { text: 'Kabir Thappar', correct: true },
      { text: 'Karan Thappar', correct: false },
      { text: 'Kabir Mehra', correct: false }
    ]
  },
  {
    question: 'Which animal did Naina and Bunny spot on the hill?',
    answers: [
      { text: 'Deer', correct: true },
      { text: 'Goat', correct: false },
      { text: 'Wolf', correct: false },
      { text: 'Leopard', correct: false }
    ]
  },
  {
    question: 'Name of the character played by Madhuri Dixit?',
    answers: [
      { text: 'Rohini', correct: false },
      { text: 'Mohini', correct: true },
      { text: 'Madhuri', correct: false },
      { text: 'Kaveri', correct: false }
    ]
  },
  {
    question: 'Where is Bunny living when Aditi sends him a wedding invite?',
    answers: [
      { text: 'California', correct: false },
      { text: 'Los Ageles', correct: false },
      { text: 'San Francisco', correct: true },
      { text: 'Paris', correct: false }
    ]
  },
  {
    question: 'What college did Bunny get accepted to?',
    answers: [
      { text: 'Stanford University', correct: false },
      { text: 'University of Chicago', correct: false },
      { text: 'Columbia University', correct: false },
      { text: 'Northwestern University', correct: true }
    ]
  }
]