//varibales to attach to different areas of the DOM
let start = document.getElementById('start')
let question = document.getElementById('question');
let options = document.getElementById('options');
let timer = document.getElementById('timer');
let feedback = document.getElementById('feedback');
let tracker = document.getElementById('tracker');
let leaderBoard = document.getElementById('leaderBoard');
let form = document.getElementById('form');
let submit = document.getElementById('submit')
let clearBtn = document.getElementById('clear')

//global varibables so their content can be updated and shared through multiple functions
let players = [];
let questionsIndex = 0;
let score = 0;
let timeKeeper;
let player;

//a function call that will show previous scores on the DOM
ancestors()

//an array containing objects that have all the questions, answer choices, and correct answers
let questions = [
    {
        title: "What element can sub-zero control?",
        choices: ["Ice", "Fire", "Earth", "Air"],
        answer: "Ice"
    },
    {
        title: "What is Scorpion's catchphrase?",
        choices: ["PASS THE BUTTER!", "SMILE!", "WHO LIVES IN PINEAPPLE UNDER THE SEA?", "GET OVER HERE!"],
        answer: "GET OVER HERE!"
    },
    {
        title: "Who does Johnny Cage marry?",
        choices: ["yo mama", "Kim Kardashian", "Sonya Blade", "Himself"],
        answer: "Sonya Blade"
    },
    {
        title: "How many arms does Goro have?",
        choices: ["1", "2", "10", "4"],
        answer: "4"
    },
    {
        title: "What mythical creature is the symbol of Mortal Kombat?",
        choices: ["Nine-tailed fox", "Griffon", "Cerberus", "Dragon"],
        answer: "Dragon"
    }
];

//gives 15 seconds per question
let seconds = questions.length * 15;

//function expression that start quiz timer and pulls questions
let beginQuiz = () => {
    start.classList.add('hide')
    timeKeeper = setInterval(function () {
        seconds--;
        ;
        timer.textContent = 'Time: ' + seconds;

        if (seconds === 0) {
            clearInterval(timeKeeper)
            timer.textContent = "Game Over";
        }
    }, 1000)
    //function call to start pulling questions
    getQuestions();
}

//function to get questions
let getQuestions = () => {
    //if we still haven't cycled through all the questions
    if (questionsIndex <= 4) {
        //get the current question
        let currentQuestion = questions[questionsIndex]
        //put the question on the page
        question.textContent = currentQuestion.title
        //clear the answer choices area 
        options.textContent = '';
        //for each current question fill the 'options' with buttons that each contain an answer choice
        currentQuestion.choices.forEach(function (choice) {
            let button = document.createElement('button')
            button.innerHTML = choice
            options.appendChild(button)
        })
    } else {
        // all the questions have been used then end the quiz
        endQuiz()
    }
}

//a function that will handle when an answer is clicked on 
let handleClick = (e) => {
    //get the button that was clicked on and assign it to a varibale
    let userChoice = e.target.textContent
    //if that variable equals the answer to our current question
    if (userChoice === questions[questionsIndex].answer) {
        //tell them they are correct
        feedback.innerHTML = "correct"
        //increase the score counter by one
        score++
        //put the score on the page
        tracker.textContent = 'Score: ' + score
    } else {
        //if they are wrong tell them they are wrong
        let wrong = document.createElement('p').innerHTML = 'maybe next time'
        feedback.innerHTML = wrong
    }
    //get the next question in the array
    getQuestions(questionsIndex++)
}

//function of what to do when the quiz is over
let endQuiz = () => {
    //clear the questions and options area
    question.textContent = ''
    options.textContent = ''
    //clear the time
    clearInterval(timeKeeper);
    timer.innerHTML = 'Time:' + 0;
    //say thank you
    question.textContent = 'Thanks for Playing!'
    //show the form where they can enter their initials
    form.removeAttribute('class');
}

//on click functionality for when they hit submit on the form
submit.onclick = () => {
    //get the players name
    let name = document.getElementById('name').value;
    //object called player that gets the players name and their score
    let player = {
        initials: name,
        number: score
    }
    console.log(player)
    //get the players object from local storage
    let players = JSON.parse(localStorage.getItem('players'));
    //if there are no players in local storage show them nothing
    if (players == null ) players = []
    //add the new player to the players array
    players.push(player)
    console.log(players)    
    //put the new player in local storage
    localStorage.setItem('players', JSON.stringify(players))
}

//function to recall old players and post them on the leaderboard
function ancestors() {
    //get the players from local storage
    let players = JSON.parse(localStorage.getItem('players'))
    //if there are no players set players to an empty array to show nothing
    if (players == null) players = []
    console.log(players)
    //cycle through the players, get their names and the corresponding scores and put them on the page
    let test = players.map((i) => {
        let tr = document.createElement('tr')
        tr.innerHTML = '<td>' + i.initials + '</td>' + '<td>' + i.number + '</td>' ; 
        return tr
    })
    //append to the leaderboard
    leaderBoard.append(...test)
}

//assigns the begin quiz function to launch when the start button is clicked
start.onclick = beginQuiz
//assigns a function to handle an answer choice being clicked
options.addEventListener('click', handleClick);
