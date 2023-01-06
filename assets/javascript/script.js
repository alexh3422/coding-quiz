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
  const highScoreElement = document.getElementById('highScore')
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
   
  
  highScoreElement.textContent = 'High Score: ' + localStorage.getItem('highScore') + localStorage.getItem('initials')
  
  let interval;
  let timeLeft = 60;
  let score = 0;
  let highScore = ''
  let initials = ''


  highScoreElement.textContent = 'High Score: ' + localStorage.getItem('highScore') + ' by ' + localStorage.getItem('initials')
  
  
  
  // declaring timer
  function timerStart () {
  
   interval = setInterval(function() {
  
    timeLeft--;
    document.getElementById('timer').innerHTML = 'Time: ' + timeLeft + ' seconds remaining';
   
    if (timeLeft < 0) {
      clearInterval(interval);
      document.getElementById('timer').innerHTML = 'Time: 0 seconds remaining';
     
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
    // Quiz is complete will reset timer, update high score, alrt the user of their score and time left, and show the form to submit their score
    if (timeLeft < 0) {
    resetState()
    alert('You ran out of time! Your final score is ' + score + ' out of 7! Use the form below to submit your score! Or click the start button to try again!')
    startBtn.innerText = 'Start'
    startBtn.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    nextBtn.classList.add('hide')
    updateHighScore()  
    timerReset()
    clearInterval(interval)
    initialsForm.classList.remove('hide')
    
 
 
   
    return
    }
    else {
      resetState()
      alert('Congratulations, you have completed the quiz! Your final score is ' + score + ' out of 7! With ' + timeLeft + ' seconds remaining! Use the form below to submit your score! Or click the start button to try again!')
    startBtn.innerText = 'Restart'
    startBtn.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    initialsForm.classList.remove('hide')
    updateHighScore()
    // nextBtn.classList.add('hide')
 
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
    //assigning the answers to the buttons as well as dataset telling whether the answer is true or false
    document.getElementById('answer1').innerText = shuffledQuestions[currentQuestionIndex].answers[0].text;
    document.getElementById('answer1').dataset.correct = shuffledQuestions[currentQuestionIndex].answers[0].correct;
    document.getElementById('answer2').innerText = shuffledQuestions[currentQuestionIndex].answers[1].text;
    document.getElementById('answer2').dataset.correct = shuffledQuestions[currentQuestionIndex].answers[1].correct;
    document.getElementById('answer3').innerText = shuffledQuestions[currentQuestionIndex].answers[2].text;
    document.getElementById('answer3').dataset.correct = shuffledQuestions[currentQuestionIndex].answers[2].correct;
    document.getElementById('answer4').innerText = shuffledQuestions[currentQuestionIndex].answers[3].text;
    document.getElementById('answer4').dataset.correct = shuffledQuestions[currentQuestionIndex].answers[3].correct;
    //enables the answer buttons after the next question is shown
      document.getElementById('answer1').disabled = false
      document.getElementById('answer2').disabled = false
      document.getElementById('answer3').disabled = false
      document.getElementById('answer4').disabled = false
      
    }

  
  
  
  //called when the user clicks on an answer that is incorrect. 10 seconds are taken away
  function subtractTime() {
    timeLeft -= 10;
    document.getElementById('timer').textContent = 'Time: ' + timeLeft + ' seconds remaining';
  }
  
  //what happens when the user clicks on an answer
  function selectAnswer(e) {
    
    const selectedButton = e.target
    const answerIsCorrect = selectedButton.dataset.correct === 'true'
  
    setStatusClass(document.body, answerIsCorrect)
    //disables answer buttons after an answer is selected so that the user can't change their answer
    document.getElementById('answer1').disabled = true
    document.getElementById('answer2').disabled = true
    document.getElementById('answer3').disabled = true
    document.getElementById('answer4').disabled = true
    
  
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
   
    } 
    
    else {
      startBtn.innerText = 'Restart'
      startBtn.classList.remove('hide')
      nextBtn.textContent = 'Done'
      clearInterval(interval)
    }
  
    //adds 1 to the score if the answer is correct
    if (answerIsCorrect) {
      score += 1;
      scoreElement.textContent = "Score: " + score;
      document.getElementById("nextBtn").disabled = false;
    
    } //subtracts 10 seconds from the timer if the answer is incorrect
    else {
      subtractTime()
      document.getElementById("nextBtn").disabled = false;
     
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
  //updates the high score
  function updateHighScore() {


    if (score > highScore) {
      highScore = score

    }
    //stores highest score to local storage by checking if the current score is higher than the stored high score
    if (highScore > localStorage.getItem("highScore")) {
      localStorage.setItem("highScore", score);
    }
  }
  
  
  const initialsForm = document.getElementById('initials-form')
  const initialsInput = document.getElementById('initials')
  
  initialsForm.addEventListener('submit', handleFormSubmit)



  // form to submit initials that will automatically update high score with their initials after clicking submit
  function handleFormSubmit(event) {
    event.preventDefault()
    let initials = initialsInput.value
    // localStorage.setItem('highScore', highScore)
    localStorage.setItem('initials', initials)
    displayHighScore()
  }

  //function that is called after clicking submit to display the high score
  function displayHighScore() {
    highScoreElement.textContent = 'High Score: ' + localStorage.getItem('highScore') + ' by ' + localStorage.getItem('initials')

  }
  
    

    
  

