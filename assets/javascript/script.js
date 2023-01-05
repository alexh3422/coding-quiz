const questions = [ 
    {
     question: 'What is the first terminal command you should run when uploading to github?',
     answers: [
       { text: 'git init', correct: false },
       { text: 'git add', correct: true },
       { text: 'git commit', correct: false },
       { text: 'git push', correct: false }
     ]
    } , 
    {
     question: 'What does HTML stand for?',
     answers: [
       { text: 'Hyper Text Markup Language', correct: true },
       { text: 'Hyperlinks and Text Markup Language', correct: false },
       { text: 'Home Tool Markup Language', correct: false },
       { text: 'Home Text Markup Language', correct: false }
     ]
    },
     {
     question: 'What does CSS stand for?',
     answers: [
       { text: 'Colorful Style Sheets', correct: false },
       { text: 'Creative Style Sheets', correct: false },
       { text: 'Computer Style Sheets', correct: false },
       { text: 'Cascading Style Sheets', correct: true },
     ]
     },
      {
      question: 'What does API stand for?',
      answers: [
        { text: 'Application Programming Interface', correct: true },
        { text: 'Application Program Interface', correct: false },
        { text: 'Application Programming Island', correct: false },
        { text: 'Apple Program Interface', correct: false },
      ]
      },
      {
      question: 'What does DOM stand for?',
      answers: [
        { text: 'Document Object Model', correct: true },
        { text: 'Document Object Modeler', correct: false },
        { text: 'Document Object Mode', correct: false },
        { text: 'Document Object Modelled', correct: false },
      ]
      },
      {
        question: 'What does JSON stand for?',
        answers: [
          { text: 'JavaScript Orbit Notation', correct: false },
          { text: 'JavaScript Object Notation', correct: true },
          { text: 'JavaScript Opaque Notation', correct: false },
          { text: 'JavaScript Object Null', correct: false },
        ]
      },
      {
        question: 'What would show up in console.log("Hello World")?',
        answers: [
          { text: 'Hello World!', correct: false },
          { text: 'Hello World!!', correct: false },
          { text: 'Hello World', correct: true },
          { text: 'Hello World!!!', correct: false },
        ]
      }
  ] 
  
  
  
  const startBtn = document.getElementById('startBtn')
  const nextBtn = document.getElementById('nextBtn')
  const questionContainerElement = document.getElementById('question-container')
  const questionElement = document.getElementById('question')
  const answerButtonsElement = document.getElementById('answer-buttons')
  const scoreElement = document.getElementById('score')
  const highScoreElement = document.getElementById('high-score')
  let shuffledQuestions, currentQuestionIndex
  
  
  startBtn.addEventListener('click', startQuiz)
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
  })
  
  let interval;
  let timeLeft = 60;
  let score = 0;
  let highScore = 0
  
  
  
  // declaring timer
  function timerStart () {
  
   interval = setInterval(function() {
  
    timeLeft--;
    document.getElementById('timer').innerHTML = 'Time: ' + timeLeft + ' seconds remaining';
   
    if (timeLeft < 0) {
      clearInterval(interval);
      document.getElementById('timer').innerHTML = 'Time: 0 seconds remaining';
      alert("You're out of time!");
    }
  }, 1000); // 1000ms = 1s
  }
  // function that is called to reset the clock
  function timerReset () {
   
    clearInterval(interval);
    timeLeft = 60;
    document.getElementById('timer').innerHTML = 'Time: ' + timeLeft + ' seconds remaining';
    timerStart()
    }
  // starting quiz 
  
  function startQuiz() {
    if (startBtn.innerText === 'Start') {
      startBtn.innerText = 'Restart'
    }
      shuffledQuestions = questions.sort(() => Math.random() - .5)
      currentQuestionIndex = 0
      questionContainerElement.classList.remove('hide')
      score = 0
      scoreElement.textContent = 'Score: ' + score
      timerReset()
      updateHighScore()
      nextQuestion()
      //nextQuestion()
    }
  
  function nextQuestion() {
    if (currentQuestionIndex === shuffledQuestions.length) {
      // Quiz is complete
      alert('Congratulations, you have completed the quiz! Your final score is ' + score + ' out of 7! With ' + timeLeft + ' seconds remaining!')
      startBtn.innerText = 'Restart'
      startBtn.classList.remove('hide')
      questionContainerElement.classList.add('hide')
      nextBtn.classList.add('hide')
      updateHighScore()
      timerReset()
      clearInterval(interval)
     
      return
    }
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
  //showing the question and answers
  function showQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const { question, answers } = currentQuestion
    questionElement.innerText = question
    answerButtonsElement.innerHTML = ''
  
    questionElement.textContent = 
    `Question ${currentQuestionIndex + 1}/${questions.length}- ${shuffledQuestions[currentQuestionIndex].question}`;
  
    currentQuestion.answers.forEach(answer => {
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
  
  //called when the user clicks on an answer that is incorrect. 10 seconds are taken away
  function subtractTime() {
    timeLeft -= 10;
    document.getElementById('timer').textContent = 'Time: ' + timeLeft + ' seconds remaining';
  }
  
  //what happens when the user clicks on an answer
  function selectAnswer(e) {
    
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
  
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextBtn.classList.remove('hide')
    } else {
      startBtn.innerText = 'Restart'
      startBtn.classList.remove('hide')
      nextBtn.textContent = 'Done'
      clearInterval(interval)
    }
  
  
    if (selectedButton.dataset = correct) {
      score += 1;
      scoreElement.textContent = "Score: " + score;
      nextBtn.classList.remove('hide')
    }
    else {
      subtractTime()
  
      // Array.from(answerButtonsElement.children).forEach(button => {
      //   setStatusClass(button, button.dataset.correct)
      // })
    }
  
  
  }
  
  
  //sets the status of the answer buttons (color for right and wrong)
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('btn-correct')
    } else {
      element.classList.add('btn-incorrect')
    }
  }
  
  //clears the status of the answer buttons (color for right and wrong)
  function clearStatusClass(element) {
    element.classList.remove('btn-correct')
    element.classList.remove('btn-incorrect')
  }
  
  
  
  
  
  function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild
      (answerButtonsElement.firstChild)
    }
  }
  
  
  
  function updateHighScore() {
    if (score > highScore) {
      highScore = score
    }
    highScoreElement.textContent = 'High Score: ' + highScore
    console.log(highScore)
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  