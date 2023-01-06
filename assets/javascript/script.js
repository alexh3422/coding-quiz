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
  
  document.getElementById('answer1').addEventListener('click', selectAnswer)
  document.getElementById('answer2').addEventListener('click', selectAnswer)
  document.getElementById('answer3').addEventListener('click', selectAnswer)
  document.getElementById('answer4').addEventListener('click', selectAnswer)
   
  

  
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
      endQuiz()
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
    //  answerButtonsElement.classList.remove('hide')
      shuffledQuestions = questions.sort(() => Math.random() - .5)
      currentQuestionIndex = 0
      questionContainerElement.classList.remove('hide')
      nextBtn.classList.remove('hide')
      score = 0
      scoreElement.textContent = 'Score: ' + score
      timerReset()
      nextQuestion()
      //nextQuestion()
    }
  
  function nextQuestion() {
    if (currentQuestionIndex === shuffledQuestions.length) {
      (endQuiz())
    }
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
  
  function endQuiz() {
    // Quiz is complete
    if (timeLeft < 0) {
    alert('Congratulations, you have completed the quiz! Your final score is ' + score + ' out of 7! With ' + timeLeft + ' seconds remaining!')
    startBtn.innerText = 'Start'
    startBtn.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    nextBtn.classList.add('hide')
    updateHighScore()
    timerReset()
    clearInterval(interval)
   
    return
    }
    else {
    startBtn.innerText = 'Restart'
    startBtn.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    // nextBtn.classList.add('hide')
    updateHighScore()
    timerReset()
    clearInterval(interval)
   
    return
  }}
  //showing the question and answers
  function showQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const { question, answers } = currentQuestion
 
  
  
    questionElement.textContent = 
    `Question ${currentQuestionIndex + 1}/${questions.length}- ${shuffledQuestions[currentQuestionIndex].question}`;

    document.getElementById('answer1').innerText = shuffledQuestions[currentQuestionIndex].answers[0].text;
    document.getElementById('answer1').dataset = shuffledQuestions[currentQuestionIndex].answers[0].correct;
    document.getElementById('answer2').innerText = shuffledQuestions[currentQuestionIndex].answers[1].text;
    document.getElementById('answer2').dataset = shuffledQuestions[currentQuestionIndex].answers[1].correct;
    document.getElementById('answer3').innerText = shuffledQuestions[currentQuestionIndex].answers[2].text;
    document.getElementById('answer3').dataset = shuffledQuestions[currentQuestionIndex].answers[2].correct;
    document.getElementById('answer4').innerText = shuffledQuestions[currentQuestionIndex].answers[3].text;
    document.getElementById('answer4').dataset = shuffledQuestions[currentQuestionIndex].answers[3].correct;
    // currentQuestion.answers.forEach(answer => {
    //   // const button = document.createElement('button')
    //   // button.innerText = answer.text
    //   // button.classList.add('btn')
      // if (answer.correct) {
      //   button.dataset.correct = answer.correct
      // }
      // button.addEventListener('click', selectAnswer)
      // answerButtonsElement.appendChild(button)
      answerButtonsElement.querySelectorAll('.answer-button').forEach(button => {
        button.disabled = false
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
    alert(correct)
    setStatusClass(document.body, correct)
    answerButtonsElement.querySelectorAll('.answer-button').forEach(button => {
      button.disabled = true
    })
  
    
  
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
   
    } else {
      startBtn.innerText = 'Restart'
      startBtn.classList.remove('hide')
      nextBtn.textContent = 'Done'
      clearInterval(interval)
    }
  
  
    if (correct) {
      score += 1;
      scoreElement.textContent = "Score: " + score;
      document.getElementById("nextBtn").disabled = false;
    

    
    }
    else {
      subtractTime()
      document.getElementById("nextBtn").disabled = false;
     

  
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
    document.getElementById("nextBtn").disabled = true;
   }
  
  
  
//   // Save the high score
// function saveHighScore(score) {
//   // Check if the high score is already stored
//   if (localStorage.getItem("highScore")) {
//     // If it is, check if the new score is higher
//     if (score > localStorage.getItem("highScore")) {
//       // If it is, save the new high score
//       localStorage.setItem("highScore", score);
//     }
//   } else {
//     // If there is no high score stored, save the new score as the high score
//     localStorage.setItem("highScore", score);
//   }
// }

// // Get the high score
// function getHighScore() {
//   // Check if the high score is stored
//   if (localStorage.getItem("highScore")) {
//     // If it is, return the high score
//     return localStorage.getItem("highScore");
//   } else {
//     // If it is not, return 0
//     return 0;
//   }
// }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  